import React, { useEffect } from 'react'
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SlotListPage from './SlotListPage';
import AddSlots from './AddSlots';

const DocSlotManagement = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const doctorId = 17;

        if (!token) {
            toast.error("You are not logged in");
            navigate("/login");
            return;
        }

        try {
            // axios
            //     .get(`http://localhost:8080/slot/doctor/${doctorId}`, {
            //         headers: {
            //             Authorization: `Bearer ${token}`,
            //         },
            //     })
            //     .then((response) => {
            //         if (response.data && response.data.data) {
            //             console.log("Slots data: ", response.data.data)
            //         } else {
            //             console.error("Unexpected response format");
            //         }
            //     })
            //     .catch((error) => {
            //         console.error("Error fetching slots:", error);
            //     });
        } catch (error) {
            console.error("Error in Slot Management: ", error);
        }
    });

    return (
        <>
            <Navbar />
            <div className='text-center font-semibold text-3xl my-5'>Slot Management</div>
            <div>
                <AddSlots />
                <SlotListPage />
            </div>
            <Footer />
        </>
    )
}

export default DocSlotManagement