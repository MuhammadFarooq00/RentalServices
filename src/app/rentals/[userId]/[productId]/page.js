'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiMapPin, FiStar, FiDollarSign, FiHome, FiCalendar } from 'react-icons/fi';
import { useState, useEffect, use } from 'react';
import BookingModal from '@/components/BookingModal';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Loading = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-lg font-medium text-gray-600">Loading details...</p>
  </div>
);

export default function RentalDetails({ params }) {
  const unwrappedParams = use(params);
  const { userId,productId } = unwrappedParams;
  const [rental, setRental] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRental = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/rental/${userId}/${productId}`);
        if (response.data.success) {
          setRental({
            ...response.data.rental,
            availability: "Available Now",
            amenities: [
              { icon: "🌐", name: "High-Speed WiFi" },
              { icon: "🚗", name: "Free Parking" },
              { icon: "🏊‍♂️", name: "Swimming Pool" },
              { icon: "❄️", name: "Air Conditioning" },
              { icon: "🔒", name: "24/7 Security" },
              { icon: "🏋️‍♂️", name: "Fitness Center" }
            ],
            reviews: [
              {
                reviewer: "John Doe",
                rating: 4.5,
                comment: "Exceptional stay! The property exceeded our expectations in every way.",
                date: "2024-01-15",
                avatar: "/avatars/user1.jpg"
              },
              {
                reviewer: "Jane Smith",
                rating: 5,
                comment: "Perfect location with stunning views. Highly recommended!",
                date: "2024-01-10",
                avatar: "/avatars/user2.jpg"
              }
            ],
            host: {
              name: "Sarah Wilson",
              contact: "host@example.com",
              phone: "+1234567890",
              profileImage: "/host-profile.jpg",
              responseRate: "98%",
              joinedDate: "2022",
              languages: ["English", "Spanish"],
              superhost: true
            },
            propertyHighlights: [
              "Beachfront Location",
              "Recently Renovated",
              "Panoramic Ocean Views",
              "Private Balcony"
            ]
          });
        } else {
          setError('Failed to fetch rental details');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching rental:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRental();
  }, [productId,userId]);

  const handleBooking = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleBookingSubmit = async (bookingData) => {
    try {
      const response = await axios.post('/api/booking', {
        rentalId: productId,
        ...bookingData
      });
      
      if (response.data.success) {
        toast.success('Booking confirmed successfully!');
        handleModalClose();
      } else {
        toast.error(response.data.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Failed to process booking');
    }
  };

  if (isLoading) return <Loading />;
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <div className="p-8 text-center bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-600">Error</h2>
        <p className="mt-4 text-gray-600">{error}</p>
      </div>
    </div>
  );
  if (!rental) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 text-center bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-600">Rental Not Found</h2>
        <p className="mt-4 text-gray-500">The requested rental property could not be found.</p>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Hero Section with Single Image */}
        <div className="relative h-[70vh] w-full overflow-hidden group">
          <div className="absolute inset-0 bg-black/30 z-10 transition-all duration-300 group-hover:bg-black/20" />
          <motion.img
            src={rental.image}
            alt={rental.title}
            className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-4xl"
              >
                <motion.div 
                  className="flex items-center gap-3 mb-6"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FiHome className="text-yellow-400 text-xl animate-pulse" />
                  <span className="text-yellow-400 uppercase tracking-wider font-semibold hover:text-yellow-300 transition-colors">Premium Property</span>
                </motion.div>
                <motion.h1 
                  className="mb-6 text-6xl font-bold text-white leading-tight hover:text-yellow-50 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {rental.title}
                </motion.h1>
                <motion.div 
                  className="flex flex-wrap items-center gap-8 text-white text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <motion.div 
                    className="flex items-center gap-2 hover:text-yellow-400 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <FiMapPin className="text-xl" />
                    <span>{rental.location}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2 hover:text-yellow-400 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <FiStar className="text-xl text-yellow-400" />
                    <span>{rental.rating}/5 Rating</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2 hover:text-yellow-400 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <FiDollarSign className="text-xl" />
                    <span>${rental.price}/night</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="container px-4 py-12 mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Property Highlights */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 bg-white rounded-xl shadow-lg"
              >
                <h2 className="mb-6 text-2xl font-bold text-gray-800">Property Highlights</h2>
                <div className="grid grid-cols-2 gap-4">
                  {rental.propertyHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FiCheckCircle className="text-green-500" />
                      <span className="font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Description */}
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">About this space</h2>
                <p className="text-lg leading-relaxed text-gray-600">{rental.description}</p>
              </div>

              {/* Amenities */}
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <h2 className="mb-6 text-2xl font-bold text-gray-800">Amenities</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {rental.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <span className="text-xl">{amenity.icon}</span>
                      <span className="font-medium">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <h2 className="mb-6 text-2xl font-bold text-gray-800">Guest Reviews</h2>
                <div className="space-y-6">
                  {rental.reviews.map((review, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <img
                          src={"https://i.pravatar.cc/150?img=1"}
                          alt={review.reviewer}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h4 className="font-semibold">{review.reviewer}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="ml-auto text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="md:col-span-1">
              <div className="sticky top-20 p-6 bg-white rounded-xl shadow-lg">
                <div className="p-4 mb-6 text-center bg-yellow-50 rounded-lg">
                  <div className="text-3xl font-bold text-gray-800">
                    ${rental.price}
                    <span className="text-lg text-gray-500">/night</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">Includes all fees</div>
                </div>

                <motion.button
                  onClick={handleBooking}
                  className="w-full py-4 mb-6 font-semibold text-white transition-all rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Now
                </motion.button>

                {/* Host Information */}
                <div className="p-4 mt-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={"https://i.pravatar.cc/150?img=1"}
                      alt={rental.host.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">{rental.host.name}</h4>
                      {rental.host.superhost && (
                        <span className="px-2 py-1 text-xs font-medium text-yellow-600 bg-yellow-100 rounded-full">
                          Superhost
                        </span>
                      )}
                    </div>
                  </div>
                    <div className="space-y-2 text-sm text-gray-600 ">
                    <p>Response rate: {rental.host.responseRate}</p>
                    <p>Languages: {rental.host.languages.join(', ')}</p>
                    <p>Member since: {rental.host.joinedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BookingModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleBookingSubmit}
          serviceName={rental.title}
        />
      </section>
    </AnimatePresence>
  );
}
