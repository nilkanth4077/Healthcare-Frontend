import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import "./style/AdminDashboard.css";
import Content from "./Content";
import Profile from "./Profile";

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <SideBar />
            <div className="admin-dashboard-content">
                <Content />
                <Profile />
            </div>
        </div>
    );
};

export default AdminDashboard;