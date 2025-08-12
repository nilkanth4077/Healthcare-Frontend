import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Navbar from "../../components/Navbar";
import "./style/AdminDashboard.css";
import Content from "./Content";
import Profile from "./Profile";
import DoctorListPage from "../Doctor/DoctorListPage";

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            {/* <SideBar /> */}
            <Navbar />
            <div className="admin-dashboard-content">
                <DoctorListPage />
                <Content />
                <Profile />
            </div>
        </div>
    );
};

export default AdminDashboard;