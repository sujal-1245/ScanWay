import React from 'react';
import { FaUsers, FaFlag, FaHandshake } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AboutSection = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/get-started');
  };

  return (
<section className="py-16 bg-black dark:bg-zinc-900 transition-all duration-300">
  <div className="max-w-7xl mx-auto px-4">
  <h2 className="text-5xl font-extrabold text-white tracking-tight text-center mb-12 font-[Space_Grotesk]">
  About Us
</h2>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="transform transition-all duration-500 hover:scale-105 p-8 rounded-lg bg-white text-black shadow-xl backdrop-blur-lg bg-opacity-30 hover:bg-opacity-50">
        <FaUsers className="text-5xl mb-6 mx-auto" />
        <h3 className="text-2xl font-bold mb-4 text-center">Our Team</h3>
        <p className="text-lg text-center">
          We are a dedicated team of professionals committed to delivering top-notch services to our clients.
        </p>
      </div>

      <div className="transform transition-all duration-500 hover:scale-105 p-8 rounded-lg bg-white text-black shadow-xl backdrop-blur-lg bg-opacity-30 hover:bg-opacity-50">
        <FaFlag className="text-5xl mb-6 mx-auto" />
        <h3 className="text-2xl font-bold mb-4 text-center">Our Mission</h3>
        <p className="text-lg text-center">
          Our mission is to create seamless and innovative solutions that bring value and empower users globally.
        </p>
      </div>

      <div className="transform transition-all duration-500 hover:scale-105 p-8 rounded-lg bg-white text-black shadow-xl backdrop-blur-lg bg-opacity-30 hover:bg-opacity-50">
        <FaHandshake className="text-5xl mb-6 mx-auto" />
        <h3 className="text-2xl font-bold mb-4 text-center">Our Values</h3>
        <p className="text-lg text-center">
          Transparency, integrity, and collaboration are the core values that drive us forward every day.
        </p>
      </div>
    </div>

    <div className="text-center mt-12">
      <button
        onClick={handleGetStartedClick}
        className="relative inline-flex items-center justify-center px-6 py-3 mt-6 bg-white text-black font-semibold rounded-full shadow-md transform transition-all duration-300 hover:bg-gray-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
      >
        <span className="mr-3">Explore Now</span>
        <svg
          className="w-6 h-6 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  </div>
</section>

  );
};

export default AboutSection;
