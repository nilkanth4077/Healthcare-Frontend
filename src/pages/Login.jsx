import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { toast } from "react-toastify";
import BaseUrl from "../reusables/BaseUrl";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const existingToken = localStorage.getItem("token");
        const existingUser = JSON.parse(localStorage.getItem("user"));

        if (existingToken && existingUser) {
            if (existingUser.role === "ADMIN") {
                toast.info("You're already logged in as Admin");
                navigate("/admin-dashboard");
            } else if (existingUser.role === "DOCTOR") {
                toast.info("You're already logged in as Doctor");
                navigate("/doctor-dashboard");
            } else {
                toast.info("You're already logged in");
                navigate("/");
            }
            return;
        }

        setLoading(true);

        try {
            // http://localhost:8080
            // https://healthcare-ot3a.onrender.com
            const response = await axios.post(`${BaseUrl}/auth/login`, {
                email,
                password,
            });

            const { user, token } = response.data.data;
            // console.log("Login Response:", response.data);

            // Save token & user
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // Redirect based on role
            if (user.role === "ADMIN") {
                navigate("/admin-dashboard");
                toast.success("Login Successful");
            } else if (user.role === "DOCTOR") {
                toast.success("Login Successful");
                navigate("/doctor-dashboard");
            } else {
                toast.success("Login Successful");
                navigate("/");
            }
        } catch (err) {
            toast.error(err.response?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-back">
                <div className="w-full max-w-md bg-primary p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center mb-6 text-mtext">Login</h2>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block mb-1 text-sm text-mtext">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 rounded bg-white text-mtext focus:outline-none focus:ring-2 focus:ring-back"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm text-mtext">Password</label>
                            <div className="relative w-full">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full p-2 rounded bg-white text-mtext focus:outline-none focus:ring-2 focus:ring-back"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible className="text-mtext" />
                                    ) : (
                                        <AiOutlineEye className="text-mtext" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 px-4 bg-back hover:bg-secondary text-white hover:text-black font-semibold rounded transition duration-200"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-2 text-mtext" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Logging in...
                                </div>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>
                    <h3 className="text-center text-mtext mt-4">New User ? <a href="/register" className="text-black hover:text-secondary">Register Here !!</a></h3>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;