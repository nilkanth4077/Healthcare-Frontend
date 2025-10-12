import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import BaseUrl from "../../reusables/BaseUrl";

const MyAppointments = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const formatTime = (dateStr) => {
        if (!dateStr) return "";
        const [hourStr, minute] = dateStr.substring(11, 16).split(":");
        let hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${hour}:${minute} ${ampm}`;
    };

    const isSlotActive = (doctorWrapper) => {
        const now = new Date();
        const start = new Date(doctorWrapper.startTime);
        const end = new Date(doctorWrapper.endTime);

        // button enabled if today’s date matches slot date AND now is between start and end
        return (
            now.toDateString() === start.toDateString() &&
            now >= start &&
            now <= end
        );
    };

    const handleClick = () => {
        window.open("https://vc-react-frontend.vercel.app/", "_blank");
    }

    useEffect(() => {

        if (!token) {
            toast.error("You are not logged in");
            navigate("/login");
            return;
        }

        axios
            .get(`${BaseUrl}/user/booked/appointments`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.data && response.data.data) {
                    setAppointments(response.data.data);
                    // console.log("Appointments: ", response.data.data)
                } else {
                    toast.error("Unexpected response format");
                }
            })
            .catch((error) => {
                console.error("Error fetching appointments: ", error);
                toast.error("Failed to fetch appointments");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Navbar />
            <div>
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid"></div>
                        <p className="mt-4 text-gray-600 font-medium">
                            Fetching your appointments, please wait...
                        </p>
                    </div>
                ) : (
                    <>
                        {appointments.length === 0 ? (
                            <div className="text-center py-5">
                                <p className="font-medium">You do not have any appointments</p>
                                <button
                                    onClick={() => navigate("/book-appointment")}
                                    className="mt-2 px-3 py-2 rounded-xl font-medium bg-back text-secondary hover:bg-primary hover:text-back"
                                >
                                    Book Appointment
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4 bg-back">
                                {appointments.map((doctorWrapper) => (
                                    <div
                                        key={doctorWrapper.appointmentId}
                                        className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition"
                                    >
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800">
                                                Appointment Id: {doctorWrapper.appointmentId}
                                            </h2>
                                            <span
                                                className={`inline-block my-2 px-3 py-1 rounded-full text-sm font-medium ${doctorWrapper.appointmentStatus === "BOOKED"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {doctorWrapper.appointmentStatus}
                                            </span>
                                            <p className="text-md text-gray-600 mt-1">
                                                <b>{doctorWrapper.doctorFirstName} {doctorWrapper.doctorLastName}</b> ({doctorWrapper.specialization})
                                            </p>
                                            <p className="text-md text-gray-600 mt-1">
                                                <b>Date:</b> {doctorWrapper.startTime.toString().substring(0, 10).split("-").reverse().join("-")}
                                            </p>
                                            <p className="text-md text-gray-600 mt-1">
                                                <b>Slot:</b>{" "}
                                                {formatTime(doctorWrapper.startTime)} - {" "}
                                                {formatTime(doctorWrapper.endTime)}
                                            </p>
                                            <p className="text-md text-gray-600 mt-1">
                                                <b>Type:</b> {doctorWrapper.slotType}
                                            </p>
                                            <p className="text-md text-gray-600 mt-1">
                                                <b>Email:</b> {doctorWrapper.doctorEmail}
                                            </p>
                                            <p className="text-md text-gray-600 mt-1">
                                                <b>Mobile:</b> {doctorWrapper.doctorMobile}
                                            </p>
                                        </div>

                                        <button
                                            className={`mt-4 py-2 px-4 rounded-lg text-sm font-medium transition 
                                                ${doctorWrapper.slotType === "ONLINE" && isSlotActive(doctorWrapper)
                                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                }`}
                                            disabled={!isSlotActive(doctorWrapper) || doctorWrapper.slotType !== "OFFLINE"}

                                            onClick={handleClick}
                                        >
                                            Start Video Call
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div >

            <Footer />
        </>
    );
};

export default MyAppointments;
