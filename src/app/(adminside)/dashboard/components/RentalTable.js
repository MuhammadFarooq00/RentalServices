import { FiEdit, FiTrash } from "react-icons/fi";
import RentalModal from "./RentalModal";
import { useState } from "react";

export default function RentalTable({ data, onDelete, onUpdate }) {
    const [modalData, setModalData] = useState(null);

    const handleEdit = (rental) => {
        setModalData(rental);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-left border">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((rental) => (
                        <tr key={rental.id} className="border-b">
                            <td className="px-4 py-2">{rental.id}</td>
                            <td className="px-4 py-2">{rental.title}</td>
                            <td className="px-4 py-2">${rental.price}</td>
                            <td className="px-4 py-2 space-x-2">
                                <button
                                    onClick={() => handleEdit(rental)}
                                    className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-700"
                                >
                                    <FiEdit />
                                </button>
                                <button
                                    onClick={() => onDelete(rental.id)}
                                    className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-700"
                                >
                                    <FiTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalData && (
                <RentalModal
                    rental={modalData}
                    onClose={() => setModalData(null)}
                    onUpdate={onUpdate}
                />
            )}
        </div>
    );
}
