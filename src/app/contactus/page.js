'use client'

import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaRegComment } from 'react-icons/fa'; // Importing icons for fields

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    address: '',
  });

  // Handle form data changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log(formData); // Log the form data to the console
  };

  return (
    <section className="px-6 py-16 mt-5 text-center bg-gray-50 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-8 text-4xl font-extrabold text-gray-800">
          Contact Us
        </h2>
        <p className="max-w-3xl mx-auto mb-12 text-xl text-gray-700">
          Have questions or need assistance? Our team is here to help! Fill out the form below, and we'll get back to you as soon as possible.
        </p>

        {/* Contact Form */}
        <form
          className="grid max-w-4xl grid-cols-1 gap-6 p-8 mx-auto bg-white rounded-lg shadow-lg sm:grid-cols-2"
          onSubmit={handleSubmit}
        >
          {/* Full Name */}
          <div className="flex items-center space-x-4">
            <FaUser className="text-gray-500" />
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-4 transition duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-gray-500" />
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-4 transition duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex items-center col-span-2 space-x-4">
            <FaPhone className="text-gray-500" />
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-4 transition duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Message */}
          <div className="flex items-center col-span-2 space-x-4">
            <FaRegComment className="text-gray-500" />
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-4 transition duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows="6"
              required
            />
          </div>

          {/* Address */}
          <div className="flex items-center col-span-2 space-x-4">
            <FaMapMarkerAlt className="text-gray-500" />
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your Address"
              className="w-full p-4 transition duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center col-span-2 mt-6">
            <button
              type="submit"
              className="px-10 py-4 text-lg font-semibold w-full text-white transition duration-300 transform bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
