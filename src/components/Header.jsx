"use client";

import { useState } from "react";
import Link from "next/link";
import { SiWebtrees } from "react-icons/si";
import { TbSeo } from "react-icons/tb";

import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaShoppingCart,
  FaPhoneAlt,
  FaUserAlt,
} from "react-icons/fa"; // Importing icons
import { useAuth } from "@/app/context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user:UserData} = useAuth();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const navigate = (url) => {
    window.location.href = url;
  }
  return (
    <header className="sticky top-0 z-50 p-4 text-white bg-gray-800 shadow-md">
      <div className="container flex items-center justify-between mx-auto">
        {/* Logo and Rental Services */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-2xl font-bold transition duration-300 hover:text-yellow-500"
          >
            Rental Services
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-4 lg:space-x-6 lg:flex">
          <Link
            href="/about"
            className="flex items-center transition duration-300 hover:text-yellow-400"
          >
            <FaInfoCircle className="mr-2" /> About
          </Link>
          {
            UserData && (
              <Link
            href={`/rentals/${UserData?.user?.id}`}
            className="flex items-center transition duration-300 hover:text-yellow-400"
          >
            <FaShoppingCart className="mr-2" /> Rentals
          </Link>
            )
          }
          
          <Link
            href="/webservices"
            className="flex items-center transition duration-300 hover:text-yellow-400"
          >
            <SiWebtrees className="mr-2" /> Web Services
          </Link>
          <Link
            href="/seoservices"
            className="flex items-center transition duration-300 hover:text-yellow-400"
          >
            <TbSeo className="w-6 h-8 mr-2 " /> Seo Services
          </Link>
          <Link
            href="/contactus"
            className="flex items-center transition duration-300 hover:text-yellow-800"
          >
            <FaPhoneAlt className="mr-2" /> Contact Us
          </Link>
          {
            UserData && (
              <Link
            href={`/dashboard`}
            className="flex items-center transition duration-300 hover:text-yellow-400"
          >
            <FaShoppingCart className="mr-2" /> Dashboard
            </Link>
            )
          }
         {
          
          UserData ? 

          (<><button onClick={()=>{
            localStorage.clear();
            navigate("/auth/login")
          }}  className="flex items-center bg-white rounded-full text-yellow-400 px-4 py-2">
            Logout
          </button>
         </>):
         <Link
            href="/auth/login"
            className="flex items-center bg-white rounded-full text-yellow-400 px-4 py-2"
          >
            Create Rental
          </Link>}
          {/* <Link
            href="/auth/login"
            className="flex items-center transition duration-300 hover:text-yellow-400"
          >
            <FaUserAlt className="mr-2" /> Login
          </Link>
          <Link
            href="/auth/signup"
            className="flex items-center transition duration-300 hover:text-yellow-400"
          >
            <FaUserAlt className="mr-2" /> Sign Up
          </Link> */}
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center lg:hidden">
          <Link
            href="/contactus"
            className="flex items-center mr-4 transition duration-300 hover:text-yellow-400"
          >
            <FaPhoneAlt className="mr-2" /> Contact Us
          </Link>
          <button onClick={toggleMenu} className="text-white">
            <FaBars className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Menu (Slide-in) */}
      <div
        className={`${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 w-3/4 h-full bg-gray-800 text-white transition-transform duration-300 ease-in-out z-50 p-6`}
      >
        <div className="flex items-center justify-between">
        {
            UserData && (
              <Link
              href={`/rentals/${UserData?.user?.id}`}
            className="text-2xl font-bold transition duration-300 hover:text-yellow-500"
          >
            Rental Services
          </Link>
            )
          }
          
          <button onClick={closeMenu} className="text-white">
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <nav className="mt-6 space-y-4">
          <Link
            href="/about"
            onClick={closeMenu}
            className="flex items-center py-2 transition duration-300 bg-gray-700 rounded-md ps-6 hover:bg-gray-900 hover:text-yellow-400"
          >
            <FaInfoCircle className="mr-2" /> About
          </Link>
          <Link
            href="/rentals"
            onClick={closeMenu}
            className="flex items-center py-2 transition duration-300 bg-gray-700 rounded-md ps-6 hover:bg-gray-900 hover:text-yellow-400"
          >
            <FaShoppingCart className="mr-2" /> Rentals
          </Link>
          <Link
            href="/contactus"
            onClick={closeMenu}
            className="flex items-center py-2 transition duration-300 bg-gray-700 rounded-md ps-6 hover:bg-gray-900 hover:text-yellow-400"
          >
            <FaPhoneAlt className="mr-2" /> Contact Us
          </Link>
          <Link
            href="/webservices"
             onClick={closeMenu}
            className="flex items-center py-2 transition duration-300 bg-gray-700 rounded-md ps-6 hover:bg-gray-900 hover:text-yellow-400"
          >
            <SiWebtrees className="mr-2" /> Web Services
          </Link>
          <Link
            href="/seoservices"
             onClick={closeMenu}
            className="flex items-center py-2 transition duration-300 bg-gray-700 rounded-md ps-6 hover:bg-gray-900 hover:text-yellow-400"
          >
            <TbSeo className="w-6 h-8 mr-2 " /> Seo Services
          </Link>
          {
            UserData && (
              <Link
            href={`/dashboard`}
            onClick={closeMenu}
            className="flex items-center py-2 transition duration-300 bg-gray-700 rounded-md ps-6 hover:bg-gray-900 hover:text-yellow-400"
          >
            <FaShoppingCart className="mr-2" /> Dashboard
            </Link>
            )
          }
          {
            UserData ? 
           (
            <>
             <button
            onClick={()=>{
              localStorage.clear();
              navigate("/login");
              closeMenu();
            }}
            className="flex items-center w-full py-2 transition duration-300 bg-gray-700 rounded-md ps-6 hover:bg-gray-900 hover:text-yellow-400"
          >
            <FaUserAlt className="mr-2" />Logout
          </button> 
            </>
           ):
          <Link 
            href="/auth/login"
            onClick={closeMenu}
            className="flex items-center py-2 transition duration-300 bg-gray-700 rounded-md ps-6 hover:bg-gray-900 hover:text-yellow-400"
          >
            <FaUserAlt className="mr-2" /> Create Rental
          </Link>
          }
          {/* <Link
            href="/auth/login"
            onClick={closeMenu}
            className="flex items-center py-2 transition duration-300 bg-gray-700 rounded-md ps-6 hover:bg-gray-900 hover:text-yellow-400"
          >
            <FaUserAlt className="mr-2" /> Login
          </Link>
          <Link
            href="/auth/signup"
            onClick={closeMenu}
            className="flex items-center py-2 transition duration-300 bg-gray-700 rounded-md ps-6 hover:bg-gray-900 hover:text-yellow-400"
          >
            <FaUserAlt className="mr-2" /> Sign Up
          </Link>  */}
        </nav>
      </div>

      {/* Close Mobile Menu when clicking outside */}
      {isMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black opacity-50"
        />
      )}
    </header>
  );
};

export default Header;
