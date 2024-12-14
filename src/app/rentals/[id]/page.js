'use client';

import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { use, useState } from 'react';
import BookingModal from '@/components/BookingModal';
export default function RentalDetails({ params }) {
  const { id } = use(params);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBooking = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleBookingSubmit = (data) => {
    console.log('Booking Data:', data);
    // Send `data` to the backend using fetch or axios
  };

  // Sample data for the rental
  const rental = {
    id,
    title: `Property ${id}`,
    description: `This is a spacious property located in the heart of the city with all amenities included. It's perfect for families, couples, or solo travelers looking for a cozy and luxurious stay.`,
    price: 150,
    image: `https://picsum.photos/800/600?random=${2}`,
    rating: 4.5,
    location: 'New York, NY',
    amenities: [
      'Free WiFi',
      'Air Conditioning',
      'Fully Equipped Kitchen',
      'Private Balcony',
      'Smart TV with Netflix',
      '24/7 Security',
      'Swimming Pool Access',
      'Fitness Center',
      'Free Parking',
      'Pet Friendly',
    ],
    reviews: [
      {
        reviewer: 'John Doe',
        rating: 5,
        comment: 'Amazing place! Clean and well-maintained. The location was perfect.',
      },
      {
        reviewer: 'Jane Smith',
        rating: 4,
        comment: 'Great stay, but the WiFi could be faster.',
      },
      {
        reviewer: 'Emily Johnson',
        rating: 5,
        comment: 'Absolutely loved the amenities and the comfort provided!',
      },
    ],
    host: {
      name: 'Alice Green',
      contact: 'alice.green@example.com',
      phone: '+1 234-567-8901',
      profileImage: `https://picsum.photos/100/100?random=${5}`,
    },
    availability: 'Available for booking',
    nearbyAttractions: [
      'Central Park - 1.2 miles',
      'Times Square - 0.8 miles',
      'Empire State Building - 1.5 miles',
      'Museum of Modern Art - 0.9 miles',
    ],
  };


  // const router = useRouter();

  // Function to handle booking action
  // const handleBooking = () => {
  //   // Redirect to the booking page or show a booking modal
  //   alert(`Booking for ${rental.title} has been confirmed!`);
  // };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-gray-800">
          {rental.title}
        </h1>

        {/* Image and Info Section */}
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="flex-1">
            <img
              src={rental.image}
              alt={rental.title}
              className="object-cover w-full rounded-lg shadow-md h-96"
            />
          </div>

          <div className="flex-1">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-2xl font-semibold">Details</h2>
              <p className="mb-4 text-gray-600">{rental.description}</p>

              <div className="flex items-center mb-4">
                <FiCheckCircle className="mr-2 text-green-500" size={20} />
                <span className="text-lg font-semibold">{rental.availability}</span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold text-gray-800">
                  Price: ${rental.price}/night
                </span>
                <div className="flex items-center text-yellow-500">
                  <span className="mr-1 text-lg font-semibold">{rental.rating}</span>
                  <FiCheckCircle />
                </div>
              </div>

              <div className="flex items-center mb-4">
                <span className="text-lg font-medium text-gray-600">Location: </span>
                <span className="text-lg font-semibold text-gray-800">{rental.location}</span>
              </div>

              <div className="mb-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Amenities:</h3>
                <ul className="text-gray-600 list-disc list-inside">
                  {rental.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Reviews:</h3>
                <ul className="space-y-4">
                  {rental.reviews.map((review, index) => (
                    <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                      <p className="font-semibold text-gray-800">{review.reviewer}</p>
                      <p className="font-medium text-yellow-500">Rating: {review.rating}/5</p>
                      <p className="text-gray-600">{review.comment}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Host Information:</h3>
                <div className="flex items-center">
                  <img
                    src={rental.host.profileImage}
                    alt={rental.host.name}
                    className="w-12 h-12 mr-4 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{rental.host.name}</p>
                    <p className="text-gray-600">{rental.host.contact}</p>
                    <p className="text-gray-600">{rental.host.phone}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">Nearby Attractions:</h3>
                <ul className="text-gray-600 list-disc list-inside">
                  {rental.nearbyAttractions.map((attraction, index) => (
                    <li key={index}>{attraction}</li>
                  ))}
                </ul>
              </div>

              <motion.button
                onClick={handleBooking}
                className="w-full py-3 font-semibold text-white transition duration-300 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Book Now
              </motion.button>
              <div className="p-6">
                <BookingModal
                  isOpen={isModalOpen}
                  onClose={handleModalClose}
                  onSubmit={handleBookingSubmit}
                  serviceName="Trackless Train"
                />
              </div>
            </div>
          </div>

        </motion.div>

        {/* Booking Details or Call to Action Section */}
        <div className="mt-12 text-center">
          <h2 className="mb-4 text-3xl font-semibold text-gray-800">Why Choose This Property?</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div
              className="p-6 bg-white rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h3 className="mb-2 text-xl font-semibold">Spacious Rooms</h3>
              <p className="text-gray-600">
                Enjoy large rooms with modern amenities, perfect for relaxation.
              </p>
            </motion.div>

            <motion.div
              className="p-6 bg-white rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <h3 className="mb-2 text-xl font-semibold">Prime Location</h3>
              <p className="text-gray-600">
                Located in a vibrant neighborhood close to shopping, dining, and entertainment.
              </p>
            </motion.div>

            <motion.div
              className="p-6 bg-white rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <h3 className="mb-2 text-xl font-semibold">Luxury Amenities</h3>
              <p className="text-gray-600">
                Fully equipped with luxury amenities to make your stay memorable.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
