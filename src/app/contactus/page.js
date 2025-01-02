'use client'

import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaRegComment } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    address: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('/api/contactus', formData);
      
      if (response.data.success) {
        toast.success('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          address: ''
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-6 py-16 mt-5 text-center bg-gradient-to-b from-gray-50 to-gray-100 lg:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="mb-8 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700">
            Get in Touch
          </h2>
          <p className="max-w-3xl mx-auto mb-12 text-xl leading-relaxed text-gray-700">
            Have questions or need assistance? Our dedicated team is here to help! Fill out the form below, and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="grid max-w-4xl grid-cols-1 gap-6 p-8 mx-auto bg-white rounded-xl shadow-2xl sm:grid-cols-2 backdrop-blur-sm bg-white/90"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center space-x-4 group">
            <FaUser className="text-gray-500 group-focus-within:text-yellow-500 transition-colors" />
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-4 transition duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              required
            />
          </div>

          <div className="flex items-center space-x-4 group">
            <FaEnvelope className="text-gray-500 group-focus-within:text-yellow-500 transition-colors" />
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-4 transition duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              required
            />
          </div>

          <div className="flex items-center col-span-2 space-x-4 group">
            <FaPhone className="text-gray-500 group-focus-within:text-yellow-500 transition-colors" />
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-4 transition duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              required
            />
          </div>

          <div className="flex items-start col-span-2 space-x-4 group">
            <FaRegComment className="mt-4 text-gray-500 group-focus-within:text-yellow-500 transition-colors" />
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-4 transition duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              rows="6"
              required
            />
          </div>

          <div className="flex items-center col-span-2 space-x-4 group">
            <FaMapMarkerAlt className="text-gray-500 group-focus-within:text-yellow-500 transition-colors" />
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your Address"
              className="w-full p-4 transition duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              required
            />
          </div>

          <motion.div 
            className="flex justify-center col-span-2 mt-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-10 py-4 text-lg font-semibold w-full text-white transition duration-300 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </motion.div>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default ContactForm;
