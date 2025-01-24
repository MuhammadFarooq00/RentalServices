'use client';

import { useState, useEffect,use } from 'react';
import RentalCard from '@/components/RentalCard';
import { FiSearch, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import axios from 'axios';

  // Loading Component
  const Loading = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium text-gray-600">Loading details...</p>
    </div>
);

// Not Found Component
const NotFound = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="py-12 text-center"
  >
    <h2 className="text-2xl font-semibold text-gray-600">No Rentals Found</h2>
    <p className="mt-4 text-gray-500">
      We couldn't find any rentals matching your search criteria. Please try adjusting your filters.
    </p>
  </motion.div>
);

export default function RentalsPage({ params }) {
  // State Management
  const unwrappedParams = use(params);
  const [rentals, setRentals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = unwrappedParams;
  // Fetch rentals data
  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/rental/${userId}`);
        if (response.data.success) {
          setRentals(response.data.rentals);
        } else {
          setError('Failed to fetch rentals');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching rentals:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRentals();
  }, []);

  // Pagination Variables
  const itemsPerPage = 12;
  const filteredRentals = rentals.filter((rental) => {
    const matchesSearch = rental.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      !priceRange ||
      (priceRange === '50-100' && rental.price >= 50 && rental.price <= 100) ||
      (priceRange === '100-200' && rental.price > 100 && rental.price <= 200) ||
      (priceRange === '200-300' && rental.price > 200 && rental.price <= 300);
    return matchesSearch && matchesPrice;
  });

  const totalPages = Math.ceil(filteredRentals.length / itemsPerPage);
  const displayedRentals = filteredRentals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePriceFilter = (e) => {
    setPriceRange(e.target.value);
    setCurrentPage(1); // Reset to first page on new filter
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => prev + direction);
  };

  if (error) {
    return (
      <div className="py-12 text-center text-red-600">
        <h2 className="text-2xl font-semibold">Error</h2>
        <p className="mt-4">{error}</p>
      </div>
    );
  }

  return (
    <section className="py-12 mt-5 text-black bg-white">
      <div className="container mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-900 font-heading">Available Rentals</h1>

        {/* Search and Filter Section */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <div className="relative flex items-center w-full sm:w-1/2">
            <FiSearch className="absolute text-gray-400 left-3" size={20} />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              value={priceRange}
              onChange={handlePriceFilter}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Prices</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-200">$100 - $200</option>
              <option value="200-300">$200 - $300</option>
            </select>
          </div>
        </div>

        {/* Show Loading */}
        {isLoading && <Loading />}

        {/* Rental Cards */}
        {!isLoading && displayedRentals.length === 0 && <NotFound />}

        <div className="grid grid-cols-1 gap-6 px-5 my-10 sm:grid-cols-2 lg:grid-cols-3">
          {displayedRentals.map((rental) => (
            <motion.div
              key={rental._id}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <RentalCard rental={rental} userId={userId} />
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => handlePageChange(-1)}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 bg-gray-100 border rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            <FiArrowLeft />
            Previous
          </button>
          <span className="text-lg font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === totalPages}
            className="flex items-center px-4 py-2 bg-gray-100 border rounded-lg hover:bg-gray-200 disabled:opacity-50"
          >
            Next <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
