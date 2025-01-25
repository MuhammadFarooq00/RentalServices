import Head from 'next/head';
import Image from 'next/image';

export default function SeoServices() {
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
        <div className="px-6 py-16 mt-5 bg-gray-50 lg:px-12">
            <Head>
                <title>SEO Services | Rental Service</title>
                <meta
                    name="description"
                    content="Explore our SEO services including keyword research, content optimization, and local SEO."
                />
            </Head>

            {/* Header Section */}
            <h1 className="mb-6 text-4xl font-bold text-center text-black">Our SEO Services</h1>

            {/* Services Grid */}
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {seoServices.map((service, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center p-6 bg-white border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
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
                        <h2 className="mt-4 text-2xl font-semibold text-black">{service.name}</h2>
                        <p className="mt-2 text-gray-600 text-center">{service.description}</p>
                    </div>
                ))}
            </div>

            {/* Contact Us Section */}
            <div className="mt-16 text-center">
                <h2 className="mb-4 text-3xl font-bold text-black">Get in Touch</h2>
                <p className="mb-6 text-gray-600">
                    Have questions about our SEO services? Contact us today, and we’ll get back to you promptly!
                </p>
                <div className="space-y-4">
                    <a
                        href="mailto:ilyas.sollutions@gmail.com"
                        className="block text-lg text-blue-600 hover:underline"
                    >
                        📧 Send us an email: ilyas.sollutions@gmail.com
                    </a>
                    <a
                        href="tel:+1234567890"
                        className="block text-lg text-blue-600 hover:underline"
                    >
                        📞 Call us: +123 456 7890
                    </a>
                </div>
            </div>
        </div>
    );
}
