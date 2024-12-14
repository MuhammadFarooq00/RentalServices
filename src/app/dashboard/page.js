// 'use client'; // Required for Next.js client-side components
// import { useState } from 'react';

// const Dashboard = () => {
//     // State to store all services
//     const [services, setServices] = useState([]);

//     // State for the form fields (title, description, type)
//     const [formData, setFormData] = useState({ title: '', description: '', type: '' });

//     // Updates formData whenever the user types in the form fields
//     const handleInputChange = (e) => {
//         const { name, value } = e.target; // Get the input field's name and value
//         setFormData({ ...formData, [name]: value }); // Update the corresponding field in formData
//     };

//     // Adds a new service to the services list
//     const handleAddService = (e) => {
//         e.preventDefault(); // Prevent the page from reloading on form submission
//         setServices([...services, { ...formData, id: Date.now() }]); // Add new service with a unique ID
//         setFormData({ title: '', description: '', type: '' }); // Clear the form
//     };

//     // Deletes a service by filtering it out of the services list
//     const handleDeleteService = (id) => {
//         setServices(services.filter((service) => service.id !== id)); // Keep all services except the one with the matching ID
//     };

//     // Updates a specific service with new details
//     const handleUpdateService = (id, updatedService) => {
//         setServices(
//             services.map((service) =>
//                 service.id === id ? { ...service, ...updatedService } : service // Update if IDs match, else keep unchanged
//             )
//         );
//     };

//     return (
//         <div className="min-h-screen p-8 mt-5 text-black bg-gray-100">
//             <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">Rental Services Dashboard</h1>

//             {/* Form Section */}
//             <div className="max-w-lg p-6 mx-auto mb-8 bg-white rounded-lg shadow-lg">
//                 <h2 className="mb-4 text-2xl font-semibold text-gray-700">Add Service</h2>
//                 <form onSubmit={handleAddService}>
//                     {/* Service Title Input */}
//                     <div className="mb-4">
//                         <label className="block mb-1 text-gray-600">Service Title</label>
//                         <input
//                             type="text"
//                             name="title"
//                             value={formData.title} // Controlled input
//                             onChange={handleInputChange}
//                             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//                             required
//                         />
//                     </div>

//                     {/* Description Input */}
//                     <div className="mb-4">
//                         <label className="block mb-1 text-gray-600">Description</label>
//                         <textarea
//                             name="description"
//                             value={formData.description} // Controlled textarea
//                             onChange={handleInputChange}
//                             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//                             rows="3"
//                             required
//                         ></textarea>
//                     </div>

//                     {/* Type Dropdown */}
//                     <div className="mb-4">
//                         <label className="block mb-1 text-gray-600">Type</label>
//                         <select
//                             name="type"
//                             value={formData.type} // Controlled select
//                             onChange={handleInputChange}
//                             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//                         >
//                             <option value="">Select Service Type</option>
//                             <option value="Web Services">Web Services</option>
//                             <option value="SEO Services">SEO Services</option>
//                             <option value="Rental Services">Rental Services</option>
//                         </select>
//                     </div>

//                     {/* Submit Button */}
//                     <button
//                         type="submit"
//                         className="px-4 py-2 mt-10 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
//                     >
//                         Add Service
//                     </button>
//                 </form>
//             </div>

//             {/* Services List Section */}
//             <div className="max-w-4xl mx-auto">
//                 <h2 className="mb-4 text-2xl font-semibold text-gray-700">Services</h2>
//                 {services.length === 0 ? (
//                     <p className="text-gray-600">No services added yet.</p>
//                 ) : (
//                     <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//                         {services.map((service) => (
//                             <div
//                                 key={service.id}
//                                 className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-lg"
//                             >
//                                 {/* Service Details */}
//                                 <div>
//                                     <h3 className="text-lg font-bold text-gray-800">{service.title}</h3>
//                                     <p className="mb-4 text-gray-600">{service.description}</p>
//                                     <span className="inline-block px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full">
//                                         {service.type}
//                                     </span>
//                                 </div>

//                                 {/* Action Buttons */}
//                                 <div className="flex justify-between mt-4">
//                                     <button
//                                         onClick={() =>
//                                             handleUpdateService(service.id, {
//                                                 title: 'Updated Title',
//                                                 description: 'Updated Description',
//                                             })
//                                         }
//                                         className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
//                                     >
//                                         Update
//                                     </button>
//                                     <button
//                                         onClick={() => handleDeleteService(service.id)}
//                                         className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
//                                     >
//                                         Delete
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Dashboard;



// "use client";

// import { useState } from "react";
// import RentalTable from "./components/RentalTable";
// import { rentals } from "./utils/dummyData";

// export default function DashboardPage() {
//     const [data, setData] = useState(rentals);

//     const handleDelete = (id) => {
//         setData(data.filter((rental) => rental.id !== id));
//     };

//     const handleUpdate = (updatedRental) => {
//         setData(
//             data.map((rental) => (rental.id === updatedRental.id ? updatedRental : rental))
//         );
//     };

//     return (
//         <div className="p-4">
//             <header className="flex justify-between items-center mb-6">
//                 <h1 className="text-2xl font-bold text-gray-800">Rental Services Dashboard</h1>
//                 <button
//                     onClick={() => (window.location.href = "/login")}
//                     className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
//                 >
//                     Logout
//                 </button>
//             </header>
//             <RentalTable
//                 data={data}
//                 onDelete={handleDelete}
//                 onUpdate={handleUpdate}
//             />
//         </div>
//     );
// }


'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import Link from 'next/link';

const rentals = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Property ${i + 1}`,
  price: 100 + (i % 300),
  image: `https://picsum.photos/200/300?random=${i + 1}`,
  description: 'This is a rental property with amenities for your stay.',
  rating: (3 + (i % 2)).toFixed(1),
  location: `Location ${i + 1}`,
}));

export default function DashboardPage() {
  const [rentalList, setRentalList] = useState(rentals);
  const [selectedRental, setSelectedRental] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rentalToDelete, setRentalToDelete] = useState(null);
  const [updatedRental, setUpdatedRental] = useState({
    title: '',
    price: '',
    description: '',
    location: '',
    rating: '',
    image: '',
  });
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  const handleEditClick = (rental) => {
    setSelectedRental(rental);
    setUpdatedRental({
      title: rental.title,
      price: rental.price,
      description: rental.description,
      location: rental.location,
      rating: rental.rating,
      image: rental.image,
    });
    setEditModalOpen(true);
  };

  const handleDeleteClick = (rental) => {
    setRentalToDelete(rental);
    setDeleteModalOpen(true);
  };

  const handleUpdate = () => {
    setRentalList((prev) =>
      prev.map((rental) =>
        rental.id === selectedRental.id
          ? { ...rental, ...updatedRental }
          : rental
      )
    );
    setEditModalOpen(false);
  };

  const handleDelete = () => {
    setRentalList((prev) =>
      prev.filter((rental) => rental.id !== rentalToDelete.id)
    );
    setDeleteModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedRental((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Rental Service Dashboard</h1>
      <Link
        href="/add-rental"
        className="fixed bottom-4 right-2 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-700 transition-all ease-in-out duration-300 animate-bounce"
      >
        <FaPlus size={24} />
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rentalList.map((rental) => (
          <div key={rental.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={rental.image} alt={rental.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{rental.title}</h2>
              <p className="text-gray-600">{rental.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold">${rental.price}</span>
                <div className="flex space-x-2">
                  <button
                    className="text-yellow-500 hover:text-yellow-700"
                    onClick={() => handleEditClick(rental)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteClick(rental)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div onClick={ () => setEditModalOpen(false)} className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl overflow-y-auto h-auto">
            <h2 className="text-2xl font-semibold mb-4">Edit Rental</h2>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={updatedRental.title}
              onChange={(e) => setUpdatedRental({ ...updatedRental, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Title"
            />
            <label className="block text-sm font-medium mb-2">Price</label>
            <input
              type="number"
              value={updatedRental.price}
              onChange={(e) => setUpdatedRental({ ...updatedRental, price: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Price"
            />
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={updatedRental.description}
              onChange={(e) => setUpdatedRental({ ...updatedRental, description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Description"
            />
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              value={updatedRental.location}
              onChange={(e) => setUpdatedRental({ ...updatedRental, location: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Location"
            />
            <label className="block text-sm font-medium mb-2">Rating</label>
            <input
              type="number"
              value={updatedRental.rating}
              onChange={(e) => setUpdatedRental({ ...updatedRental, rating: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Rating"
            />
            <label className="block text-sm font-medium mb-2">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            {updatedRental.image && (
              <img
                src={updatedRental.image}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white rounded-lg px-4 py-2"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
            <p className="text-gray-600 mb-4">Do you really want to delete this rental?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white rounded-lg px-4 py-2"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
