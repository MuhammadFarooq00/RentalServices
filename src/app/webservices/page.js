'use client'

import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('web'); // Default to Web Services tab

  const webServices = [
    {
      name: "Website Development",
      description: "Get a responsive and modern website tailored to your business needs.",
      image: "/web.jpeg",
    },
    {
      name: "Web Hosting",
      description: "Reliable and scalable web hosting solutions to keep your site running smoothly.",
      image: "/web-hosting.jpeg",
    },
    {
      name: "Web App Development",
      description: "Develop powerful web applications to enhance your digital presence.",
      image: "/web-app-development.jpeg",
    },
    {
      name: "E-commerce Solutions",
      description: "Launch your online store with a secure and user-friendly platform.",
      image: "/ecommerce-solutions.jpg",
    },
    {
      name: "SEO Optimization",
      description: "Improve your website's visibility with our expert SEO services.",
      image: "/sepopt.png",
    },
    {
      name: "Content Management Systems",
      description: "Easily manage your website content with our CMS solutions.",
      image: "/cms.jfif",
    },
  ];

  const seoServices = [
    {
      name: "Keyword Research",
      description: "Identify the best keywords to target your audience effectively.",
      image: "/Keyword research.jpg",
    },
    {
      name: "Content Optimization",
      description: "Optimize your content for better rankings and user engagement.",
      image: "/content-optimization.jpeg",
    },
    {
      name: "Local SEO",
      description: "Enhance your local search presence and attract nearby customers.",
      image: "/local-seo.jpeg",
    },
    {
      name: "On-Page SEO",
      description: "Optimize your website's content and HTML for better rankings.",
      image: "/on-page-seo.png",
    },
    {
      name: "Off-Page SEO",
      description: "Build quality backlinks to enhance domain authority.",
      image: "/offPage.jpg",
    },
    {
      name: "Technical SEO",
      description: "Improve site speed, mobile optimization, and indexability.",
      image: "/technical-seo.png",
    },
  ];

  return (
    <div className="px-4 py-12 mt-5 bg-gray-50 lg:px-16">
      <Head>
        <title>Services | Rental Service</title>
        <meta
          name="description"
          content="Explore our web and SEO services including website development, hosting, SEO optimization, and more."
        />
      </Head>

      {/* Header Section */}
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 md:text-4xl">
        Our Services
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setActiveTab('web')}
          className={`px-6 py-2 text-lg font-medium ${
            activeTab === 'web'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } rounded-l-lg transition-colors duration-300`}
        >
          Web Services
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={`px-6 py-2 text-lg font-medium ${
            activeTab === 'seo'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } rounded-r-lg transition-colors duration-300`}
        >
          SEO Services
        </button>
      </div>

      {/* Web Services Content */}
      {activeTab === 'web' && (
        <div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {webServices.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-white border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-full h-48 relative">
                  <Image
                    src={service.image}
                    alt={service.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-800">{service.name}</h2>
                <p className="mt-2 text-sm text-gray-600 text-center">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
              Get in Touch
            </h2>
            <p className="mt-4 text-gray-600">
              Have any questions or want to get started? Contact us now!
            </p>
            <div className="mt-8 space-y-4">
              <a
                href="mailto:webservices@example.com"
                className="block px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-700 sm:inline-block"
              >
                📧 Email: webservices@example.com
              </a>
              <p className="text-lg text-gray-600">
                📞 Or call/message us at:{" "}
                <span className="font-semibold text-gray-800">
                  +123-456-7890
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SEO Services Content */}
      {activeTab === 'seo' && (
        <div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {seoServices.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-white border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-full h-48 relative">
                  <Image
                    src={service.image}
                    alt={service.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-800">{service.name}</h2>
                <p className="mt-2 text-sm text-gray-600 text-center">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
              Get in Touch
            </h2>
            <p className="mt-4 text-gray-600">
              Have any questions or want to get started? Contact us now!
            </p>
            <div className="mt-8 space-y-4">
              <a
                href="mailto:seoservices@example.com"
                className="block px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-700 sm:inline-block"
              >
                📧 Email: seoservices@example.com
              </a>
              <p className="text-lg text-gray-600">
                📞 Or call/message us at:{" "}
                <span className="font-semibold text-gray-800">
                  +123-456-7890
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// import Head from 'next/head';
// import Image from 'next/image';

// export default function WebServices() {
//     const webServices = [
//         {
//             name: "Website Development",
//             description: "Get a responsive and modern website tailored to your business needs.",
//             image: "/web.jpeg",
//         },
//         {
//             name: "Web Hosting",
//             description: "Reliable and scalable web hosting solutions to keep your site running smoothly.",
//             image: "/web-hosting.jpeg",
//         },
//         {
//             name: "Web App Development",
//             description: "Develop powerful web applications to enhance your digital presence.",
//             image: "/web-app-development.jpeg",
//         },
//         {
//             name: "E-commerce Solutions",
//             description: "Launch your online store with a secure and user-friendly platform.",
//             image: "/ecommerce-solutions.jpg",
//         },
//         {
//             name: "SEO Optimization",
//             description: "Improve your website's visibility with our expert SEO services.",
//             image: "/sepopt.png",
//         },
//         {
//             name: "Content Management Systems",
//             description: "Easily manage your website content with our CMS solutions.",
//             image: "/cms.jfif",
//         },
//     ];

//     return (
//         <div className="px-4 py-12 mt-5 bg-gray-50 lg:px-16">
//             <Head>
//                 <title>Web Services | Rental Service</title>
//                 <meta
//                     name="description"
//                     content="Explore our web services including website development, hosting, web app development, and more."
//                 />
//             </Head>

//             {/* Header Section */}
//             <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 md:text-4xl">
//                 Our Web Services
//             </h1>

//             {/* Services Grid */}
//             <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//                 {webServices.map((service, index) => (
//                     <div
//                         key={index}
//                         className="flex flex-col items-center p-6 bg-white border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
//                     >
//                         <div className="w-full h-48 relative">
//                             <Image
//                                 src={service.image}
//                                 alt={service.name}
//                                 layout="fill"
//                                 objectFit="cover"
//                                 className="rounded-t-lg"
//                             />
//                         </div>
//                         <h2 className="mt-4 text-xl font-semibold text-gray-800">{service.name}</h2>
//                         <p className="mt-2 text-sm text-gray-600 text-center">
//                             {service.description}
//                         </p>
//                     </div>
//                 ))}
//             </div>

//             {/* Contact Section */}
//             <div className="mt-16 text-center">
//                 <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
//                     Get in Touch
//                 </h2>
//                 <p className="mt-4 text-gray-600">
//                     Have any questions or want to get started? Contact us now!
//                 </p>
//                 <div className="mt-8 space-y-4">
//                     <a
//                         href="mailto:webservices@example.com"
//                         className="block px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-700 sm:inline-block"
//                     >
//                         📧 Email: webservices@example.com
//                     </a>
//                     <p className="text-lg text-gray-600">
//                         📞 Or call/message us at:{" "}
//                         <span className="font-semibold text-gray-800">
//                             +123-456-7890
//                         </span>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }
