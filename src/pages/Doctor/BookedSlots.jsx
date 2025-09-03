import React, { useEffect, useState } from "react";
import { fetchDoctorByUserId, getBookedSlots } from "../../services/doctorApi";
import { toast } from "react-toastify";
import { Footer } from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BaseUrl from "../../reusables/BaseUrl";

export default function BookedSlots() {

    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingSlotId, setLoadingSlotId] = useState(null);
    const [doctor, setDoctor] = useState({});

    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    const getDoctorByUserId = async () => {
        try {
            const response = await fetchDoctorByUserId(token, user.id);

            if (response.statusCode === 200) {
                setDoctor(response.data);
                // console.log("Doc data: ", response.data)
            } else {
                toast.error(response.message || "Failed to fetch doctor.");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.message || "Something went wrong while fetching doctor.");
        } finally {
            setLoading(false);
        }
    };

    const fetchBookedSlots = async () => {
        try {
            const response = await getBookedSlots(doctor.doctorId, token);

            if (response.statusCode === 200) {
                setSlots(response.data);
                // console.log("Slots response: ", response.data)
            } else {
                toast.error(response.message || "Failed to fetch slots.");
            }
        } catch (error) {
            toast.error(error.response?.message || "Something went wrong while fetching slots.");
        } finally {
            setLoading(false);
        }
    };

    const isSlotActive = (slot) => {
        const now = new Date();
        const start = new Date(slot.startTime);
        const end = new Date(slot.endTime);

        // button enabled if today’s date matches slot date AND now is between start and end
        return (
            now.toDateString() === start.toDateString() &&
            now >= start &&
            now <= end
        );
    };


    useEffect(() => {
        getDoctorByUserId();
    }, []);

    useEffect(() => {
        if (doctor.doctorId) {
            fetchBookedSlots();
        }
    }, [doctor.doctorId]);

    const handleClick = async (slot) => {
        console.log("Clicked slot: ", slot.patientEmail, slot.appointmentId);
        setLoadingSlotId(slot.appointmentId);
        try {
            const response = await axios.post(
                `${BaseUrl}/doctor/call/send-invite`,
                null,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        patientEmail: slot.patientEmail,
                        roomName: `appointment-${slot.appointmentId}`
                    }
                }
            );

            if (response.data.statusCode === 200) {
                toast.success("Invite sent to patient!", {
                    autoClose: 1500,
                    onClose: () => {
                        window.open(`/call?roomName=appointment-${slot.appointmentId}`, "_blank", "noopener,noreferrer");
                    }
                });
            }
        } catch (error) {
            console.log("Error: ", error)
            toast.error(error.response?.message || "Failed to send invite");
        } finally {
            setLoadingSlotId(null);
        }
    };

    return (
        <>
            <Navbar />
            <div className="p-6 bg-back">
                <h2 className="text-2xl font-bold mb-6 text-white text-center">Booked Slots</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {slots.map((slot) => (
                        <div
                            key={slot.appointmentId}
                            className="bg-white shadow-md rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition"
                        >
                            {/* Patient Info */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {slot.patientName}
                                </h3>
                                <p className="text-sm text-gray-500">{slot.patientEmail}</p>
                                <p className="text-sm text-gray-500">{slot.patientMobile}</p>
                            </div>

                            {/* Slot Info */}
                            <div className="mt-3">
                                <p className="text-sm text-gray-700">
                                    <span className="font-medium">Type:</span> {slot.slotType}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <span className="font-medium">Start:</span>{" "}
                                    {new Date(slot.startTime).toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <span className="font-medium">End:</span>{" "}
                                    {new Date(slot.endTime).toLocaleString()}
                                </p>
                                <span
                                    className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${slot.status === "BOOKED"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {slot.status}
                                </span>
                            </div>

                            {/* Button */}
                            <button

                                className="mt-4 py-2 px-4 rounded-lg text-sm font-medium transition bg-blue-600 text-white hover:bg-blue-700"

                                // className={`mt-4 py-2 px-4 rounded-lg text-sm font-medium transition 
                                //     ${isSlotActive(slot)
                                //         ? "bg-blue-600 text-white hover:bg-blue-700"
                                //         : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                //     }`}
                                // disabled={!isSlotActive(slot)}

                                onClick={() => handleClick(slot)}
                            >
                                {loadingSlotId === slot.appointmentId ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 mr-2 text-mtext" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                                        </svg>
                                        Sending invitation mail...
                                    </div>
                                ) : (
                                    "Start Video Call"
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}