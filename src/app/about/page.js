'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaRegComment, FaClock, FaStar, FaQuoteLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const AboutPage = () => {
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    address: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    if (!/^\d{10}$/.test(formData.phone.replace(/[-()\s]/g, ''))) {
      errors.phone = 'Invalid phone format';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user starts typing
    if (formErrors[id]) {
      setFormErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // toast.error('Please fix the form errors');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await axios.post('/api/contactus', formData);
      
      if (response.data.success) {
        toast.success('Message sent successfully! We will contact you soon.');
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
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enhanced carousel items with more details
  const carouselItems = [
    {
      id: 1,
      title: "Luxury Apartment",
      description: "Experience the comfort of luxury living in the heart of the city. Featuring modern amenities and stunning views.",
      image: "https://picsum.photos/600/300?random=1",
      price: "$2,500/month",
      features: ["24/7 Security", "Pool Access", "Parking"]
    },
    {
      id: 2,
      title: "Cozy Cottage",
      description: "Perfect for weekend getaways with family and friends. Surrounded by nature and tranquility.",
      image: "https://picsum.photos/600/300?random=2",
      price: "$200/night",
      features: ["Fireplace", "Garden", "Pet Friendly"]
    },
    {
      id: 3,
      title: "Beachside Villa",
      description: "Relax and unwind by the beach in our beautiful seaside villa. Experience breathtaking ocean views.",
      image: "https://picsum.photos/600/300?random=3",
      price: "$5,000/week",
      features: ["Private Beach", "Ocean View", "Chef's Kitchen"]
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length
    );
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 5000); // Increased time to 5 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      location: "New York, NY",
      rating: 5,
      text: "The modern apartment I rented exceeded all expectations. The attention to detail and customer service was outstanding.",
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 2,
      name: "Jane Smith",
      location: "Nashville, TN",
      rating: 5,
      text: "I had the most amazing experience at the cozy cottage. The perfect blend of comfort and luxury.",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 3,
      name: "Emily Johnson",
      location: "Miami, FL",
      rating: 5,
      text: "The beachside villa was absolutely stunning. Every moment spent there was magical.",
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    }
  ];

  return (
    <div className="pb-12 bg-gray-50">
      <Toaster position="top-center" />

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-[70vh] "
      >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
            alt="Luxury Home"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Find Your Perfect Rental
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl mb-8"
            >
              Luxury Rentals Tailored to Your Lifestyle
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link 
                href="/rentals"
                className="bg-yellow-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-600 transition-all transform hover:scale-105"
              >
                Explore Properties
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* About Text Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" bg-gradient-to-r   from-gray-400 via-gray-300 to-yellow-100 py-28 text-center px-6 lg:px-12 shadow-xl"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8">
            Welcome to Our Premium Rental Services
          </h2>
          <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
          MyRentalGo is an all-in-one booking software designed to streamline your rental business. Effortlessly manage reservations, track availability, and provide a seamless experience for your customers. Say goodbye to double bookings and missed opportunities—get started with MyRentalGo today!
          </p>
          <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
          MyRentalGo is tailored for rental businesses seeking to optimize their operations. Whether you rent party equipment, trackless trains, inflatables, or event supplies, MyRentalGo simplifies booking management, customer communication, and payment processing. Our intuitive platform is mobile-friendly, secure, and customizable to fit your unique needs. Increase your efficiency, minimize errors, and focus on what matters most—growing your business!
          </p>
        </div>
      </motion.section>

      {/* Enhanced Carousel Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <div className="relative">
          <div className="absolute top-0 left-0 z-10 flex items-center justify-between w-full h-full px-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="text-white bg-gray-800 bg-opacity-50 p-4 rounded-full hover:bg-opacity-70 transition-all"
            >
              &#10094;
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="text-white bg-gray-800 bg-opacity-50 p-4 rounded-full hover:bg-opacity-70 transition-all"
            >
              &#10095;
            </motion.button>
          </div>

          <div className="overflow-hidden relative  shadow-2xl">
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {carouselItems.map((item) => (
                <div key={item.id} className="w-full rounded-3xl flex-shrink-0 relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1200}
                    height={600}
                    className="w-full h-[750px] object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-40 p-4 rounded-lg">
                    <h2 className="text-5xl font-bold text-white mb-4">{item.title}</h2>
                    <p className="text-white text-xl mb-4">{item.description}</p>
                    <p className="text-yellow-400 text-2xl font-bold mb-6">{item.price}</p>
                    <div className="flex gap-4 mb-8">
                      {item.features.map((feature, index) => (
                        <span key={index} className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-white">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        href="/rentals" 
                        className="inline-block mt-6 z-30 px-8 py-4 cursor-pointer text-white bg-yellow-500 rounded-full hover:bg-yellow-600 transition-all transform hover:scale-105 font-semibold text-lg"
                      >
                        View Details
                      </Link>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Controls */}
          <div className="flex justify-center mt-4 gap-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? 'bg-yellow-500 w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Enhanced Features Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="py-16 px-6 bg-white"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Why Choose Our Rentals?
          </h2>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            Experience the perfect blend of luxury, comfort, and convenience with our premium rental properties.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🏠",
                title: "Premium Locations",
                description: "Carefully selected properties in prime locations for your convenience"
              },
              {
                icon: "🛋️",
                title: "Fully Furnished",
                description: "Modern, comfortable furnishings and premium amenities included"
              },
              {
                icon: "🔒",
                title: "Secure Booking",
                description: "Safe and transparent booking process with instant confirmation"
              },
              {
                icon: "🧹",
                title: "Professional Cleaning",
                description: "Regular professional cleaning and maintenance services"
              },
              {
                icon: "📱",
                title: "24/7 Support",
                description: "Round-the-clock customer support for your peace of mind"
              },
              {
                icon: "💰",
                title: "Best Value",
                description: "Competitive pricing with no hidden fees or charges"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Enhanced Testimonials Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="py-16 bg-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            What Our Guests Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <FaQuoteLeft className="text-gray-300 text-3xl mb-4" />
                <p className="text-gray-700 leading-relaxed">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Enhanced Contact Form Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white py-16 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <FaUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-yellow-400 focus:border-transparent`}
                    placeholder="John Doe"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-yellow-400 focus:border-transparent`}
                    placeholder="john@example.com"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <FaPhone className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-yellow-400 focus:border-transparent`}
                    placeholder="(123) 456-7890"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-gray-700 mb-2">Address</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Your Address"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
              <div className="relative">
                <FaRegComment className="absolute top-4 left-4 text-gray-400" />
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Your message here..."
                />
              </div>
            </div>

            <motion.div 
              className="flex justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg font-semibold text-lg hover:from-yellow-600 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.section>

      {/* Enhanced Map Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="py-16 bg-gray-100"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-stretch gap-12">
            <div className="lg:w-1/3 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Visit Our Office
                </h2>
                <p className="text-gray-600 mb-8">
                  Come visit us to discuss your rental needs in person. Our team is ready to assist you in finding the perfect property.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-start mb-6">
                  <FaMapMarkerAlt className="text-yellow-500 text-2xl mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
                    <p className="text-gray-600">
                      2426 Crossmill Ln,<br />
                      Katy, TX 77450
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaClock className="text-yellow-500 text-2xl mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Business Hours</h3>
                    <div className="text-gray-600">
                      <p>Monday - Friday: 9am - 5pm</p>
                      <p>Saturday: 10am - 3pm</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3">
              <div className="h-full rounded-xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.084553660648!2d-95.76149508459206!3d29.74463908198851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640e5180e8dcbf7%3A0xa9aeb87c034c0a60!2s2426%20Crossmill%20Ln%2C%20Katy%2C%20TX%2077450%2C%20USA!5e0!3m2!1sen!2s!4v1697451217163!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
