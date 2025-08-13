import React, { useState } from "react";

export default function DoctorDetailsModal({ doctor, onUpdate }) {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = () => {
        if (file) {
            // Pass file + doctor info back to parent
            onUpdate({ doctorId: doctor.id, file });
            setIsOpen(false);
        } else {
            alert("Please select a document to upload.");
        }
    };

    return (
        <div>
            {/* Update Button */}
            <button
                className="bg-blue-600 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                onClick={() => setIsOpen(true)}
            >
                Update
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                        <h2 className="text-xl font-bold mb-4 text-center">Doctor Details</h2>

                        <table className="min-w-full border border-gray-300">
                            <tbody>
                                <tr>
                                    <th className="border border-gray-300 px-2 py-2 w-1/3 text-center">
                                        First Name
                                    </th>
                                    <td className="border border-gray-300 px-4 py-2 w-2/3">
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="First Name"
                                            value={doctor.firstName}
                                            // onChange={handleChange}
                                            required
                                            className="w-full rounded bg-white text-mtext focus:outline-none focus:ring-2 focus:ring-back"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th className="border border-gray-300 px-2 py-2 w-1/3 text-center">
                                        Last Name
                                    </th>
                                    <td className="border border-gray-300 px-4 py-2 w-2/3">
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name"
                                            value={doctor.lastName}
                                            // onChange={handleChange}
                                            required
                                            className="w-full rounded bg-white text-mtext focus:outline-none focus:ring-2 focus:ring-back"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th className="border border-gray-300 px-2 py-2 text-center">
                                        Email
                                    </th>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="First Name"
                                            value={doctor.email}
                                            // onChange={handleChange}
                                            required
                                            className="w-full rounded bg-white text-mtext focus:outline-none focus:ring-2 focus:ring-back"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th className="border border-gray-300 px-2 py-2 text-center">
                                        Verification Status
                                    </th>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <select
                                            value={doctor.verificationStatus}
                                            onChange={(e) => handleVerificationChange(e.target.value, doctor.id)}
                                            className="border border-gray-400 rounded px-2 py-1 w-full"
                                        >
                                            <option value="Pending">{doctor.verificationStatus}</option>
                                            <option value="Verified">Verified</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="border border-gray-300 px-2 py-2 text-center">
                                        Speciality
                                    </th>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <select
                                            value={doctor.specialization}
                                            onChange={(e) => handleVerificationChange(e.target.value, doctor.id)}
                                            className="border border-gray-400 rounded px-2 py-1 w-full"
                                        >
                                            <option value="Pending">{doctor.specialization}</option>
                                            <option value="Verified">Verified</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="border border-gray-300 px-2 py-2 text-center">
                                        Mobile
                                    </th>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <input
                                            type="text"
                                            name="mobile"
                                            placeholder="Mobile"
                                            value={doctor.mobile}
                                            // onChange={handleChange}
                                            required
                                            className="w-full rounded bg-white text-mtext focus:outline-none focus:ring-2 focus:ring-back"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Document Upload */}
                        <div className="mt-4">
                            <label className="block font-medium mb-2">
                                Upload New Document:
                            </label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                                onClick={handleSubmit}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}