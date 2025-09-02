import React, { useEffect, useState } from 'react'
import { fetchDoctorByUserId, getSlotsByDoctorId } from '../../services/doctorApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AppointmentModal = ({ closeAppointmentModal, doctorId }) => {

    const navigate = useNavigate();
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSlot, setSelectedSlot] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    const fetchSlotsByDoctor = async () => {
        try {
            const response = await getSlotsByDoctorId(token, doctorId);

            if (response.statusCode === 200) {
                setSlots(response.data.filter((slot) => slot.available));
                // console.log("Slots response: ", response.data.filter((slot) => slot.available))
            } else {
                toast.error(response.message || "Failed to fetch slots.");
            }
        } catch (error) {
            toast.error(error.response?.message || "Something went wrong while fetching slots.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (doctorId) {
            fetchSlotsByDoctor(doctorId);
        }
    }, [doctorId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedSlot) {
            toast.error("Please select a slot to book.");
            return;
        }
    }

    // console.log("Slots just before mapping: ", slots);

    const formatFullDate = (dateString) => {
        const date = new Date(dateString);

        const day = date.toLocaleDateString("en-GB", { day: "2-digit" });
        const month = date.toLocaleDateString("en-GB", { month: "long" });
        const year = date.getFullYear();
        const weekday = date.toLocaleDateString("en-GB", { weekday: "long" });

        return `${day} ${month} ${year} (${weekday})`; // "04 September 2025 (Thursday)"
    };

    const uniqueDates = [
        ...new Set(slots.map((slot) => formatFullDate(slot.startTime))),
    ];

    const filteredSlots = slots.filter(
        (slot) => formatFullDate(slot.startTime) === selectedDate
    );

    const handleBook = () => {
        if (!selectedSlot) {
            return;
        }
        console.log("Booking slot: ", selectedSlot);
        alert("Booking functionality coming soon !! ");
        // API call to book slot here
    };

    return (
        <>
            <div className="max-w-2xl mx-auto bg-back rounded-xl p-6 sm:p-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-primary">
                    Book Your Slot
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-white text-2xl mb-2">
                            Select Slot
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-2 text-mtext" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                </div>
                            ) : (
                                ""
                            )}
                        </label>

                        <select
                            value={selectedDate}
                            onChange={(e) => {
                                setSelectedDate(e.target.value);
                                setSelectedSlot(null);
                            }}
                            className="border rounded p-2 w-full"
                        >
                            <option value="">-- Select Date --</option>
                            {uniqueDates.map((date, index) => (
                                <option key={index} value={date}>
                                    {date}
                                </option>
                            ))}
                        </select>

                        {/* Slot time boxes */}
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            {filteredSlots.map((slot) => (
                                <button
                                    key={slot.id}
                                    onClick={() => setSelectedSlot(slot)}
                                    className={`p-3 rounded-lg border
                                        ${selectedSlot?.id === slot.id
                                            ? "bg-secondary text-black"
                                            : "bg-gray-100 hover:bg-gray-200"
                                        }`}
                                >
                                    {new Date(slot.startTime).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}{" "}
                                    -{" "}
                                    {new Date(slot.endTime).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="text-center">
                        {filteredSlots.length > 0 && (
                            <button
                                onClick={handleBook}
                                className="mt-6 w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary hover:text-"
                            >
                                Book Slot
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </>
    )
}

export default AppointmentModal