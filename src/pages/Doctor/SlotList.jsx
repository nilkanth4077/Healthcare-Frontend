import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BaseUrl from "../../reusables/BaseUrl";

const SlotList = ({ slots, setSlots }) => {

    const navigate = useNavigate();
    var slotId = null;

    const handleDetails = (item) => {
        slotId = item.id;
        navigate(`/slot/${slotId}`, { state: { slotId } });
    };

    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    // console.log("Slots from SlotList: ", slots);

    if (!token || !userString) {
        toast.error("Please login first.");
        navigate("/login");
        return;
    }

    const handleDelete = async (slotId) => {
        console.log("Slot Id: ", slotId)
        try {
            const response = await axios.delete(
                `${BaseUrl}/slot/delete`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        slotId: slotId,
                    }
                }
            );

            if (response.data.statusCode === 200) {
                console.log("Slot deleted with id: ", slotId);
                toast.success("Slot deleted with id: " + response.data.data.id);
                setSlots(prev => prev.filter(slot => slot.id !== slotId)); // Remove from local state
            } else {
                toast.error(response.data.message || "Failed to delete slot.");
            }
        } catch (error) {
            console.error(error);
            toast.error(error);
        }
    };

    return (
        <div className="overflow-x-auto mb-20">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="py-3 px-6 text-left">Slot Id</th>
                        <th className="py-3 px-6 text-left">Type</th>
                        <th className="py-3 px-6 text-left">Date</th>
                        <th className="py-3 px-6 text-left">Start Time</th>
                        <th className="py-3 px-6 text-left">End Time</th>
                        <th className="py-3 px-6 text-left">Available</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {slots.map((item, index) => (
                        <tr
                            key={index}
                            className={`border-t ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                        >
                            <td className="py-3 px-6">{item.id}</td>
                            <td className="py-3 px-6">{item.slotType}</td>
                            <td className="py-3 px-6">{item.startTime.toString().substring(0, 10)}</td>
                            <td className="py-3 px-6">{item.startTime.toString().substring(11, 16)}</td>
                            <td className="py-3 px-6">{item.endTime.toString().substring(11, 16)}</td>
                            <td className="py-3 px-6">{item.available.toString()}</td>
                            <td className="py-3 px-6 text-center whitespace-nowrap">

                                <div className="hidden sm:flex gap-2 justify-center">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                        onClick={() => handleDetails(item)}
                                    >
                                        Details
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </div>

                                {/* Mobile screen - dropdown menu */}
                                <div className="relative sm:hidden inline-block text-left">
                                    <details className="group">
                                        <summary className="bg-gray-700 hover:bg-gray-800 text-white px-2 py-1 rounded text-sm cursor-pointer">
                                            Actions
                                        </summary>
                                        <div className="relative z-10 mt-2 w-32 bg-white rounded shadow-lg border border-gray-200">
                                            <button
                                                className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                                                onClick={() => handleDetails(item)}
                                            >
                                                Details
                                            </button>
                                            <button
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </details>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SlotList;