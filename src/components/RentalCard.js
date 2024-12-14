'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const RentalCard = ({ rental }) => {
  const { title, description, price, image, id, location, rating } = rental;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Image */}
      <Image
        src={image}
        alt={title || 'Rental image'}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description || 'No description available.'}</p>

        {/* Location and Rating */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
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
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">${price}/night</span>
          <Link
  href={`/rentals/${id}`}
  className="bg-gradient-to-r from-pink-300 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-pink-500 hover:to-purple-700 transition duration-300 ease-in-out"
>
  Check More Details!
</Link>

        </div>
      </div>
    </div>
  );
};

export default RentalCard;
