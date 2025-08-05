import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ResponsiveMenu = ({ open }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            const fetchUserProfile = async () => {
                try {
                    const response = await fetch(
                        "http://localhost:8080/auth/profile",
                        {
                            method: "GET",
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );

                    if (response.ok) {
                        const data = await response.json();
                        console.log("User Profile:", data);
                        setUser(data);
                    } else {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        setUser(null);
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            };

            fetchUserProfile();
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return (
        <AnimatePresence mode="wait">
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-20 left-0 w-full h-screen z-20"
                >
                    <div className="text-xl font-semibold uppercase bg-primary text-white py-10 m-6 rounded-3xl">
                        <ul className="flex flex-col items-center gap-10">
                            <li><a href="/">Home</a></li>
                            <li><a href="/products">Products</a></li>
                            <li><a href="/account/order">My Orders</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/contact">Contact</a></li>
                            {user ? (
                                <button
                                    className="px-6 py-2 bg-white text-red-600 rounded-xl hover:bg-red-700 transition duration-300"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    className="px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition duration-300"
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </button>
                            )}
                        </ul>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ResponsiveMenu;