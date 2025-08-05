import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { toast } from "react-toastify";
import BaseUrl from "../reusables/BaseUrl";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // http://localhost:8080
            // https://healthcare-ot3a.onrender.com
            const response = await axios.post(`${BaseUrl}/auth/login`, {
                email,
                password,
            });

            const { user, token } = response.data.data;

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
            toast.error("Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center mb-6 text-white">Login</h2>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block mb-1 text-sm text-gray-300">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-sm text-gray-300">Password</label>
                            <input
                                type="password"
                                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition duration-200"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
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
                    <h3 className="text-center text-white mt-4">New User ? <a href="/register" className="text-stone-300 hover:text-white">Register Here !!</a></h3>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;