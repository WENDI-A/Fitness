import React from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
    {
        id: 0,
        name: "Yonas Tadesse",
        role: "Member since 2023",
        description:
            "I've been a member of many gyms over the years, but Latest Fitness stands out for their attention to detail and personalized approach. The facilities are always clean and the atmosphere is motivating.",
    },
    {
        id: 1,
        name: "Kaleb Adem",
        role: "Body Transformation",
        description:
            "Latest Fitness completely transformed my approach to working out. The trainers are knowledgeable and supportive, and the community keeps me motivated. I've lost 30 pounds and gained so much confidence!",
    },
    {
        id: 2,
        name: "Abenezer Mengistu",
        role: "Athlete",
        description:
            "As someone who was intimidated by gyms, I can't believe how comfortable I feel at Latest Fitness. The staff is friendly, the equipment is top-notch, and the results speak for themselves.",
    },
    {
        id: 3,
        name: "Tigist Hailu",
        role: "Yoga Enthusiast",
        description:
            "The nutrition coaching combined with personal training has been a game-changer for me. I've not only reached my fitness goals but also learned sustainable habits that I can maintain long-term.",
    },
    {
        id: 4,
        name: "Sara Mohamed",
        role: "Cardio Lover",
        description: "The variety of classes offered is amazing! I never get bored with my workouts anymore. Highly recommend for anyone looking to switch up their routine."
    },
    {
        id: 5,
        name: "David Kebede",
        role: "Strength Trainer",
        description: "Personal training here is next level. My trainer understood my specific goals and pushed me beyond what I thought was possible."
    }
];

const Testimonials = () => {
    return (
        <section className="relative py-24 bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="inline-block py-1 px-3 rounded-full bg-red-600/10 border border-red-500/20 text-red-600 dark:text-red-500 font-bold text-sm tracking-wider mb-4"
                    >
                        REAL STORIES, REAL RESULTS
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-extrabold mb-6"
                    >
                        What Our Members Say <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
                            About Their Journey
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-lg text-gray-600 dark:text-gray-400"
                    >
                        Join hundreds of satisfied members who have transformed their lives with our expert guidance and world-class facilities.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <Swiper
                        modules={[Navigation, Autoplay, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true, dynamicBullets: true }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        loop={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        className="pb-12 px-4 !overflow-visible"
                    >
                        {testimonials.map((item) => (
                            <SwiperSlide key={item.id} className="h-auto">
                                <div
                                    className="bg-white dark:bg-gray-900/60 backdrop-blur-lg border border-gray-100 dark:border-gray-800 p-8 rounded-2xl shadow-xl dark:shadow-none relative group h-full flex flex-col"
                                >
                                    <div className="absolute top-6 right-8 text-6xl text-gray-100 dark:text-gray-800 font-serif opacity-50 group-hover:text-red-50 dark:group-hover:text-red-900/20 transition-colors pointer-events-none">
                                        <FaQuoteLeft />
                                    </div>

                                    <div className="flex items-center gap-4 mb-6 relative z-10">
                                        <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg shrink-0">
                                            {item.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.name}</h3>
                                            <p className="text-sm text-red-500 dark:text-red-400 font-medium">{item.role}</p>
                                        </div>
                                    </div>

                                    <div className="flex text-yellow-400 mb-4 text-sm">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} />
                                        ))}
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic relative z-10 flex-grow">
                                        "{item.description}"
                                    </p>

                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <button
                        onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })}
                        className="bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-lg px-8 py-3 rounded-full hover:shadow-lg hover:shadow-red-600/30 transition-all transform hover:scale-105"
                    >
                        Start Your Transformation
                    </button>
                </motion.div>
            </div>

            {/* Custom Styles for Swiper Pagination/Navigation to match theme */}
            <style>{`
            .swiper-pagination-bullet-active {
                background-color: #dc2626 !important;
            }
            .swiper-button-next, .swiper-button-prev {
                color: #dc2626 !important;
                background-color: white;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                transition: all 0.3s ease;
                z-index: 50; /* Ensure high z-index */
            }
            .dark .swiper-button-next, .dark .swiper-button-prev {
                background-color: #1f2937;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
            }
            .swiper-button-next:hover, .swiper-button-prev:hover {
                background-color: #dc2626 !important;
                color: white !important;
                transform: scale(1.1);
            }
            .swiper-button-next::after, .swiper-button-prev::after {
                font-size: 1.2rem !important;
                font-weight: bold;
            }
            /* Position arrows outside */
            .swiper-button-prev {
                left: 0px !important;
            }
            .swiper-button-next {
                right: 0px !important;
            }
            @media (min-width: 1024px) {
                .swiper-button-prev {
                    left: -60px !important;
                }
                .swiper-button-next {
                    right: -60px !important;
                }
            }
        `}</style>
        </section>
    );
};

export default Testimonials;