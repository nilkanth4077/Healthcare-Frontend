import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import BaseUrl from "../../reusables/BaseUrl";

const AppointmentDetails = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [doctors, setDoctors] = useState([]);
    const speciality = state?.speciality || "";

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("You are not logged in");
            navigate("/login");
            return;
        }

        axios
            .get(`${BaseUrl}/user/doctor-by-speciality`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    speciality: speciality,
                },
            })
            .then((response) => {
                if (response.data && response.data.data) {
                    setDoctors(response.data.data);
                    console.log("Doctors:", response.data.data);
                } else {
                    toast.error("Unexpected response format");
                }
            })
            .catch((error) => {
                console.error("Error fetching doctors:", error);
                toast.error("Failed to fetch doctors");
            });
    }, []);

    return (
        <>
            <Navbar />
            <div>
                <h2>Doctors with Speciality: {speciality}</h2>
                {doctors.length === 0 ? (
                    <p>No doctors found.</p>
                ) : (
                    <ul className="list-group">
                        {doctors.map((doctorWrapper) => (
                            <li key={doctorWrapper.id} className="list-group-item">
                                <strong>
                                    Dr. {doctorWrapper.doctor.firstName}{" "}
                                    {doctorWrapper.doctor.lastName}
                                </strong>{" "}
                                - {doctorWrapper.specialization} (
                                {doctorWrapper.verificationStatus})
                                <br />
                                <small>Email: {doctorWrapper.doctor.email}</small>
                                <br />
                                <small>Mobile: {doctorWrapper.doctor.mobile}</small>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Footer />
        </>
    );
};

export default AppointmentDetails;
