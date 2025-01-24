'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '@/app/context/AuthContext';

export default function SignupPage() {
  const {user:UserData, setUser} = useAuth()
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGoogleSignup = async () => {
    // try {
    //   const result = await signIn('google', {
    //     callbackUrl: '/',
    //     redirect: true
    //   });
    //   console.log('Google sign up result:', result);
    // } catch (error) {
    //   toast.error('Google sign up failed. Please try again.');
    // }
  };

  const handleSubmit = async () => {
    setLoading(true);
  
    try {
     
      const res = await axios.post('/api/auth/signup', formData, {
        headers: {
          'Content-Type': 'application/json', 
        },
      });
  
      
      const data = res.data;
  
      if (!res.status === 200) {
        throw new Error(data.message || 'Failed to create account');
      }
      
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success('Account created successfully!');
      router.push('/auth/login'); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };
  

  const handleLoginRedirect = () => {
    router.push('/auth/login');
  };

  return (
    <section className="py-12 -mb-10 bg-blue-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side Image */}
        <div className="hidden md:block md:w-1/2 h-full">
          <img
            src="/login.png"
            alt="Decorative Signup"
            width={100}
            hight={100}
            className="object-cover min-h-full w-full"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Signup</h1>
          <form onSubmit={(e)=>{
            e.preventDefault();
            handleSubmit()}}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                minLength={2}
                maxLength={50}
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                minLength={8}
                maxLength={50}
              />
            </div>

            {/* Google Signup Button */}
            <div className="mb-4">
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700 transition"
              >
                <FaGoogle className="mr-2 text-white" size={20} />
                Sign up with Google
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating Account...' : 'Signup'}
            </button>
          </form>

          {/* Login Redirect */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={handleLoginRedirect}
                className="text-blue-600 hover:text-blue-800 transition"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
