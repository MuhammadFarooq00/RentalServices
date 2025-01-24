'use client';

import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FaBox, FaDollarSign, FaMapMarkerAlt, FaStar, FaFileAlt, FaImage } from 'react-icons/fa';
import Loader from '@/components/Loader';
import { useAuth } from '@/app/context/AuthContext';

export default function AddRentalPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(false);
  const [UserData, SetUserData] = useState();
  const router = useRouter();
  console.log("user data is : ", UserData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('userId', UserData?.user?.id)
      formData.append('title', title);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('location', location);
      formData.append('rating', rating);
      if (image) {
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
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setImage(file);
    }
  };

  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('user'));
    if(userData){
      SetUserData(userData);
    }
  },[])

  return (
    <div className="2xl:container mx-auto lg:p-6 py-6 px-3">
      <div className="relative mb-0 px-6 py-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
              <FaBox className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-200 via-blue-300 to-blue-500 bg-clip-text text-transparent">
                Add New Rental
              </h1>
              <p className="text-gray-400 text-sm md:text-base mt-1">Create a new rental listing</p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-96">
              <Loader />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-300 flex items-center gap-2">
                    <FaBox className="text-blue-400" />
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter rental title"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-gray-200 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 flex items-center gap-2">
                    <FaDollarSign className="text-green-400" />
                    Price
                  </label>
                  <input
                    type="number"
                    placeholder="Enter price"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-gray-200 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-gray-300 flex items-center gap-2">
                    <FaFileAlt className="text-yellow-400" />
                    Description
                  </label>
                  <textarea
                    placeholder="Enter rental description"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-gray-200 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 min-h-[120px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-400" />
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-gray-200 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 flex items-center gap-2">
                    <FaStar className="text-yellow-400" />
                    Rating
                  </label>
                  <input
                    type="number"
                    placeholder="Enter rating (0-5)"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-gray-200 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="0"
                    max="5"
                    step="0.1"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-gray-300 flex items-center gap-2">
                    <FaImage className="text-purple-400" />
                    Image
                  </label>
                  <input
                    type="file"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-400 hover:file:bg-blue-500/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    onChange={handleImageChange}
                    accept="image/*"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-white/10">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-blue-500/20 transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  disabled={loading}
                >
                  {loading ? 'Adding Rental...' : 'Add Rental'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
