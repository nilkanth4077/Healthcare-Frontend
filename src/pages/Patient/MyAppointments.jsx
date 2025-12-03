import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import BaseUrl from "../../reusables/BaseUrl";
import { triggerRoomDetails } from "../../services/doctorApi";

const MyAppointments = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingId, setLoadingId] = useState(null);

    const token = localStorage.getItem("token");

    const formatTime = (dateStr) => {
        if (!dateStr) return "";
        const [hourStr, minute] = dateStr.substring(11, 16).split(":");
        let hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        return `${hour}:${minute} ${ampm}`;
    };

    const isSlotActive = (slot) => {
        const now = new Date();
        const start = new Date(slot.startTime);
        const end = new Date(slot.endTime);

        return now >= start && now <= end;
    };

    const handleClick = async (appointmentId) => {
        setLoadingId(appointmentId);
        try {
            const response = await triggerRoomDetails(appointmentId, token);
            console.log("Trigger room details response: ", response);
            if (response.statusCode === 200) {
                toast.success("Room details sent to your email", {
                    autoClose: 2000,
                    onClose: () => {
                        window.open("https://vc-react-frontend.vercel.app/", "_blank");
                    }
                });
            } else {
                toast.error(response.message || "Failed to send room details");
            }
        } catch (error) {
            console.log("Error triggering room details: ", error);
            toast.error("Something went wrong triggering email");
        } finally {
            setLoadingId(null);
        }
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
                            <>
                                <p className="bg-back text-center text-primary p-2">Tip : <span className="text-secondary">Once your slot begins, refresh to enable the button.</span></p>
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

                                            {/* <button
                                                className={`mt-4 py-2 px-4 rounded-lg text-sm font-medium transition 
                                                ${doctorWrapper.slotType === "ONLINE" && isSlotActive(doctorWrapper)
                                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                    }`}
                                                disabled={doctorWrapper.slotType !== "ONLINE" || !isSlotActive(doctorWrapper)}
                                                onClick={() => handleClick(doctorWrapper.appointmentId)}
                                            >
                                                Start Video Call
                                            </button> */}

                                            <button
                                                className={`mt-4 py-2 px-4 rounded-lg text-sm font-medium transition flex justify-center items-center gap-2
                                                    ${doctorWrapper.slotType === "ONLINE" &&
                                                        isSlotActive(doctorWrapper)
                                                        ? "bg-blue-600 text-white hover:bg-blue-700"
                                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                    }`}
                                                disabled={
                                                    doctorWrapper.slotType !== "ONLINE" ||
                                                    !isSlotActive(doctorWrapper) ||
                                                    loadingId === doctorWrapper.appointmentId
                                                }
                                                onClick={() =>
                                                    handleClick(doctorWrapper.appointmentId)
                                                }
                                            >
                                                {loadingId === doctorWrapper.appointmentId ? (
                                                    <>
                                                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    "Start Video Call"
                                                )}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div >

            <Footer />
        </>
    );
};

export default MyAppointments;
