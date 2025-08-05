import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { toast } from "react-toastify";
import BaseUrl from "../reusables/BaseUrl";

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "USER",
        mobile: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post(
                `${BaseUrl}/auth/signup`,
                formData
            );
            if (response.statusCode === 201) {
                toast.success("Registered successfully");
            } else {
                toast.error(response.data.message || "Registration failed");
            }
        } catch (err) {
            toast.error("Error: ", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-lg bg-gray-800 p-8 rounded-xl shadow-lg"
                >
                    <h2 className="text-2xl font-semibold text-center text-white mb-6">Register</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="text"
                            name="mobile"
                            placeholder="Mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm mt-4 text-center">{error}</div>
                    )}

                    <button
                        type="submit"
                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex justify-center items-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                        ) : (
                            "Register"
                        )}
                    </button>
                    <h3 className="text-center text-white mt-4">Already a User ? <a href="/login" className="text-stone-300 hover:text-white">Login Here !!</a></h3>
                    <h3 className="text-center text-white mt-4"><a href="/doc-registration" className="text-stone-300 hover:text-white">Doctor Registration</a></h3>
                </form>
            </div>
            <Footer />
        </>
    );
}