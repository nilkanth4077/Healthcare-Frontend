import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DoctorList from "./DoctorList";
import BaseUrl from "../../reusables/BaseUrl";

const DoctorDetails = () => {
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState({});
    const { docId } = useParams();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userString = localStorage.getItem("user");

        if (!token || !userString) {
            toast.error("Please login first.");
            navigate("/login");
            return;
        }

        const fetchDoctor = async () => {
            try {
                const response = await axios.get(
                    `${BaseUrl}/get/doctor`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            docId: docId,
                        }
                    }
                );

                if (response.data.statusCode === 200) {
                    setDoctor(response.data.data);
                } else {
                    toast.error(response.data.message || "Failed to fetch doctor.");
                }
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong while fetching doctor.");
            }
        };

        if (docId) fetchDoctor();
    }, [docId, navigate]);

    return (
        <>
            <div className="min-h-screen bg-gray-100 px-4 py-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Doctor Name: {doctor.firstName}
                </h2>
                <div>
                    {doctor.document && (
                        <iframe
                            title="Doctor Document"
                            src={`data:application/pdf;base64,${doctor.document}`}
                            width="100%"
                            height="500px"
                            className="rounded shadow"
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default DoctorDetails;