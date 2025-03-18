'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrashAlt, FaPlus, FaEye, FaUser, FaEnvelope, FaPhone, FaComment, FaCheckCircle, FaCog, FaSearch, FaBox, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';
import { useAuth } from '@/app/context/AuthContext';

export default function DashboardPage() {
  const [rentals, setRentals] = useState([]);
  const [selectedRental, setSelectedRental] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rentalToDelete, setRentalToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditBookingModalOpen, setIsEditBookingModalOpen] = useState(false);
  const [updatedFulfillStatus, setUpdatedFulfillStatus] = useState(false);
  const [isDeleteBookingModalOpen, setIsDeleteBookingModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [updatedRental, setUpdatedRental] = useState({
    title: '',
    price: '',
    description: '',
    location: '',
    rating: '',
    image: '',
  });
  const [activeSection, setActiveSection] = useState('dashboard');
  const [contacts, setContacts] = useState([]);
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isViewContactModalOpen, setIsViewContactModalOpen] = useState(false);
  const [isEditContactModalOpen, setIsEditContactModalOpen] = useState(false);
  const [isDeleteContactModalOpen, setIsDeleteContactModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [updatedContactStatus, setUpdatedContactStatus] = useState('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [totalContacts, setTotalContacts] = useState(0);
  const router = useRouter();
  const {user:UserData} = useAuth();
  const [rerender, setRerender] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      router.push('/auth/login');
    } else {
      setIsAuthenticated(true);
    }
    setIsCheckingAuth(false);
  }, [router]);


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
   
    const fetchRentals = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/api/rental/${userData?.user?.id}`);
        console.log("data is : ", data)
        if (data.success) {
          setRentals(data?.rentals);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching rentals:', error);
        setIsLoading(false);
      }
    };
    if(userData){
      fetchRentals();
    }

    // Set up polling to check for updates every 30 seconds
    const interval = setInterval(fetchRentals, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);


    // booking management 

  useEffect(() => {
    if (activeSection === 'booking') {
      fetchBookings();
    }
  }, [activeSection]);

  const fetchBookings = async (query = '') => {
    console.log("query is : ", query)
    try {
      setIsBookingLoading(true);
      const url = query 
        ? `/api/booking?${query}`
        : '/api/booking';
      const response = await axios.get(url);
      const filteredData = response?.data?.data?.filter((val)=> val.userId === UserData?.user?.id);
      setBookings(filteredData);
      console.log("iss hasdf hh :",filteredData);
      setIsBookingLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch bookings');
      setIsBookingLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim()) {
      // Create query string based on search value
      const queryString = new URLSearchParams({
        // name: value,
        // email: value,
        // phone: value,
        product: value
      }).toString();
    
      fetchBookings(queryString);
    } else {
      fetchBookings();
    }
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setIsViewModalOpen(true);
  };

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setUpdatedFulfillStatus(booking.status);
    setIsEditBookingModalOpen(true);
  };

  const handleUpdateBooking = async () => {
    try {
      const response = await axios.patch(`/api/booking?id=${selectedBooking._id}`, {
        status: updatedFulfillStatus
      });
      
      if (response.data.success) {
        // Update local state with the updated booking data from response
        const updatedBookings = {
          ...bookings,
          data: bookings.data.map(booking =>
            booking._id === selectedBooking._id 
              ? {...booking, status: updatedFulfillStatus}
              : booking
          )
        };
        setBookings(updatedBookings);
        setIsEditBookingModalOpen(false);
        toast.success('Booking status updated successfully');
      } else {
        throw new Error('Failed to update booking');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error(error.response?.data?.message || 'Failed to update booking status');
    }
  };

  const handleDeleteBooking = async () => {
    try {
      console.log("bookingToDelete is : ", bookingToDelete)
      // console.log("bookings is : ", bookings)
      
      await axios.delete(`/api/booking?id=${bookingToDelete._id}`);
 
      setBookings(prevBookings => ({
        ...prevBookings,
        data: prevBookings.data.filter(booking => booking._id !== bookingToDelete._id)
      }));
      toast.success('Booking deleted successfully');
      setIsDeleteBookingModalOpen(false);
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error('Failed to delete booking');
    }
  };


  const handleEditClick = (rental) => {
    setSelectedRental(rental);
    setUpdatedRental({
      title: rental.title,
      price: rental.price,
      description: rental.description,
      location: rental.location,
      rating: rental.rating,
      image: rental.image,
    });
    setEditModalOpen(true);
  };

  const handleDeleteClick = (rental) => {
    setRentalToDelete(rental);
    setDeleteModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      
      // Append form fields
      Object.keys(updatedRental).forEach((key) => {
        formData.append(key, updatedRental[key]);
      });
  
      // If updating an image, ensure it's correctly appended
      if (updatedRental.photo) {
        formData.append("photo", updatedRental.photo);
      }
  
      const response = await axios.put(`/api/rental?id=${selectedRental._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.data.success) {
        setRentals(rentals.map(rental => 
          rental._id === selectedRental._id ? { ...rental, ...updatedRental } : rental
        ));
        setEditModalOpen(false);
        toast.success('Rental updated successfully');
      }
    } catch (error) {
      console.error('Error updating rental:', error);
      toast.error(error.response?.data?.message || 'Failed to update rental');
    }
  };
  

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/rental?id=${rentalToDelete._id}`);
      if (response.data.success) {
        setRentals(rentals.filter(rental => rental._id !== rentalToDelete._id));
        setDeleteModalOpen(false);
        toast.success('Rental deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting rental:', error);
      toast.error(error.response?.data?.message || 'Failed to delete rental');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedRental((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    if (isEditModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isEditModalOpen]);

   
  // contact management 

  const fetchContacts = async () => {
    try {
      setIsContactLoading(true);
      const response = await axios.get(`/api/contactus?page=${currentPage}&limit=${limit}`);
      console.log("response is : ", response)
      if (response.data.success) {
        setContacts(response.data.data);
        setTotalPages(Math.ceil(response.data.pagination.total / limit));
        setTotalContacts(response.data.pagination.total);
       
      }
      setIsContactLoading(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to fetch contacts');
      setIsContactLoading(false);
    }
  
  };

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setIsViewContactModalOpen(true);
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setUpdatedContactStatus(contact.status);
    setIsEditContactModalOpen(true);
  };

  const handleDeleteContact = (contact) => {
    setContactToDelete(contact);
    setIsDeleteContactModalOpen(true);
  };

  const handleUpdateContact = async () => {
    try {
      const response = await axios.patch(`/api/contactus?id=${selectedContact._id}`, {
        status: updatedContactStatus
      });
      
      if (response.data.success) {
        setContacts(prevContacts => 
          prevContacts.map(contact =>
            contact._id === selectedContact._id 
              ? {...contact, status: updatedContactStatus}
              : contact
          )
        );
        setIsEditContactModalOpen(false);
        toast.success('Contact status updated successfully');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      toast.error('Failed to update contact status');
    }
  };

  const handleConfirmDelete = async () => {
    setRerender(false)
    try {
      const response = await axios.delete(`/api/contactus?id=${contactToDelete._id}`);
      if (response.data.success) {
        setContacts(prevContacts => 
          prevContacts.filter(contact => contact._id !== contactToDelete._id)
        );
        setIsDeleteContactModalOpen(false);
        toast.success('Contact deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact');
    }
    finally{
      setRerender(true)
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // useEffect(() => {
  //   fetchContacts();
  // }, [currentPage,rerender]);


  if (isCheckingAuth) {
    return null; // Or a loading spinner if you prefer
  }

  if (!isAuthenticated) {
    return null; // Prevent rendering if user is not authenticated
  }

  return (
    <div className="2xl:container mx-auto lg:p-6 py-6 px-3">
      <div className="relative mb-0 px-6 py-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-2xl  shadow-2xl overflow-hidden transform transition-all duration-500">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          
        <Link href="/" className="px-2 py-2 absolute -left-4 -top-8 sm:-top-0 md:-top-0 flex items-center justify-center text-white  border-2 border-yellow-600 rounded-full shadow-md  transition-all duration-300">
              <FaArrowLeft className="" />
          </Link>

          <div className="flex items-center justify-center gap-2 sm:gap-4 group cursor-pointer">
            <span className="text-amber-400 transition-all duration-300 group-hover:scale-110">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 animate-spin-slow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 text-transparent bg-clip-text hover:from-yellow-300 hover:via-amber-400 hover:to-yellow-500 transition-all duration-300 transform translate-y-0 hover:-translate-y-1">
              Rental Service Dashboard
            </h1>

            {/* <span className="text-amber-400 transition-all duration-300 group-hover:scale-110">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 animate-float" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span> */}
          </div>
        </div>

        {/* Glowing border effect */}
        <div className="absolute inset-0 border border-amber-400/20 rounded-2xl glow"></div>
      </div>
      
      {/* Navigation Section */}
      <div className="flex justify-center bg-gradient-to-br from-slate-800 to-slate-900 min-h-24  rounded-2xl rounded-t-none w-full flex-wrap gap-6 p-4 items-center shadow-2xl mb-8 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-24 h-24 bg-purple-500 rotate-45 transform -translate-y-12 opacity-30"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-blue-500 rotate-45 transform translate-y-12 opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-40 h-40 border-4 border-amber-400/30 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 border-4 border-emerald-400/30 rounded-full animate-ping"></div>
          </div>
          
          {/* Glowing lines */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
          </div>
        </div>

        <button
          onClick={() => {
            handleSectionChange('dashboard');
            // try {
            //   const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3');
            //   audio.play();
            // } catch (error) {
            //   console.log('Audio playback failed:', error);
            // }
          }}
          className={`group relative flex items-center space-x-2 font-semibold px-8 py-3 rounded-lg min-w-[200px] sm:min-w-[220px] backdrop-blur-sm transition duration-300 ease-in-out ${
            activeSection === 'dashboard' 
              ? 'bg-white text-slate-800' 
              : 'text-white hover:bg-white/10'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => {
            handleSectionChange('booking');
            // try {
            //   const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3');
            //   audio.play();
            // } catch (error) {
            //   console.log('Audio playback failed:', error);
            // }
          }}
          className={`group relative flex items-center space-x-2 font-semibold px-8 py-3 rounded-lg min-w-[200px] sm:min-w-[220px] backdrop-blur-sm transition duration-300 ease-in-out ${
            activeSection === 'booking'
              ? 'bg-white text-slate-800'
              : 'text-white hover:bg-white/10'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Booking Management</span>
        </button>

        {/* <button
          onClick={() => {
            handleSectionChange('contact');
            // try {
            //   const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3');
            //   audio.play();
            // } catch (error) {
            //   console.log('Audio playback failed:', error);
            // }
          }}
          className={`group relative flex items-center space-x-2 font-semibold px-8 py-3 rounded-lg min-w-[200px] sm:min-w-[220px] backdrop-blur-sm transition duration-300 ease-in-out ${
            activeSection === 'contact'
              ? 'bg-white text-slate-800'
              : 'text-white hover:bg-white/10'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>Contact Management</span>
        </button> */}
      </div>

      {/* Dashboard Section */}
      {activeSection === 'dashboard' && (
        <div className="mt-10">
          <div className="relative mb-0 p-6 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl rounded-b-none shadow-2xl overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Title Section */}
              <div className="flex items-center gap-4">
                <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">
                  <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4-4-4z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                    Rental Properties
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base mt-1">Manage your rental listings</p>
                </div>
              </div>

              {/* Stats Card */}
              <div className="flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-yellow-500/50 transition-all duration-300">
                <div className="flex flex-col items-center">
                  <span className="text-gray-400 text-sm font-medium">Total Properties</span>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
                      {rentals?.length || 0}
                    </span>
                    <svg className="w-5 h-5 text-yellow-500 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl rounded-t-none shadow-2xl relative">
            <Link
              href="/add-rental"
              className="fixed bottom-6 right-10 p-4 z-50 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 rounded-full shadow-lg hover:from-yellow-500 hover:to-amber-600 transition-all duration-500 transform hover:scale-110 focus:ring-2 focus:ring-yellow-300 animate-[bounce_2s_ease-in-out_infinite]"
            >
              <FaPlus size={24} />
            </Link>

            {isLoading && (
              <div className="flex w-full justify-center items-center mt-10">
                <Loader />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {console.log("check the rentals is are : ", rentals)}
            
              {!isLoading && rentals?.map((rental) => (
                <div key={rental._id} className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-[1.02]">
                  <img src={rental.image} alt={rental.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-white">{rental.title}</h2>
                    <p className="text-gray-300 mt-2">{rental.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-lg font-bold text-yellow-400">${rental.price}</span>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEditClick(rental)}
                          className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-all duration-300 hover:scale-110"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(rental)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300 hover:scale-110"
                        >
                          <FaTrashAlt className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            
            </div>

            {!isLoading && rentals?.length < 1 && (
                <div className="flex items-center w-full justify-center py-20 h-full">
                  <div className="text-center w-fit mx-auto">
                    {/* <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20.25l-3.75 3.75M19.5 6.59388L16.25 3.31812" /></svg> */}
                    <h3 className="mt-2 text-lg font-medium leading-6 text-white">No Rentals Found</h3>
                    <p className="mt-2 text-sm text-gray-300">We couldn't find any rentals Please click (+) to add the Rental</p>
                  </div>
                </div>
              )}

            {/* Edit Modal */}
            {isEditModalOpen && (
              <div
                onClick={() => setEditModalOpen(false)}
                className="fixed inset-0 flex justify-center items-center bg-gray-900/80 backdrop-blur-sm z-50 p-4 md:py-[60px]"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl w-full max-w-3xl z-50 border border-white/10 transform transition-all duration-300 hover:border-yellow-500/30 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(234, 179, 8, 0.3) rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent flex items-center gap-3">
                    <FaEdit className="text-yellow-400" />
                    Edit Rental
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-gray-300 flex items-center gap-2">
                        <FaBox className="text-yellow-400" />
                        Title
                      </label>
                      <input
                        type="text"
                        value={updatedRental.title}
                        onChange={(e) => setUpdatedRental({ ...updatedRental, title: e.target.value })}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-gray-200 placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
                        placeholder="Enter rental title"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-gray-300 flex items-center gap-2">
                        <FaBox className="text-green-400" />
                        Price
                      </label>
                      <input
                        type="number"
                        value={updatedRental.price}
                        onChange={(e) => setUpdatedRental({ ...updatedRental, price: e.target.value })}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-gray-200 placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
                        placeholder="Enter price"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-gray-300 flex items-center gap-2">
                        <FaComment className="text-blue-400" />
                        Description
                      </label>
                      <textarea
                        value={updatedRental.description}
                        onChange={(e) => setUpdatedRental({ ...updatedRental, description: e.target.value })}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-gray-200 placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 min-h-[100px] resize-y"
                        placeholder="Enter description"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-gray-300 flex items-center gap-2">
                        <FaBox className="text-purple-400" />
                        Location
                      </label>
                      <input
                        type="text"
                        value={updatedRental.location}
                        onChange={(e) => setUpdatedRental({ ...updatedRental, location: e.target.value })}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-gray-200 placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
                        placeholder="Enter location"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-gray-300 flex items-center gap-2">
                        <FaBox className="text-red-400" />
                        Rating
                      </label>
                      <input
                        type="number"
                        value={updatedRental.rating}
                        onChange={(e) => setUpdatedRental({ ...updatedRental, rating: e.target.value })}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-gray-200 placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
                        placeholder="Enter rating"
                        min="0"
                        max="5"
                        step="0.1"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-gray-300 flex items-center gap-2">
                        <FaBox className="text-pink-400" />
                        Image
                      </label>
                      <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-500/10 file:text-yellow-400 hover:file:bg-yellow-500/20 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
                      />
                      {updatedRental.image && (
                        <img
                          src={updatedRental.image}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-xl mt-4 border border-white/10"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-white/10">
                    <button
                      onClick={() => setEditModalOpen(false)}
                      className="px-6 py-3 rounded-xl bg-white/5 text-gray-300 font-medium hover:bg-white/10 transform transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-white/10 flex items-center gap-2"
                    >
                      <FaTrashAlt className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdate}
                      className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-xl font-medium hover:from-yellow-500 hover:to-yellow-600 transform transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-yellow-300 flex items-center gap-2"
                    >
                      <FaCheckCircle className="w-4 h-4" />
                      Update Rental
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Modal */}
            {isDeleteModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 backdrop-blur-sm">
                <div className="bg-white/90 p-8 rounded-2xl w-full max-w-md shadow-2xl transform transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Confirm Deletion</h2>
                  <p className="text-gray-600 mb-6">Are you sure you want to delete this rental property? This action cannot be undone.</p>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setDeleteModalOpen(false)}
                      className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transform transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium hover:from-red-600 hover:to-pink-600 transform transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-red-300"
                    >
                      Delete Property
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Booking Management Section */}
      {activeSection === 'booking' && (
        <div className="mt-10">
          <div className="relative mb-0 p-6 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl rounded-b-none shadow-2xl overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Title Section */}
              <div className="flex items-center gap-4">
                <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">
                  <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                    Booking Orders
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base mt-1">Manage customer bookings and orders</p>
                </div>
              </div>

              {/* Stats Card */}
              <div className="flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-yellow-500/50 transition-all duration-300">
                <div className="flex flex-col items-center">
                  <span className="text-gray-400 text-sm font-medium">Total Bookings</span>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
                      {bookings?.length || 0}
                    </span>
                    <svg className="w-5 h-5 text-yellow-500 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative mt-6">
              <input
                type="text"
                placeholder="Search bookings by product name..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full p-3 pl-10 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 focus:border-yellow-500/50 text-gray-200 placeholder-gray-400 transition-all duration-300"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Decorative bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-20"></div>
          </div>

          {isBookingLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader />
            </div>
          ) : (
            <div className="overflow-x-auto bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl rounded-t-none shadow-2xl relative">
              {/* Decorative elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/30 rounded-full blur-3xl"></div>
              </div>

              <table className="min-w-full bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10">
                <thead className="bg-gradient-to-r from-slate-700/80 to-slate-800/80">
                  <tr className="text-gray-200">
                    <th className="px-6 py-4 text-left font-semibold tracking-wider">
                      <div className="flex items-center space-x-2">
                        <FaUser className="text-yellow-400" />
                        <span>Name</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left font-semibold tracking-wider">
                      <div className="flex items-center space-x-2">
                        <FaEnvelope className="text-yellow-400" />
                        <span>Email</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left font-semibold tracking-wider">
                      <div className="flex items-center space-x-2">
                        <FaPhone className="text-yellow-400" />
                        <span>Phone</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left font-semibold tracking-wider">
                      <div className="flex items-center space-x-2">
                        <FaBox className="text-yellow-400" />
                        <span>Product</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left font-semibold tracking-wider">
                      <div className="flex items-center space-x-2">
                        <FaCheckCircle className="text-yellow-400" />
                        <span>Status</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left font-semibold tracking-wider">
                      <div className="flex items-center space-x-2">
                        <FaCog className="text-yellow-400 animate-spin-slow" />
                        <span>Actions</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {bookings?.length > 0 && bookings.map((booking) => (
                    <tr key={booking._id} className="text-gray-300 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">{booking.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.product}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          booking.status ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                          'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        } transition-all duration-300 hover:scale-105`}>
                          {booking.status ? 'Fulfilled' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-3">
                          <button 
                            onClick={() => handleViewBooking(booking)}
                            className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all duration-300 hover:scale-110"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleEditBooking(booking)}
                            className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-all duration-300 hover:scale-110"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              setIsDeleteBookingModalOpen(true)
                              setBookingToDelete(booking)
                            }}
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300 hover:scale-110"
                          >
                            <FaTrashAlt className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* View Booking Modal */}
          {isViewModalOpen && selectedBooking && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50 backdrop-blur-sm"
              onClick={() => setIsViewModalOpen(false)}
            >
              <div 
                className="bg-white/90 p-8 rounded-2xl w-full max-w-3xl shadow-2xl transform transition-all hover:scale-[1.02] border border-gray-100"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Booking Details</h2>
                  <button
                    onClick={() => setIsViewModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h3 className="text-sm text-gray-500 mb-1">Booking ID</h3>
                      <p className="font-medium text-gray-800">{selectedBooking._id}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h3 className="text-sm text-gray-500 mb-1">Customer Information</h3>
                      <p className="font-medium text-gray-800">{selectedBooking.name}</p>
                      <p className="text-gray-600">{selectedBooking.email}</p>
                      <p className="text-gray-600">{selectedBooking.phone}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h3 className="text-sm text-gray-500 mb-1">Order Details</h3>
                      <p className="font-medium text-gray-800">Product: {selectedBooking.product}</p>
                      <p className="text-gray-600">Delivery: {selectedBooking.delivery}</p>
                      <p className="text-gray-600">Status: <span className={`px-2 py-1 rounded-full text-sm ${selectedBooking.status ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {selectedBooking.status ? 'Fulfilled' : 'Pending'}
                      </span></p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h3 className="text-sm text-gray-500 mb-1">Delivery Address</h3>
                      <p className="font-medium text-gray-800">{selectedBooking.address}</p>
                      <p className="text-gray-600">{selectedBooking.city}</p>
                      <p className="text-gray-600">Postal Code: {selectedBooking.code}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h3 className="text-sm text-gray-500 mb-1">Scheduled Date</h3>
                      <p className="font-medium text-gray-800">{new Date(selectedBooking.date).toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h3 className="text-sm text-gray-500 mb-1">Additional Information</h3>
                      <p className="font-medium text-gray-800">{selectedBooking.comments}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div>
                      <p>Created: {new Date(selectedBooking.createdAt).toLocaleString()}</p>
                      <p>Last Updated: {new Date(selectedBooking.updatedAt).toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => setIsViewModalOpen(false)}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Edit Booking Modal */}
          {isEditBookingModalOpen && selectedBooking && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 backdrop-blur-sm">
              <div className="bg-white/90 p-8 rounded-2xl w-full max-w-md shadow-2xl transform transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Update Booking Status</h2>
                <div className="relative mb-6">
                  <label className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all duration-300">
                    <input
                      type="checkbox"
                      checked={updatedFulfillStatus}
                      onChange={(e) => setUpdatedFulfillStatus(e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 font-medium">Mark as Fulfilled</span>
                  </label>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsEditBookingModalOpen(false)}
                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transform transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateBooking}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transform transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-blue-300"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Booking Modal */}
          {isDeleteBookingModalOpen && bookingToDelete && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 backdrop-blur-sm">
              <div className="bg-white/90 p-8 rounded-2xl w-full max-w-md shadow-2xl transform transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Confirm Deletion</h2>
                <p className="text-gray-600 mb-6">Are you sure you want to delete this booking? This action cannot be undone.</p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsDeleteBookingModalOpen(false)}
                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transform transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteBooking}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium hover:from-red-600 hover:to-pink-600 transform transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-red-300"
                  >
                    Delete Booking
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Contact Management Section */}
      {activeSection === 'contact' && (
        <div className="mt-10">
          <div className="relative mb-0 p-6 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl rounded-b-none shadow-2xl overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Title Section */}
              <div className="flex items-center gap-4">
                <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-500">
                  <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4-4-4z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                    Customer Inquiries
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base mt-1">Manage and respond to customer messages</p>
                </div>
              </div>

              {/* Stats Card */}
              <div className="flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 hover:border-yellow-500/50 transition-all duration-300">
                <div className="flex flex-col items-center">
                  <span className="text-gray-400 text-sm font-medium">Total Inquiries</span>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
                      {totalContacts || 0}
                    </span>
                    <svg className="w-5 h-5 text-yellow-500 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-20"></div>
          </div>
          
          {isContactLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl rounded-t-none shadow-2xl relative">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-500/30 rounded-full blur-3xl"></div>
                </div>

                <table className="min-w-full bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10">
                  <thead className="bg-gradient-to-r from-slate-700/80 to-slate-800/80">
                    <tr className="text-gray-200">
                      <th className="px-6 py-4 text-left font-semibold tracking-wider">
                        <div className="flex items-center space-x-2">
                          <FaUser className="text-yellow-400" />
                          <span>Name</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wider">
                        <div className="flex items-center space-x-2">
                          <FaEnvelope className="text-yellow-400" />
                          <span>Email</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wider">
                        <div className="flex items-center space-x-2">
                          <FaPhone className="text-yellow-400" />
                          <span>Phone</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wider">
                        <div className="flex items-center space-x-2">
                          <FaComment className="text-yellow-400" />
                          <span>Message</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wider">
                        <div className="flex items-center space-x-2">
                          <FaCheckCircle className="text-yellow-400" />
                          <span>Status</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left font-semibold tracking-wider">
                        <div className="flex items-center space-x-2">
                          <FaCog className="text-yellow-400 animate-spin-slow" />
                          <span>Actions</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {console.log("contacts", contacts)}
                    {contacts && contacts.length > 0 && contacts.map((contact) => (
                      <tr key={contact._id} className="text-gray-300 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">{contact.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{contact.phone}</td>
                        <td className="px-6 py-4">
                          <div className="max-w-xs overflow-hidden text-ellipsis">{contact.message}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            contact.status === 'resolved' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                            contact.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                            'bg-red-500/20 text-red-400 border border-red-500/30'
                          } transition-all duration-300 hover:scale-105`}>
                            {contact.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-3">
                            <button 
                              onClick={() => handleViewContact(contact)}
                              className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all duration-300 hover:scale-110"
                            >
                              <FaEye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleEditContact(contact)}
                              className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-all duration-300 hover:scale-110"
                            >
                              <FaEdit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteContact(contact)}
                              className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300 hover:scale-110"
                            >
                              <FaTrashAlt className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Enhanced Pagination */}
                <div className="mt-6 flex justify-center">
                  <div className="flex space-x-2 bg-white/5 p-2 rounded-lg backdrop-blur-sm">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 shadow-lg transform scale-105'
                            : 'text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* View Contact Modal */}
          {isViewContactModalOpen && selectedContact && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50 backdrop-blur-sm"
              onClick={() => setIsViewContactModalOpen(false)}
            >
              <div 
                className="bg-white/90 p-8 rounded-2xl w-full max-w-3xl shadow-2xl transform transition-all duration-300 hover:scale-[1.02] border border-gray-100"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Contact Details</h2>
                  <button
                    onClick={() => setIsViewContactModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h3 className="text-sm text-gray-500 mb-1">Full Name</h3>
                      <p className="font-medium text-gray-800">{selectedContact.name}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h3 className="text-sm text-gray-500 mb-1">Contact Information</h3>
                      <p className="font-medium text-gray-800">{selectedContact.email}</p>
                      <p className="text-gray-600">{selectedContact.phone}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h3 className="text-sm text-gray-500 mb-1">Status</h3>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        selectedContact.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                        selectedContact.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedContact.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h3 className="text-sm text-gray-500 mb-1">Message</h3>
                      <p className="font-medium text-gray-800 whitespace-pre-wrap">{selectedContact.message}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h3 className="text-sm text-gray-500 mb-1">Submitted Date</h3>
                      <p className="font-medium text-gray-800">
                        {new Date(selectedContact.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div>
                      <p>Created: {new Date(selectedContact.createdAt).toLocaleString()}</p>
                      <p>Last Updated: {new Date(selectedContact.updatedAt).toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => setIsViewContactModalOpen(false)}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Edit Contact Modal */}
          {isEditContactModalOpen && selectedContact && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 backdrop-blur-sm">
              <div className="bg-white/90 p-8 rounded-2xl w-full max-w-md shadow-2xl transform transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Update Contact Status</h2>
                <div className="relative mb-6">
                  <select
                    value={updatedContactStatus}
                    onChange={(e) => setUpdatedContactStatus(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 appearance-none cursor-pointer hover:bg-gray-100"
                  >
                    <option value="pending">🕒 Pending</option>
                    <option value="in-progress">🔄 In Progress</option>
                    <option value="resolved">✅ Resolved</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsEditContactModalOpen(false)}
                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transform transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateContact}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transform transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-blue-300"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Contact Modal */}
          {isDeleteContactModalOpen && contactToDelete && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 backdrop-blur-sm">
              <div className="bg-white/90 p-8 rounded-2xl w-full max-w-md shadow-2xl transform transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Confirm Deletion</h2>
                <p className="text-gray-600 mb-6">Are you sure you want to delete this contact? This action cannot be undone.</p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsDeleteContactModalOpen(false)}
                    className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transform transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium hover:from-red-600 hover:to-pink-600 transform transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-red-300"
                  >
                    Delete Contact
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      
      {/* Delete Modal */}
      {/* {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-11/12 sm:w-96">
            <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this rental?</h2>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}