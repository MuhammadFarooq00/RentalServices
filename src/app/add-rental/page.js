'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddRentalPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle adding rental (e.g., upload image and save data)
    console.log({ title, price, description, image, location, rating });
    router.push('/dashboard');
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Add New Rental</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rating"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Add Rental
        </button>
      </form>
    </div>
  );
}
