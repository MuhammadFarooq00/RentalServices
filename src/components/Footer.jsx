"use client";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-8 mt-8 text-white bg-gray-800">
      <div className="container px-4 mx-auto lg:px-12">
        <div className="flex flex-wrap justify-between">
          {/* Company Info */}
          <div className="w-full mb-6 lg:w-2/6">
            <h3 className="mb-4 text-lg font-bold">Rental Services</h3>
            <p className="text-gray-400 pe-10">
              Offering premium rental solutions to meet all your short-term and
              long-term needs. Quality properties and excellent service
              guaranteed.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full mb-6 lg:w-1/6">
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <a href="/about" className="hover:text-yellow-400">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/rentals" className="hover:text-yellow-400">
                  Our Rentals
                </a>
              </li>
              <li className="mb-2">
                <a href="/contactus" className="hover:text-yellow-400">
                  Contact Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/auth/login" className="hover:text-yellow-400">
                  Login
                </a>
              </li>
              <li>
                <a href="/auth/signup" className="hover:text-yellow-400">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full mb-6 lg:w-1/6">
            <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
            <ul>
              <li className="flex items-center mb-2">
                <FaPhoneAlt className="mr-2 text-yellow-400" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center mb-2">
                <FaEnvelope className="mr-2 text-yellow-400" />
                <span>info@rentalservices.com</span>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-yellow-400" />
                <span>2426 Crossmill Ln, Katy, TX 77450</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full mb-6 lg:w-1/6">
            <h3 className="mb-4 text-lg font-bold">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-2xl text-yellow-400 hover:text-yellow-500"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-2xl text-yellow-400 hover:text-yellow-500"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-2xl text-yellow-400 hover:text-yellow-500"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-4 mt-8 text-center border-t border-gray-700">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Rental Services. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
