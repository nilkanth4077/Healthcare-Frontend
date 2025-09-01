import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BaseUrl from "../../reusables/BaseUrl";
import SlotList from "./SlotList";

const SlotListPage = () => {
    const navigate = useNavigate();
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [doctor, setDoctor] = useState({});

    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    const fetchSlotsByDoctor = async () => {
        try {
            const response = await axios.get(
                `${BaseUrl}/slot/doctor/${doctor.doctorId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.statusCode === 200) {
                setSlots(response.data.data);
            } else {
                toast.error(response.data.message || "Failed to fetch slots.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while fetching slots.");
        } finally {
            setLoading(false);
        }
    };

    const fetchDoctorByUserId = async () => {
        try {
            const response = await axios.get(
                `${BaseUrl}/doctor/by-user-id`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        userId: user.id,
                    }
                }
            );

            if (response.data.statusCode === 200) {
                setDoctor(response.data.data);
                // console.log("Doc data: ", response.data.data)
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

    useEffect(() => {

        if (!token || !userString) {
            toast.error("Please login first.");
            navigate("/login");
            return;
        }
        fetchDoctorByUserId();
    }, [navigate]);

    useEffect(() => {
        if (doctor.doctorId) {
            fetchSlotsByDoctor(doctor.doctorId);
        }
    }, [doctor]);

    // console.log("Doc from doctor: ", doctor)

    return (
        <>
            <div className="min-h-screen bg-gray-100 px-4 py-8">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid"></div>
                        <p className="mt-4 text-gray-600 font-medium">
                            Fetching slots, please wait...
                        </p>
                    </div>
                ) : (
                    <SlotList slots={slots} setSlots={setSlots} />
                )}
            </div>
        </>
    );
};

export default SlotListPage;