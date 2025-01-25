'use client';
import { useEffect,useRef } from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import { FaBuilding, FaCar, FaTools, FaArrowRight } from 'react-icons/fa';
import { MdHouse, MdOutlineWeekend, MdOutlineContactSupport } from 'react-icons/md';
import Image from 'next/image';
import { Toaster } from 'react-hot-toast';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from './context/AuthContext';

const HomePage = () => {
  const sliderRef = useRef();
  const {user:UserData,setUser} = useAuth();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const slides = [
    {
      image: 'https://picsum.photos/id/1018/1200/600',
      title: 'Luxury Apartments',
      description: 'Stay in style and comfort in our top-tier apartments.',
    },
    {
      image: 'https://picsum.photos/id/1019/1200/600',
      title: 'Modern Villas',
      description: 'Relax in our elegant and spacious modern villas.',
    },
    {
      image: 'https://picsum.photos/id/1020/1200/600',
      title: 'Cozy Cottages',
      description: 'Enjoy a peaceful stay in our charming cottages.',
    },
    {
      image: 'https://picsum.photos/id/1021/1200/600',
      title: 'Office Spaces',
      description: 'Rent high-quality office spaces for your business needs.',
    },
    {
      image: 'https://picsum.photos/id/1022/1200/600',
      title: 'Event Venues',
      description: 'Host your events in our well-equipped venues.',
    },
  ];



  return (

    <>
   
    <div>
      
    <section className="relative px-6 py-32 text-white bg-gradient-to-r from-gray-700 to-slate-500">
        <div className="container mx-auto text-center">
          <motion.h1
            className="mb-6 text-5xl font-extrabold"
            // initial={{ opacity: 0, y: -50 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.2 }}
          >
            Welcome to Rental Services
          </motion.h1>
          <motion.p
            className="mb-8 text-lg"
            // initial={{ opacity: 0, y: 50 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.2, delay: 0.1 }}
          >
            Find the perfect rental for your needs — whether it's a home, car, or tools for your next project.
          </motion.p>
        </div>
      </section>


      <section className="py-12  border-t-2 border-gray-700 bg-gradient-to-r from-gray-700 to-slate-500">
        <div className="container mx-auto">
          <motion.div
            className="relative overflow-hidden rounded-lg shadow-md"
            // initial={{ opacity: 0 }}
            // whileInView={{ opacity: 1 }}
            // transition={{ duration: 0.2 }}
          >
            <Slider ref={sliderRef} {...settings}>
              {slides.map((slide, index) => (
                <div key={index} className="relative">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-[600px] object-cover rounded-lg"
                  />
                  <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-40">
                    <h2 className="text-3xl font-bold text-white">{slide.title}</h2>
                    <p className="mt-2 text-white">{slide.description}</p>
                  </div>
                </div>
              ))}
            </Slider>

            <button
              onClick={() => sliderRef.current.slickPrev()}
              className="absolute z-10 p-2 text-white transform -translate-y-1/2 bg-gray-800 rounded-full top-1/2 left-4 hover:bg-gray-700"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={() => sliderRef.current.slickNext()}
              className="absolute z-10 p-2 text-white transform -translate-y-1/2 bg-gray-800 rounded-full top-1/2 right-4 hover:bg-gray-700"
            >
              <FaChevronRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-gray-700 to-slate-500">
        <div className="container mx-auto text-center">
          <motion.h2
            className="mb-8 text-4xl font-bold text-white"
            // initial={{ opacity: 0 }}
            // whileInView={{ opacity: 1 }}
            // transition={{ duration: 0.8 }}
          >
            Featured Rentals
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              { icon: MdHouse, title: 'Homes', description: 'Find your dream home for short or long stays.' },
              { icon: FaCar, title: 'Cars', description: 'Rent cars for travel or business trips with ease.' },
              { icon: FaTools, title: 'Tools', description: 'Professional tools for your projects and DIY needs.' },
              { icon: MdOutlineWeekend, title: 'Cottages', description: 'Relax in serene and peaceful cottages.' },
              { icon: FaBuilding, title: 'Offices', description: 'Fully furnished offices for professionals.' },
              { icon: MdOutlineContactSupport, title: 'Customer Support', description: '24/7 support for all rentals.' },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="p-6 transition-shadow border border-gray-600 rounded-lg shadow-md bg-gray-300 hover:shadow-lg"
                // initial={{ opacity: 0, scale: 0.8 }}
                // whileInView={{ opacity: 1, scale: 1 }}
                // transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <service.icon className="mx-auto mb-4 text-4xl text-yellow-500" />
                <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                <p className="mt-2 text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="my-8 mt-24">
            <Link
              href="/auth/login"
              className="px-10 py-4 text-lg text-white transition  border border-purple-500 rounded-md shadow-md hover:bg-purple-500"
            >
              Create Rentals
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 text-center text-white bg-gradient-to-r border-t-2 border-gray-500 from-gray-700 to-slate-500">
        <motion.h2
          className="mb-4 text-4xl font-bold"
          // initial={{ opacity: 0, scale: 0.8 }}
          // whileInView={{ opacity: 1, scale: 1 }}
          // transition={{ duration: 0.6 }}
        >
          Ready to Find Your Next Rental?
        </motion.h2>
        <motion.p
          className="mb-6 text-lg"
          // initial={{ opacity: 0 }}
          // whileInView={{ opacity: 1 }}
          // transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore our diverse collection of rentals and book today.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <Link
            href="/auth/login"
            className="px-10 py-4 text-lg text-white transition  border border-purple-500 rounded-md shadow-md hover:bg-purple-500"
          >
            Get Started <FaArrowRight className="inline ml-2" />
          </Link>
        </motion.div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <motion.h2
            className="mb-8 text-4xl font-bold text-gray-800"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Why Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                icon: FaCar,
                title: 'Wide Selection',
                description: 'Choose from a variety of rental options to suit your needs.',
              },
              {
                icon: MdOutlineWeekend,
                title: 'Affordable Prices',
                description: 'Get the best deals for your short-term or long-term stays.',
              },
              {
                icon: MdOutlineContactSupport,
                title: '24/7 Support',
                description: 'Our team is always here to assist you with your queries.',
              },
              {
                icon: FaTools,
                title: 'Quality Assurance',
                description: 'We ensure all our rentals meet the highest standards.',
              },
              {
                icon: FaBuilding,
                title: 'Flexible Booking',
                description: 'Easy and flexible booking options tailored to your schedule.',
              },
              {
                icon: MdHouse,
                title: 'Safe and Secure',
                description: 'Experience peace of mind with well-maintained rentals.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-6 transition-shadow bg-white border rounded-lg shadow-md hover:shadow-lg"
                // initial={{ opacity: 0, scale: 0.8 }}
                // whileInView={{ opacity: 1, scale: 1 }}
                // transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <item.icon className="mx-auto mb-4 text-4xl text-yellow-500" />
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white bg-gradient-to-r from-gray-700 to-slate-500">
        <div className="container mx-auto text-center">
          <motion.h2
            className="mb-8 text-4xl font-bold"
            // initial={{ opacity: 0 }}
            // whileInView={{ opacity: 1 }}
            // transition={{ duration: 0.8 }}
          >
            What Our Customers Say
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                name: 'John Doe',
                review:
                  'The rental process was seamless, and the property was beyond expectations! Highly recommended.',
                image: 'https://picsum.photos/600/300?random=1',
              },
              {
                name: 'Jane Smith',
                review:
                  'Affordable prices and excellent customer service. I found the perfect cottage for my weekend getaway.',
                image: 'https://picsum.photos/600/300?random=2',
              },
              {
                name: 'Michael Lee',
                review:
                  'The tools I rented were top-notch, and the booking process was so easy. Will rent again!',
                image: 'https://picsum.photos/600/300?random=3',
              },
            ].map((customer, index) => (
              <motion.div
                key={index}
                className="p-6 text-gray-800 bg-white rounded-lg shadow-md"
                // initial={{ opacity: 0, y: 50 }}
                // whileInView={{ opacity: 1, y: 0 }}
                // transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <img
                  src={customer.image}
                  alt={customer.name}
                  className="object-cover w-20 h-20 mx-auto mb-4 rounded-full"
                />
                <h3 className="mb-2 text-xl font-semibold">{customer.name}</h3>
                <p className="text-sm">{customer.review}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <motion.h2
            className="mb-8 text-4xl font-bold text-gray-800"
            // initial={{ opacity: 0 }}
            // whileInView={{ opacity: 1 }}
            // transition={{ duration: 0.8 }}
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[
              {
                step: 1,
                title: 'Browse Rentals',
                description: 'Explore a wide variety of options to find your perfect rental.',
              },
              {
                step: 2,
                title: 'Select & Book',
                description: 'Choose your desired property or item and confirm your booking.',
              },
              {
                step: 3,
                title: 'Secure Payment',
                description: 'Make a secure payment online with our trusted system.',
              },
              {
                step: 4,
                title: 'Enjoy Your Stay',
                description: 'Relax and enjoy your rental with full peace of mind.',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="p-6 transition-shadow rounded-lg shadow-md bg-gray-50 hover:shadow-lg"
                // initial={{ opacity: 0, scale: 0.8 }}
                // whileInView={{ opacity: 1, scale: 1 }}
                // transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="mb-4 text-4xl font-bold text-yellow-500">{step.step}</div>
                <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                <p className="mt-2 text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
   
    </>
  );
};

export default HomePage;
