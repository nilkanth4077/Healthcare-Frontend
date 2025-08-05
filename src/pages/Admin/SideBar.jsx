import React from "react";
import { Link } from "react-router-dom";
import { BiHome, BiBookAlt } from "react-icons/bi";
import "./style/AdminDashboard.css";
import "./style/SideBar.css";

const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="menu">
                <div className="logo">
                    <BiBookAlt className="logo-icon" />
                    <h2>HealthCare</h2>
                </div>
                <div className="menu--list">
                    <a href="#" className="item">
                        <BiHome className="icon" />
                        <span>Dashboard</span>
                    </a>
                    <a href="#" className="item">
                        <BiHome className="icon" />
                        <span>Dashboard</span>
                    </a>
                    <a href="#" className="item">
                        <BiHome className="icon" />
                        <span>Dashboard</span>
                    </a>
                    <a href="#" className="item">
                        <BiHome className="icon" />
                        <span>Dashboard</span>
                    </a>
                    <a href="#" className="item">
                        <BiHome className="icon" />
                        <span>Dashboard</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SideBar;