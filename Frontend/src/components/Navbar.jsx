import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";  // Importing ScrollLink from react-scroll

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all ${
        scrolled ? "bg-black/70 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-3xl text-white font-bold">ScanWay</h1>

        <div className="flex items-center space-x-6">
          {/* Home, Login, and Signup links remain unchanged */}
          <a
            href="/"
            className="text-xl font-bold tracking-wide text-white hover:text-amber-500 transition-colors"
          >
            Home
          </a>

          {/* About link updated with react-scroll */}
          <ScrollLink
            to="about-us"  // Scrolls to the section with id="about-us"
            smooth={true}  // Smooth scrolling
            className="text-white hover:text-amber-500 transition-colors"
          >
            About
          </ScrollLink>

          {/* FAQ link updated with react-scroll */}
          <ScrollLink
            to="faq"  // Scrolls to the section with id="faq"
            smooth={true}  // Smooth scrolling
            className="text-white hover:text-amber-500 transition-colors"
          >
            FAQ
          </ScrollLink>

          <a
            href="/login"
            className="text-white hover:text-amber-500 transition-colors"
          >
            Login
          </a>

          <a
            href="/signup"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-lg transition"
          >
            Sign Up
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
