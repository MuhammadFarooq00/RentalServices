"use client"

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FiUser, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { FaRegAddressCard } from "react-icons/fa";
import { FaTreeCity } from "react-icons/fa6";
import { FaRegFileZipper } from "react-icons/fa6";
import { CiDeliveryTruck } from "react-icons/ci";







const BookingPage = () => {
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

  const [selectedService, setSelectedService] = useState('');

  // Available services
  const services = [
    'Trackless Trains', 'Carnival Rides', 'Bounce Houses',
    'Rock Climbing Walls', 'Sports Games', 'Carnival Games',
    'Interactive Games', 'Water Games'
  ];

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle service selection
  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
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
    const bookingData = {
      ...formData,
      serviceName: selectedService
    };
    console.log('Booking Data:', bookingData);
    // Here you can send `bookingData` to your backend
  };

  return (
    <div className="container p-8 mx-auto mt-10 text-black bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="mb-6 text-3xl font-semibold text-gray-800">Service Booking</h2>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
          {/* Service Selection */}
          <div className="mb-4">
            <label className="block text-lg text-gray-700">Select Service</label>
            <select
              name="service"
              value={selectedService}
              onChange={handleServiceChange}
              className="w-full p-4 text-gray-600 border border-gray-300 rounded-lg"
              required
            >
              <option value="" disabled>Select a service</option>
              {services.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>

          {/* Customer Name */}
          <div className="mb-4">
            <label className="block text-lg text-gray-700">Your Name</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <FiUser className="mr-3 text-gray-500" size={24} />
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
              <FiMail className="mr-3 text-gray-500" size={24} />
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
              <FiPhone className="mr-3 text-gray-500" size={24} />
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="w-full p-4 text-gray-600"
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
          {/* Address */}
          <div className="mb-4">
            <label className="block text-lg text-gray-700">Address</label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <FaRegAddressCard className="mr-3 text-gray-500" size={24} />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                required
                className="w-full p-4 text-gray-600"
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


          {/* Comments */}
          <div className="mb-4">
            <label className="block text-lg text-gray-700">Additional Comments (optional)</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Any special requests or comments?"
              rows={4}
              className="w-full p-4 text-gray-600 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-4 font-semibold text-white transition duration-300 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Submit Booking
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default BookingPage;
