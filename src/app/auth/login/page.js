'use client';

import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { signIn } from "next-auth/react"
import { login } from '@/app/lib/actions/buttons';
import axios from 'axios';
import { useContext } from 'react';
import { useAuth } from '@/app/context/AuthContext';
export default function LoginPage() {
  const router = useRouter();
  const { session, user , setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // const handleGoogleLogin = () => {
  //  signIn('google');
  // };

  async function handleSubmit(e) {
  e.preventDefault();
  const { email, password } = formData;
  try {
    const response = await axios.post("/api/auth/login", { email, password }); 
    console.log("Login successful:", response.data);
    if(response.status === 200){
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      router.push("/");
    }
    return response.data; 
  } catch (error) {
    console.error("Error during login:", error);
    const errorMessage = error.response?.data?.error || "Internal server error.";
    return { error: errorMessage }; 
  }
}
  

  const handleSignupRedirect = () => {
    router.push('/auth/signup');
  };

  return (
    <section className="py-12 -mb-10 bg-blue-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side Form */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
          <form onSubmit={handleSubmit}>
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
              />
            </div>

            {/* Google Login Button */}
            {/* <div className="mb-4">
              <button
                type="button"
                onClick={()=>login()}
                className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700 transition"
              >
                <FaGoogle className="mr-2 text-white" size={20} />
                Login with Google
              </button>
            </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          {/* Signup Redirect */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <button
                onClick={handleSignupRedirect}
                className="text-blue-600 hover:text-blue-800 transition"
              >
                Signup
              </button>
            </p>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="hidden md:block md:w-1/2 h-full">
          <img
           src="/login.png"
           alt="Decorative login"
           width={100}
           hight={100}
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </section>
  );
}
