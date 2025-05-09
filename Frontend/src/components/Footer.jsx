import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-zinc-800 to-zinc-900 py-12 px-6 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto text-white text-center">
        <div className="mb-8">
          <h2 className="text-4xl font-bold">ScanWay</h2>
        </div>
        <div className="mb-8 space-x-6">
          <Link to="#hero" className="text-lg hover:text-[#F39C12] transition-all">Home</Link>
          <Link to="#about-us" className="text-lg hover:text-[#F39C12] transition-all">About Us</Link>
          <Link to="#faq" className="text-lg hover:text-[#F39C12] transition-all">FAQ</Link>
          <Link to="/login" className="text-lg hover:text-[#F39C12] transition-all">Login</Link>
          <Link to="/signup" className="text-lg hover:text-[#F39C12] transition-all">Sign Up</Link>
        </div>
        <div className="mb-8 flex ml-50px space-x-6 justify-center">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="text-xl hover:text-[#F39C12] transition-all" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-xl hover:text-[#F39C12] transition-all" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-xl hover:text-[#F39C12] transition-all" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn className="text-xl hover:text-[#F39C12] transition-all" />
          </a>
        </div>
        <div>
          <p className="text-sm opacity-60">&copy; 2024 ScanWay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
