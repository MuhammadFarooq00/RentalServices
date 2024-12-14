import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaRegComment } from 'react-icons/fa'; // Importing icons for fields

const ContactForm = () => {
  return (
    <section className="px-6 py-16 mt-5 text-center bg-gray-50 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-8 text-4xl font-extrabold text-gray-800">
          Contact Us
        </h2>
        <p className="max-w-3xl mx-auto mb-12 text-xl text-gray-700">
          Have questions or need assistance? Our team is here to help! Fill out the form below, and we'll get back to you as soon as possible.
        </p>

        {/* Contact Form */}
        <form className="grid max-w-4xl grid-cols-1 gap-6 p-8 mx-auto bg-white rounded-lg shadow-lg sm:grid-cols-2">
          {/* Full Name */}
          <div className="flex items-center space-x-4">
            <FaUser className="text-gray-500" />
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              className="w-full p-4 transition duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
              className="w-full p-4 transition duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex items-center col-span-2 space-x-4">
            <FaPhone className="text-gray-500" />
            <input
              type="tel"
              id="phone"
              placeholder="Phone Number"
              className="w-full p-4 transition duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Message */}
          <div className="flex items-center col-span-2 space-x-4">
            <FaRegComment className="text-gray-500" />
            <textarea
              id="message"
              placeholder="Your Message"
              className="w-full p-4 transition duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows="6"
              required
            />
          </div>

          {/* Address */}
          <div className="flex items-center col-span-2 space-x-4">
            <FaMapMarkerAlt className="text-gray-500" />
            <input
              type="text"
              id="address"
              placeholder="Your Address"
              className="w-full p-4 transition duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center col-span-2 mt-6">
            <button
              type="submit"
              className="px-10 py-4 text-lg font-semibold text-white transition duration-300 transform bg-yellow-500 rounded-lg shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
