import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="bg-[#121212] text-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-screen px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-12 max-w-3xl shadow-2xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Welcome to <span className="text-[#00ffb3]">ScanWay</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Predict pavement condition index using advanced ML techniques. Get insights and make smarter maintenance decisions.
          </p>
          <Link to="/get-started">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-[#00ffb3] text-black font-semibold transition-all shadow-xl hover:shadow-2xl"
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>

        {/* Animated Background Circles */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.1, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-96 h-96 rounded-full bg-[#00ffb3]/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-72 h-72 rounded-full bg-[#00ffb3]/20 blur-3xl -top-36 -right-40"
        />
      </section>

      {/* About Section */}
      <section className="px-6 py-20 max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-semibold text-white mb-8"
        >
          About ScanWay
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto"
        >
          ScanWay is a smart pavement monitoring system that uses ML to analyze road surface conditions. Our solution helps municipalities, engineers, and transport authorities make cost-effective and timely maintenance decisions.
        </motion.p>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} ScanWay. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
