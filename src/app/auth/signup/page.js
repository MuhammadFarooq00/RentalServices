'use client'; // Mark this as a client component

import { useRouter } from 'next/navigation'; // Import router from next/navigation
import { FaGoogle } from 'react-icons/fa'; // Google icon from react-icons

export default function SignupPage() {
  const router = useRouter(); // Initialize the Next.js router

  // Function to handle redirect to login page
  const handleLoginRedirect = () => {
    router.push('/auth/login'); // Redirect to the login page
  };

  return (
    <section className="py-12 -mb-10 bg-blue-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side Image */}
        <div className="hidden md:block md:w-1/2 h-full">
          <img
            src="https://picsum.photos/600/600"
            alt="Decorative Signup"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Signup</h1>
          <form>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Google Signup Button */}
            <div className="mb-4">
              <button
                type="button"
                className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700 transition"
              >
                <FaGoogle className="mr-2 text-white" size={20} /> {/* Google Icon */}
                Sign up with Google
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
            >
              Signup
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
