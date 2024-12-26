'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function AddRentalPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('location', location);
      formData.append('rating', rating);
      if (image) {
        // Append image with 'photo' field name to match backend
        formData.append('photo', image, image.name);
      }

      const { data } = await axios.post('/api/rental', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      });

      if (data.success) {
        toast.success(data.message);
        router.push('/dashboard');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error creating rental:', error);
      toast.error(error.response?.data?.message || 'Failed to create rental');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setImage(file);
    }
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
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          onChange={handleImageChange}
          accept="image/*"
          required
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Rating"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="0"
          max="5"
          step="0.1"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? 'Adding Rental...' : 'Add Rental'}
        </button>
      </form>
    </div>
  );
}
