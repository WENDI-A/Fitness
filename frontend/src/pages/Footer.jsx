import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <h1 className="text-2xl font-extrabold tracking-tight">
              Fitness<span className="text-red-600">Pro</span>
            </h1>
            <p className="text-gray-400 leading-relaxed">
              Elevating fitness in Hawassa with top-tier equipment, expert trainers, and exceptional service. Join us to transform your life.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300">
                <FaFacebookF size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300">
                <FaInstagram size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300">
                <FaTwitter size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-red-500 transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-red-500 transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-red-500 transition-colors">Services</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-red-500 transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-red-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2 inline-block">Programs</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">Personal Training</li>
              <li className="text-gray-400">Group Classes</li>
              <li className="text-gray-400">Nutrition Coaching</li>
              <li className="text-gray-400">Strength Training</li>
              <li className="text-gray-400">Cardio Programs</li>
              <li className="text-gray-400">Recovery & Wellness</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2 inline-block">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-red-600 mt-1 flex-shrink-0" />
                <p className="text-gray-400 text-sm">Hawassa city 05, main road<br />Hawassa, Ethiopia</p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-red-600 flex-shrink-0" />
                <p className="text-gray-400 text-sm">+251 97 906 2454</p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-red-600 flex-shrink-0" />
                <p className="text-gray-400 text-sm">info@fitnesspro.com</p>
              </div>
              <div className="flex items-start gap-3">
                <FaClock className="text-red-600 mt-1 flex-shrink-0" />
                <p className="text-gray-400 text-sm">Daily: 6:00 AM - 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} FitnessPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;