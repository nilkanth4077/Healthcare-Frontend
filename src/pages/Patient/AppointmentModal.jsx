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

    const uniqueDates = [
        ...new Set(
            slots.map((slot) => new Date(slot.startTime).toDateString())
        ),
    ];

    // Filter slots by selected date
    const filteredSlots = slots.filter(
        (slot) => new Date(slot.startTime).toDateString() === selectedDate
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
                        </label>

                        {/* <select
                            value={selectedSlot}
                            onChange={(e) => setSelectedSlot(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        >
                            <option value="">-- Choose a Slot --</option>
                            {slots.map((slot) => (
                                <option key={slot.id} value={slot.id}>
                                    {new Date(slot.startTime).toDateString().toString().substring()} (
                                    {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}-
                                    {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    )
                                </option>
                            ))}
                        </select> */}

                        <select
                            value={selectedDate}
                            onChange={(e) => {
                                setSelectedDate(e.target.value);
                                setSelectedSlot(null); // reset when date changes
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