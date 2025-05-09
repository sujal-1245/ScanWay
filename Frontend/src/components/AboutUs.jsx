import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/get-started');
  };

  return (
    <section id="about-us" className="bg-gradient-to-r from-[#121212] to-[#2C3E50] py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold text-white mb-8"
        >
          About Our Company
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl text-white mb-8"
        >
          We are a leading tech company focused on providing innovative solutions to make the world a better place, integrating cutting-edge technology with real-world application.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="explore-button-container"
        >
          <ExploreButton onClick={handleGetStartedClick} />
        </motion.div>
      </div>
    </section>
  );
};

const ExploreButton = ({ onClick }) => (
  <button
    className="relative px-8 py-4 rounded-full bg-gradient-to-r from-[#F39C12] to-[#2C3E50] text-white font-semibold text-lg hover:scale-105 transition-all shadow-lg backdrop-blur-lg"
    onClick={onClick}
  >
    <span className="inline-flex items-center justify-center mr-2">
      <svg
        viewBox="0 0 14 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
      >
        <path
          d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
          fill="currentColor"
        />
      </svg>
    </span>
    Explore Now
  </button>
);

export default AboutUs;
