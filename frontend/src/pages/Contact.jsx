import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { useState } from 'react';
import { submitContactForm } from '../services/api/contactApi';

const Contact = () => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      message: ''
   });
   const [loading, setLoading] = useState(false);
   // const [error, setError] = useState('');
   // const [success, setSuccess] = useState(false);

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      // setError('');
      // setSuccess(false);

      try {
         const response = await submitContactForm(formData);
         // setSuccess(true);
         setFormData({ name: '', email: '', phone: '', message: '' });
         alert(response.message || "Thank you for your message! We'll get back to you soon.");
      } catch (err) {
         // setError(err.error || "Failed to send message. Please try again.");
         alert(err.error || "Failed to send message. Please try again.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="w-full bg-white text-gray-800 py-20 px-4 dark:bg-gray-900 dark:text-white transition-colors duration-300">
         <div className="max-w-7xl mx-auto">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center mb-16"
            >
               <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Get In <span className="text-red-600">Touch</span></h1>
               <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Have questions about our services or ready to start your fitness journey? Reach out to us today.
               </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
               {/* Contact Info */}
               <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="w-full lg:w-1/2 space-y-8"
               >
                  <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                     <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">Contact Information</h2>

                     <div className="space-y-6">
                        <div className="flex items-start gap-4 group">
                           <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform duration-300">
                              <FaMapMarkerAlt size={24} />
                           </div>
                           <div>
                              <h4 className="font-bold text-lg">Location</h4>
                              <p className="text-gray-600 dark:text-gray-300">Hawassa city 05, main road<br />Hawassa, Ethiopia</p>
                           </div>
                        </div>

                        <div className="flex items-start gap-4 group">
                           <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform duration-300">
                              <FaPhoneAlt size={24} />
                           </div>
                           <div>
                              <h4 className="font-bold text-lg">Phone</h4>
                              <p className="text-gray-600 dark:text-gray-300">+251 97 906 2454</p>
                           </div>
                        </div>

                        <div className="flex items-start gap-4 group">
                           <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform duration-300">
                              <FaEnvelope size={24} />
                           </div>
                           <div>
                              <h4 className="font-bold text-lg">Email</h4>
                              <p className="text-gray-600 dark:text-gray-300">info@fitnesspro.com</p>
                           </div>
                        </div>

                        <div className="flex items-start gap-4 group">
                           <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform duration-300">
                              <FaClock size={24} />
                           </div>
                           <div>
                              <h4 className="font-bold text-lg">Hours</h4>
                              <div className="text-gray-600 dark:text-gray-300">
                                 <p>Gym: 6:00 AM - 10:00 PM Daily</p>
                                 <p>Spa: 10:00 AM - 8:00 PM Daily</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>

               {/* Contact Form */}
               <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full lg:w-1/2"
               >
                  <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                     <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

                     <div className="space-y-6">
                        <div>
                           <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">Name</label>
                           <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                              placeholder="Your Name"
                              required
                              disabled={loading}
                           />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div>
                              <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">Email</label>
                              <input
                                 type="email"
                                 name="email"
                                 value={formData.email}
                                 onChange={handleChange}
                                 className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                                 placeholder="your@email.com"
                                 required
                                 disabled={loading}
                              />
                           </div>
                           <div>
                              <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">Phone</label>
                              <input
                                 type="tel"
                                 name="phone"
                                 value={formData.phone}
                                 onChange={handleChange}
                                 className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all"
                                 placeholder="0911..."
                                 required
                                 disabled={loading}
                              />
                           </div>
                        </div>

                        <div>
                           <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">Message</label>
                           <textarea
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all resize-none"
                              rows="4"
                              placeholder="How can we help you?"
                              required
                              disabled={loading}
                           />
                        </div>

                        <button
                           type="submit"
                           disabled={loading}
                           className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-red-600/30 transform transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                           {loading ? 'Sending...' : 'Send Message'}
                           <FaPaperPlane className="w-4 h-4" />
                        </button>
                     </div>
                  </form>
               </motion.div>
            </div>
         </div>
      </div>
   );
};

export default Contact;