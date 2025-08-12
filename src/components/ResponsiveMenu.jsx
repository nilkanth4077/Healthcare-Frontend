import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BaseUrl from "../reusables/BaseUrl";

const ResponsiveMenu = ({ open }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            const fetchUserProfile = async () => {
                try {
                    const response = await fetch(
                        `${BaseUrl}/auth/profile`,
                        {
                            method: "GET",
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );

                    if (response.ok) {
                        const data = await response.json();
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

    const menuConfig = {
        USER: [
            { title: "Home", link: "/" },
            { title: "Products", link: "/" },
            { title: "My Orders", link: "/" },
            { title: "About", link: "/" },
            { title: "Contact", link: "/" },
        ],
        DOCTOR: [
            { title: "Dashboard", link: "/doctor-dashboard" },
            { title: "My Appointments", link: "/" },
            { title: "Patients", link: "/" },
            { title: "Profile", link: "/" },
        ],
        ADMIN: [
            { title: "Admin Dashboard", link: "/admin-dashboard" },
            { title: "Manage Doctors", link: "/" },
            { title: "Manage Users", link: "/" },
            { title: "Settings", link: "/" },
        ],
    };

    const role = user?.role?.toUpperCase() || "USER";
    const menuItems = menuConfig[role] || menuConfig.USER;

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
                    <div className="text-xl font-semibold bg-primary text-white py-10 m-6 rounded-3xl">
                        <ul className="flex flex-col items-center gap-10">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <a href={item.link}>{item.title}</a>
                                </li>
                            ))}
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