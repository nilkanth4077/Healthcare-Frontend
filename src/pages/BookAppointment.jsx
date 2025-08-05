import React, { useEffect, useState } from "react";
import Navigation from "../components/Navbar";
import { Footer } from "../components/Footer";
import online from "../assets/images/online.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import BaseUrl from "../BaseUrl";

function BookAppointment() {
    const navigate = useNavigate();
    const [specialities, setSpecialities] = useState([]);
    const [selectedSpeciality, setSelectedSpeciality] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userString = localStorage.getItem("user");
        const user = JSON.parse(userString);

        if (!token) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }

        try {
            if (user.role !== "USER") {
                toast.error("Access denied. Only patients can book appointments.");
                navigate("/");
                return;
            }

            axios
                .get(`${BaseUrl}/speciality/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setSpecialities(res.data.data);
                })
                .catch((err) => {
                    toast.error("Error fetching specialities.");
                    console.error(err);
                });

        } catch (error) {
            toast.error("Invalid session. Please login again.");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
        }
    }, []);

    const handleSubmit = () => {
        if (!selectedSpeciality) {
            toast.warn("Please select a speciality");
            return;
        }
        toast.success(`Appointment requested for ${selectedSpeciality}`);
        navigate("/appointment-details", { state: { speciality: selectedSpeciality } });
    };

    return (
        <>
            <Navigation />
            <div className="bg-back min-h-screen flex flex-col justify-center items-center px-4 py-2">
                <div className="max-w-6xl w-full bg-dark rounded-lg shadow-lg p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">

                    {/* Left - Image */}
                    <div className="w-full md:w-1/2 flex justify-center">
                        <img
                            src={online}
                            className="w-full h-[300px] md:h-[400px] rounded-lg shadow-lg object-cover"
                            alt="Online Doctor Consultation"
                        />
                    </div>

                    {/* Right - Form */}
                    <div className="w-full md:w-1/2 text-white">
                        <h4 className="text-lg font-semibold text-primary">Ask a Doctor in Just One Click!</h4>
                        <h2 className="text-2xl md:text-3xl font-bold mt-2">Consult online via video, audio, or text.</h2>

                        <div className="mt-6">
                            <label className="block text-white font-medium mb-2">Select Specialty</label>
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <select
                                    name="specialist"
                                    value={selectedSpeciality}
                                    onChange={(e) => setSelectedSpeciality(e.target.value)}
                                    className="w-full md:w-3/4 p-3 rounded-lg bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                >
                                    <option value="">Select Specialty</option>
                                    {specialities.map((speciality, index) => (
                                        <option key={index} value={speciality.specialization}>
                                            {speciality.specialization}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={handleSubmit}
                                    className="w-full md:w-1/4 bg-primary text-white py-3 rounded-lg hover:bg-secondary transition"
                                >
                                    Make Appointment
                                </button>
                            </div>
                        </div>

                        <p className="mt-4 text-gray-400 text-sm text-center">
                            Bring your health manager home by installing Docureka. Easily book appointments, track health,
                            consult online, and keep medical records.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default BookAppointment;