import React from "react";
import {FaMapMarkerAlt} from "react-icons/fa";
import {FaPhoneAlt} from "react-icons/fa";
import {FaEnvelope} from "react-icons/fa";
import {FaClock} from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";



const Footer = () => {
    return (
    <footer className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white py-8">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div>
                      <h1 className="font-bold mb-4">Latest Fitness</h1>
          <p className="text-gray-600 dark:text-gray-300">Elevating fitness in Hawassa with top-tier equipment and exceptional service.</p>
                      <div className="flex space-x-4 mt-6">
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <FaFacebookF size={20} className="hover:text-orange-600" />
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
    <FaInstagram size={20} className="hover:text-orange-600" />
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
    <FaTwitter size={20} className="hover:text-orange-600" />
  </a>
  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
    <FaYoutube size={20} className="hover:text-orange-600" />
  </a>
</div>

                </div>

                  <div>
                    <h1 className="font-bold mb-4">Quick Links</h1>
                    <a href="#home" className="block hover:underline">HOME</a>
                    <a href="#about" className="block hover:underline">About Us</a>
                    <a href="#services" className="block hover:underline">Service</a>
                    <a href="#team" className="block hover:underline">Our Team</a>
                    <a href="#testimonials" className="block hover:underline">Testimonials</a>
                    <a href="#contact" className="block hover:underline">Contact</a>
                </div>
                    <div>
                    <h1 className="font-bold mb-4">Programs</h1>
                    <a href="#home" className="block hover:underline">Personal Training</a>
                    <a href="#about" className="block hover:underline">Group Class</a>
                    <a href="#services" className="block hover:underline">Nutrition Coaching</a>
                    <a href="#team" className="block hover:underline">Strength Training</a>
                    <a href="#testimonials" className="block hover:underline">Cardio Programs</a>
                    <a href="#contact" className="block hover:underline">Recovery & Wellness</a>
                </div>
                    <div>
  <h1 className="font-bold mb-4">Contact Us</h1>

  <div className="flex items-start gap-4 mt-4">
    <div className="bg-red-600 p-3 rounded-full">
      <FaMapMarkerAlt size={10} />
    </div>
    <div>
      <h4 className="font-bold">Location</h4>
      <p>Hawassa city 05, main road<br />Hawassa, Ethiopia</p>
    </div>
  </div>

  <div className="flex items-start gap-4 mt-4">
    <div className="bg-orange-600 p-3 rounded-full">
      <FaPhoneAlt size={10} />
    </div>
    <div>
      <h4 className="font-bold">Phone</h4>
      <p>0722072324</p>
    </div>
  </div>

  <div className="flex items-start gap-4 mt-4">
    <div className="bg-red-600 p-3 rounded-full">
      <FaEnvelope size={10} />
    </div>
    <div>
      <h4 className="font-bold">Email</h4>
      <p>oKtLb@example.com</p>
    </div>
  </div>

  <div className="flex items-start gap-4 mt-4">
    <div className="bg-red-500 p-3 rounded-full">
      <FaClock size={10} />
    </div>
    <div>
      <h4 className="font-bold">Hours</h4>
      <p>Gym: 6:00 AM - 10:00 PM Daily<br />Spa: 10:00 AM - 8:00 PM Daily</p>
    </div>
  </div>
</div>

            </div>
        </footer>
    );
}

export default Footer