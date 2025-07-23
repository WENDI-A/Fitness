import React from "react";
import {FaMapMarkerAlt} from "react-icons/fa";
import {FaPhoneAlt} from "react-icons/fa";
import {FaEnvelope} from "react-icons/fa";
import {FaClock} from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";



const Footer = () => {
    return (
        <footer className="bg-black text-white py-4 min-h-screen">
            <div className="flex justify-between  flex-row gap-4 mt-12">
                <div>
                    <h1 className="ml-4 font-bold mb-4">Latest Fitness</h1>
                    <p className="ml-4">Elevating fitness in Hawassa with top-tier <br/>equipment and exceptional service.</p>
                    <div className="flex space-x-4 mt-6 ml-4">
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <FaFacebookF size={20} className="text-white hover:text-orange-600" />
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
    <FaInstagram size={20} className="text-white hover:text-orange-600" />
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
    <FaTwitter size={20} className="text-white hover:text-orange-600" />
  </a>
  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
    <FaYoutube size={20} className="text-white hover:text-orange-600" />
  </a>
</div>

                </div>

                  <div>
                    <h1 className="font-bold mb-4">Quick Links</h1>
                    <a href="#home" className="block text-white hover:underline">HOME</a>
                    <a href="#about" className="block text-white hover:underline">About Us</a>
                    <a href="#services" className="block text-white hover:underline">Service</a>
                    <a href="#team" className="block text-white hover:underline">Our Team</a>
                    <a href="#testimonials" className="block text-white hover:underline">Testimonials</a>
                    <a href="#contact" className="block text-white hover:underline">Contact</a>
                </div>
                    <div>
                    <h1 className="font-bold mb-4">Quick Links</h1>
                    <a href="#home" className="block text-white hover:underline">Personal Trainging</a>
                    <a href="#about" className="block text-white hover:underline">Group Class</a>
                    <a href="#services" className="block text-white hover:underline">Nutrition Coaching </a>
                    <a href="#team" className="block text-white hover:underline">Strength Training</a>
                    <a href="#testimonials" className="block text-white hover:underline">Cardio Programs</a>
                    <a href="#contact" className="block text-white hover:underline">Recovery & Welleness</a>
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