import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaLaptopMedical } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import ResponsiveMenu from "./ResponsiveMenu";

export default function Navigation() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

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
            { title: "My Appointments", link: "/doctor-dashboard" },
            { title: "Patients", link: "/doctor-dashboard" },
            { title: "Profile", link: "/doctor-dashboard" },
        ],
        ADMIN: [
            { title: "Admin Dashboard", link: "/admin-dashboard" },
            { title: "Manage Doctors", link: "/admin-dashboard" },
            { title: "Manage Users", link: "/admin-dashboard" },
            { title: "Settings", link: "/admin-dashboard" },
        ],
    };

    const role = user?.role || "USER";

    const NavbarMenu = menuConfig[role];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
    };

    return (
        <>
            <nav>
                <div className="flex justify-between items-center py-4 bg-back px-5 md:px-14">
                    {/* Logo Section */}
                    <div className="text-2xl flex items-center gap-2 font-bold uppercase">
                        <p className="text-primary">Health</p>
                        <p className="text-secondary">Buddy</p>
                        <FaLaptopMedical className="text-primary" />
                    </div>

                    {/* Menu Section */}
                    <div className="hidden md:block">
                        <ul className="flex items-center gap-6 text-gray-600">
                            {NavbarMenu.map((menu) => (
                                <li key={menu.id} className="text-md">
                                    <a href={menu.link} className="inline-block py-1 px-3 text-primary hover:text-secondary hover:shadow-[0_3px_0_-1px_#ef4444] font-semibold">{menu.title}</a>
                                </li>
                            ))}
                            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                                {token ? (
                                    <div className="flex items-center">
                                        <div className="mx-5">
                                            <a
                                                href="/"
                                                onClick={handleLogout}
                                                className="text-white bg-red-700 hover:bg-secondary hover:text-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center"
                                            >
                                                Logout
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <a
                                        href="/login"
                                        className="text-white bg-primary hover:bg-secondary hover:text-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center"
                                    >
                                        Login
                                    </a>
                                )}
                            </div>
                        </ul>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden flex" onClick={() => setOpen(!open)}>
                        <MdMenu className="text-4xl text-primary" />
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Selection */}
            <ResponsiveMenu open={open} />
        </>
    );
}