import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FiX, FiCalendar, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { FaRegFileZipper, FaTreeCity } from 'react-icons/fa6';
import { CiDeliveryTruck } from 'react-icons/ci';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FaRegAddressCard } from "react-icons/fa";

const BookingModal = ({ isOpen, onClose, serviceName, onSubmit }) => {
  // Set Modal's app element when component mounts
  if (typeof window !== 'undefined') {
    Modal.setAppElement(document.body);
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: new Date(),
    comments: '',
    product: serviceName || '',
    delivery: 'Standard',
    address: '',
    city: '',
    code: '',
    status: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-content w-[95%] max-w-5xl mx-auto my-[50px] bg-white rounded-xl shadow-2xl"
      overlayClassName="modal-overlay fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex justify-center items-center"
      closeTimeoutMS={300}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative max-h-[calc(100vh-100px)] overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-gray-100"
      >
          <div className="z-10 bg-white pb-4 border-b border-gray-200 ">
          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              {serviceName} Booking
            </h2>
            <button 
              onClick={onClose}
              className="sticky top-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FiX size={32} className="text-gray-600" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Full Name</label>
                <div className="flex items-center border-2 border-gray-300 rounded-lg hover:border-yellow-500 transition-colors">
                  <FiUser className="ml-4 text-gray-500" size={24} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    minLength={2}
                    maxLength={50}
                    className="w-full p-4 pl-4 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Email Address</label>
                <div className="flex items-center border-2 border-gray-300 rounded-lg hover:border-yellow-500 transition-colors">
                  <FiMail className="ml-4 text-gray-500" size={24} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="w-full p-4 pl-4 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="flex items-center border-2 border-gray-300 rounded-lg hover:border-yellow-500 transition-colors">
                  <FiPhone className="ml-4 text-gray-500" size={24} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (234) 567-8900"
                    required
                    pattern="^\+?[\d\s-]+"
                    className="w-full p-4 pl-4 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Complete Address</label>
                <div className="flex items-center border-2 border-gray-300 rounded-lg hover:border-yellow-500 transition-colors">
                  <FaRegAddressCard className="ml-4 text-gray-500" size={24} />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main Street, City, Country"
                    required
                    minLength={5}
                    className="w-full p-4 pl-4 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">City</label>
                <div className="flex items-center border-2 border-gray-300 rounded-lg hover:border-yellow-500 transition-colors">
                  <FaTreeCity className="ml-4 text-gray-500" size={24} />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city name"
                    required
                    className="w-full p-4 pl-4 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Postal Code</label>
                <div className="flex items-center border-2 border-gray-300 rounded-lg hover:border-yellow-500 transition-colors">
                  <FaRegFileZipper className="ml-4 text-gray-500" size={24} />
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="Enter postal code"
                    required
                    pattern="^[A-Z0-9]{3,10}$"
                    className="w-full p-4 pl-4 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Booking Date</label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg hover:border-yellow-500 transition-colors">
                <FiCalendar className="ml-4 text-gray-500" size={24} />
                <DatePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  dateFormat="MMMM d, yyyy"
                  className="w-full p-4 pl-4 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Delivery Type</label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg hover:border-yellow-500 transition-colors">
                <CiDeliveryTruck className="ml-4 text-gray-500" size={24} />
                <select
                  name="delivery"
                  value={formData.delivery}
                  onChange={handleChange}
                  required
                  className="w-full p-4 pl-4 focus:outline-none bg-transparent"
                >
                  <option value="Standard">Standard Delivery</option>
                  <option value="Express">Express Delivery</option>
                  <option value="Premium">Premium Delivery</option>
                </select>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="mt-8">
            <label className="block text-lg font-medium text-gray-700 mb-2">Additional Comments</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Any special requests or notes?"
              maxLength={500}
              rows={4}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-4 px-8 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-lg font-bold rounded-lg shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition duration-300 mt-8"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Confirm Booking
          </motion.button>
        </form>
      </motion.div>
    </Modal>
  );
};

export default BookingModal;
