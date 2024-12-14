import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FiX, FiCalendar, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { FaRegFileZipper, FaTreeCity } from 'react-icons/fa6';
import { CiDeliveryTruck } from 'react-icons/ci';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';

// Set the app element for accessibility
Modal.setAppElement(document.body);

const BookingPage = ({ isOpen, onClose, serviceName, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: new Date(),
    comments: '',
    product: '',
    delivery: '',
    address: '',
    city: '',
    code: ''
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle date change
  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      date: date,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass form data to the parent component or backend
  };

  return (
    <Modal
  isOpen={isOpen}
  onRequestClose={onClose}
  className="modal-content w-full max-w-4xl  mx-auto py-8 bg-white rounded-lg shadow-xl"
  overlayClassName="modal-overlay fixed inset-0  z-[999] bg-black bg-opacity-50 flex justify-center items-center"
  closeTimeoutMS={300}
>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="relative max-h-[90vh] overflow-y-auto p-4 modal-content"
  >
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-3xl font-semibold text-gray-800">{serviceName} Booking</h2>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
        <FiX size={28} />
      </button>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Service Name - Read-only */}
      <div className="mb-4">
        <label className="block text-lg text-gray-700">Service Name</label>
        <input
          type="text"
          value={serviceName}
          disabled
          className="w-full p-4 border border-gray-300 rounded-lg text-gray-600 bg-gray-100"
        />
      </div>

      {/* Customer Name */}
      <div className="mb-4">
        <label className="block text-lg text-gray-700">Your Name</label>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <FiUser className="text-gray-500 mr-3" size={24} />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="w-full p-4 text-gray-600"
          />
        </div>
      </div>

      {/* Email Address */}
      <div className="mb-4">
        <label className="block text-lg text-gray-700">Email Address</label>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <FiMail className="text-gray-500 mr-3" size={24} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full p-4 text-gray-600"
          />
        </div>
      </div>

      {/* Phone Number */}
      <div className="mb-4">
        <label className="block text-lg text-gray-700">Phone Number</label>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <FiPhone className="text-gray-500 mr-3" size={24} />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
            className="w-full p-4 text-gray-600"
          />
        </div>
      </div>

      {/* Booking Date */}
      <div className="mb-4">
        <label className="block text-lg text-gray-700">Booking Date</label>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <FiCalendar className="text-gray-500 mr-3" size={24} />
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="yyyy/MM/dd"
            className="w-full p-4 text-gray-600 border-none"
            required
          />
        </div>
      </div>


        {/* City Name */}
        <div className="mb-4">
            <label className="block text-lg text-gray-700">City</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <FaTreeCity className="mr-3 text-gray-500" size={24} />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter City Name"
                required
                className="w-full p-4 text-gray-600"
              />
            </div>
          </div>
          {/* Zip code */}
          <div className="mb-4">
            <label className="block text-lg text-gray-700">Zip code</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <FaRegFileZipper className="mr-3 text-gray-500" size={24} />
              <input
                type="number"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Enter Zip code"
                required
                className="w-full p-4 text-gray-600"
              />
            </div>
          </div>

          {/* Booking Date */}
          <div className="mb-4">
            <label className="block text-lg text-gray-700">Booking Date</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <FiCalendar className="mr-3 text-gray-500" size={24} />
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                dateFormat="yyyy/MM/dd"
                className="w-full p-4 text-gray-600 border-none"
                required
              />
            </div>
          </div>
          {/* Delivery Type */}
          <div className="mb-4">
            <label className="block text-lg text-gray-700"> Delivery Type</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <CiDeliveryTruck className="mr-5 text-gray-500 " size={24} />
              <input
                type="text"
                name="delivery"
                value={formData.delivery}
                onChange={handleChange}
                placeholder="Enter delivery type"
                required
                className="w-full p-4 text-gray-600 "
              />
            </div>
          </div>

          {/* Product Detail */}
          <div className="mb-4">
            <label className="block text-lg text-gray-700">Product Detail</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <MdOutlineProductionQuantityLimits className="mr-3 text-gray-500" size={24} />
              <input
                type="text"
                name="product"
                value={formData.product}
                onChange={handleChange}
                placeholder="Enter product detail"
                required
                className="w-full p-4 text-gray-600"
              />
            </div>
          </div>

      {/* Comments */}
      <div className="mb-4">
        <label className="block text-lg text-gray-700">Additional Comments (optional)</label>
        <textarea
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Any special requests or comments?"
          rows={4}
          className="w-full p-4 border border-gray-300 rounded-lg text-gray-600"
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition duration-300"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        Submit Booking
      </motion.button>
    </form>
  </motion.div>
</Modal>

  );
};

export default BookingPage;
