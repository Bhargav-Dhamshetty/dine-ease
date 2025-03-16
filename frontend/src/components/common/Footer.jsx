import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-yellow-400">DineEase</h2>
          <p className="text-gray-400 mt-2">
            Experience the best food from top restaurants. Order, enjoy, and satisfy your cravings with ease!
          </p>
        </div>

        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-yellow-400">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li><Link to="/" className="text-gray-300 hover:text-yellow-400 transition">Home</Link></li>
            <li><Link to="/about" className="text-gray-300 hover:text-yellow-400 transition">About Us</Link></li>
            <li><Link to="/popular" className="text-gray-300 hover:text-yellow-400 transition">Popular Dishes</Link></li>
            <li><Link to="/contact" className="text-gray-300 hover:text-yellow-400 transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-yellow-400">Connect With Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-gray-300 hover:text-yellow-400 text-2xl transition" />
            </a>
            <a href="https://linkedin.com/company/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-gray-300 hover:text-yellow-400 text-2xl transition" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-gray-300 hover:text-yellow-400 text-2xl transition" />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-gray-300 hover:text-yellow-400 text-2xl transition" />
            </a>
          </div>
          <p className="text-gray-400 mt-2">📧 Email: support@dineease.com</p>
          <p className="text-gray-400 mt-2">📞 Contact: 7569696610</p>
        </div>
      </div>

      <div className="mt-8 text-center border-t border-gray-700 pt-4">
        <p className="text-gray-400 text-sm">&copy; 2025 DineEase. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;