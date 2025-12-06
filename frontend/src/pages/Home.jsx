import gym from "../assets/gym.jpeg";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { FaArrowRight } from "react-icons/fa";

const Home = ({ onJoinNow }) => {
  return (
    <div className="relative overflow-hidden">
      <div
        className="min-h-screen flex items-center relative bg-cover bg-center bg-fixed bg-no-repeat"
        style={{ backgroundImage: `url(${gym})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-red-600/20 border border-red-500/30 text-red-500 font-bold text-sm tracking-wider mb-6 backdrop-blur-sm">
                #1 FITNESS DESTINATION IN HAWASSA
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white mb-6">
                TRANSFORM YOUR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  BODY & MIND
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                Experience a world-class fitness journey with state-of-the-art equipment,
                expert personal training, and a supportive community dedicated to your success.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <button
                onClick={onJoinNow}
                className="group flex items-center justify-center gap-3 bg-red-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg shadow-red-600/30 hover:bg-red-700 hover:scale-105 transition-all duration-300"
              >
                Start Your Journey
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div>
                <h3 className="text-3xl font-bold text-white">6AM-10PM</h3>
                <p className="text-gray-400 text-sm uppercase tracking-wider mt-1">Daily Access</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">15+</h3>
                <p className="text-gray-400 text-sm uppercase tracking-wider mt-1">Trainers</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">500+</h3>
                <p className="text-gray-400 text-sm uppercase tracking-wider mt-1">Members</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
