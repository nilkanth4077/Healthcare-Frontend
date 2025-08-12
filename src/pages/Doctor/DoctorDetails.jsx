import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DoctorList from "./DoctorList";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import BaseUrl from "../../reusables/BaseUrl";

const DoctorDetails = () => {
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState({});
    const [loading, setLoading] = useState(true);
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
            } finally {
                setLoading(false);
            }
        };

        if (docId) fetchDoctor();
    }, [docId, navigate]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 px-4 py-8">
                <h4 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Doctor Details
                </h4>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid"></div>
                        <p className="mt-4 text-gray-600 font-medium">
                            Fetching doctor details, please wait...
                        </p>
                    </div>
                ) : (
                    <>
                        <table className="min-w-full  bg-white shadow-md rounded-lg overflow-hidden">
                            <tbody>
                                <tr>
                                    <th className="m-0 text-center">Name</th>
                                    <td className="py-3 text-left">{doctor.firstName} {doctor.lastName}</td>
                                </tr>
                                <tr>
                                    <th className="text-center">Email</th>
                                    <td className="py-3 text-left">{doctor.email}</td>
                                </tr>
                                <tr>
                                    <th className="text-center">Verification Status</th>
                                    <td className="py-3 text-left">{doctor.verificationStatus}</td>
                                </tr>
                                <tr>
                                    <th className="text-center">Speciality</th>
                                    <td className="py-3 text-left">{doctor.specialization}</td>
                                </tr>
                                <tr>
                                    <th className="text-center">Mobile</th>
                                    <td className="py-3 text-left">{doctor.mobile}</td>
                                </tr>
                            </tbody>
                        </table>
                        {doctor.document && (
                            <div className="bg-white shadow-md rounded-lg mt-4 p-4">
                                <h3 className="text-center font-semibold mb-2">Document</h3>
                                <iframe
                                    title="Doctor Document"
                                    src={`data:application/pdf;base64,${doctor.document}`}
                                    className="rounded shadow w-full"
                                    style={{ minHeight: "500px" }}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default DoctorDetails;