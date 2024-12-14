"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaRegComment } from 'react-icons/fa'; // Importing icons for fields
import { FaClock } from 'react-icons/fa';
const AboutPage = () => {
  const carouselItems = [
    {
      id: 1,
      title: "Luxury Apartment",
      description: "Experience the comfort of luxury living in the heart of the city.",
      image: "https://picsum.photos/600/300?random=1",
    },
    {
      id: 2,
      title: "Cozy Cottage",
      description: "Perfect for weekend getaways with family and friends.",
      image: "https://picsum.photos/600/300?random=2",
    },
    {
      id: 3,
      title: "Beachside Villa",
      description: "Relax and unwind by the beach in our beautiful seaside villa.",
      image: "https://picsum.photos/600/300?random=3",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Auto change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-12 bg-gray-50">

      {/* About Text Section */}
      <section className=" mb-12 bg-gradient-to-r rounded-3xl mx-7  from-gray-400 via-gray-300 to-yellow-100 py-16 text-center px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8">
            Welcome to Our Premium Rental Services
          </h2>
          <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
            Discover the perfect rental for your needs. From luxurious apartments in vibrant cities to serene cottages for the ultimate weekend getaway, we offer a variety of properties. Whether you're planning a short-term retreat or a long-term stay, we ensure comfort, convenience, and all the amenities you require for a memorable experience.
          </p>
          <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
            Our team is dedicated to maintaining properties that are safe, well-kept, and designed to offer a relaxing atmosphere. With seamless booking and around-the-clock support, we promise to make your stay smooth and enjoyable from start to finish. Let us help you find your perfect home away from home.
          </p>

          {/* <div className="mt-8">
      <Link
        href="/rentals"
        className="inline-block px-10 py-4 text-xl font-semibold text-white bg-yellow-600 rounded-lg shadow-lg hover:bg-yellow-700 transition duration-300 transform hover:scale-105"
      >
        Explore Our Rentals
      </Link>
    </div> */}
        </div>
      </section>



      {/* Carousel Section */}
      <section className="mb-12 px-7 ">
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-0 left-0 z-10 flex items-center justify-between w-full h-full px-4">
            <button
              onClick={prevSlide}
              className="text-white bg-gray-800 bg-opacity-50 p-2 rounded-full"
            >
              &#10094;
            </button>
            <button
              onClick={nextSlide}
              className="text-white bg-gray-800 bg-opacity-50 p-2 rounded-full"
            >
              &#10095;
            </button>
          </div>

          {/* Carousel Image Container */}
          <div className="overflow-hidden relative rounded-3xl">
            <div
              className="flex transition-transform  duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {carouselItems.map((item) => (
                <div key={item.id} className="w-full rounded-3xl flex-shrink-0 relative">
                  {/* Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1200}
                    height={600}
                    className="w-full h-full object-cover rounded-3xl"
                  />

                  {/* Content Overlay on Image */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-40 p-4 rounded-lg">
                    <h2 className="text-4xl font-bold text-white mb-4">{item.title}</h2>
                    <p className="text-white text-lg">{item.description}</p>
                    <Link href="/rentals" className="inline-block mt-6 z-30 px-8 py-4 cursor-pointer text-white bg-gray-500 rounded-lg hover:bg-yellow-600 transition-all">
                      Check Out More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>




      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Discover Our Premium Rental Services
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            We offer a range of rental services designed to cater to your unique needs. Whether you're looking for a short-term getaway or a long-term stay, our properties provide the perfect blend of comfort, style, and convenience. Explore our offerings and find the perfect place to call your home away from home.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 20h9m-9 0H3m9 0V4M3 4v16h18"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Flexible Rentals</h3>
              <p className="text-gray-600">
                Choose from a variety of rental options that cater to your needs, whether it's for a few days, weeks, or months.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 8h10M7 12h10M7 16h10"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Fully Equipped</h3>
              <p className="text-gray-600">
                Our properties come fully equipped with all the amenities you need to feel at home, including Wi-Fi, kitchen facilities, and more.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
              <div className="mb-4">
                <svg
                  className="w-16 h-16 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Easy Booking</h3>
              <p className="text-gray-600">
                Book your stay with ease through our simple online platform, offering quick and secure reservations.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12">
            <Link
              href="/rentals"
              className="inline-block px-8 py-4 text-white bg-yellow-500 rounded-lg text-xl hover:bg-yellow-600 transition"
            >
              Explore Our Rentals
            </Link>
          </div>
        </div>
      </section>

      {/* User Reviews Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">What Our Users Say</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6 w-80">
              <p className="text-gray-600 mb-4">
                "The modern apartment I rented was everything I could have hoped for. It was
                beautifully decorated, very spacious, and had all the amenities I needed.
                Highly recommend this service!"
              </p>
              <p className="font-semibold text-gray-800">John Doe</p>
              <p className="text-gray-500">New York, NY</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 w-80">
              <p className="text-gray-600 mb-4">
                "I had the best time staying at the cozy cottage. It was the perfect getaway
                spot with beautiful views. Will definitely book again."
              </p>
              <p className="font-semibold text-gray-800">Jane Smith</p>
              <p className="text-gray-500">Nashville, TN</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 w-80">
              <p className="text-gray-600 mb-4">
                "The beachside villa was a dream come true. I couldn't have asked for a more
                relaxing stay. Everything was perfect!"
              </p>
              <p className="font-semibold text-gray-800">Emily Johnson</p>
              <p className="text-gray-500">Miami, FL</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="pt-12 pb-5 text-center">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">
          Ready to Rent? Get in Touch with Us!
        </h3>
        {/* <Link href="/contact" className="inline-block px-8 py-4 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-all">
          Contact Us
        </Link> */}

      </section>

      <section className="bg-gray-50 pb-16 text-center px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* <h2 className="text-4xl font-extrabold text-gray-800 mb-8">
          Contact Us
        </h2>
        <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
          Have questions or need assistance? Our team is here to help! Fill out the form below, and we'll get back to you as soon as possible.
        </p> */}

          {/* Contact Form */}
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            {/* Full Name */}
            <div className="flex items-center space-x-4">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
                required
              />
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="flex items-center space-x-4">
              <FaPhone className="text-gray-500" />
              <input
                type="tel"
                id="phone"
                placeholder="Phone Number"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
                required
              />
            </div>


            {/* Address */}
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-gray-500" />
              <input
                type="text"
                id="address"
                placeholder="Your Address"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
                required
              />
            </div>

            {/* Message */}
            <div className="flex items-center space-x-4 col-span-2">
              <FaRegComment className="text-gray-500" />
              <textarea
                id="message"
                placeholder="Your Message"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
                rows="6"
                required
              />
            </div>




            {/* Submit Button */}
            <div className="col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                className="px-10 py-4 bg-yellow-500 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300 transform hover:scale-105"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>


      {/* address section  */}


      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center lg:items-start">
            {/* Address and Hours */}
            <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Visit Our Office
              </h2>
              <div className="flex items-start mb-4">
                <FaMapMarkerAlt className="text-yellow-600 text-2xl mr-3" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">Address</h3>
                  <p className="text-gray-600">
                    2426 Crossmill Ln, Katy, TX 77450
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <FaClock className="text-yellow-600 text-2xl mr-3" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">Hours</h3>
                  <p className="text-gray-600">Mon-Fri: 9am - 5pm</p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="w-full lg:w-2/3">
              <div className="rounded-lg shadow-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.084553660648!2d-95.76149508459206!3d29.74463908198851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640e5180e8dcbf7%3A0xa9aeb87c034c0a60!2s2426%20Crossmill%20Ln%2C%20Katy%2C%20TX%2077450%2C%20USA!5e0!3m2!1sen!2s!4v1697451217163!5m2!1sen!2s"
                  width="100%"
                  height="350"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[350px]"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
