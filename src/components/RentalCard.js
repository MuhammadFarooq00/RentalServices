'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const RentalCard = ({ rental }) => {
  const { title, description, price, image, _id, location, rating } = rental;

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-lg">
      {/* Image */}
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={title || 'Rental image'} 
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="mb-2 text-xl font-bold truncate">{title}</h3>
        <p className="mb-4 text-gray-600 line-clamp-2">
          {description || 'No description available.'}
        </p>

        {/* Location and Rating */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <span className="flex items-center">
            <FaMapMarkerAlt className="mr-1 text-blue-500" />
            {location || 'Unknown'}
          </span>
          <span className="flex items-center">
            <FaStar className="mr-1 text-yellow-500" />
            {rating || 'N/A'}
          </span>
        </div>

        {/* Price and Details Button */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">${price}/night</span>
          <Link
            href={`/rentals/${_id}`}
            className="px-4 py-2 text-white transition duration-300 ease-in-out rounded-lg bg-gradient-to-r from-pink-300 to-purple-500 hover:from-pink-500 hover:to-purple-700"
          >
            Check More Details!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RentalCard;
