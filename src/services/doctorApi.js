// services/doctorService.js
import axios from "axios";
import BaseUrl from "../reusables/BaseUrl";

export const fetchDoctorByUserId = async (token, userId) => {
    try {
        const response = await axios.get(`${BaseUrl}/doctor/by-user-id`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                userId,
            },
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAllSpecializations = async () => {
    try {
        const response = await axios.get(`${BaseUrl}/speciality/all`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getSlotsByDoctorId = async (token, doctorId) => {
    try {
        const response = await axios.get(
            `${BaseUrl}/slot/doctor/${doctorId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const bookAppointment = async (token, slotId) => {
    try {
        const response = await axios.put(
            `${BaseUrl}/user/book-appointment`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    slotId,
                }
            }
        );
        // console.log("Book appointment response from api: ", response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
