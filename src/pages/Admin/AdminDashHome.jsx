import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import "./AdminDashboard.css"; // styling

const AdminDashHome = () => {
    return (
        <div className="admin-container">
            <h3><strong>Admin Dashboard Home</strong></h3>
        </div>
    );
};

export default AdminDashHome;