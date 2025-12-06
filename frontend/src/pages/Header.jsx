import React, { useState, useEffect } from 'react';
import SimpleThemeToggle from '../components/SimpleThemeToggle';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';

const Header = ({ user, onLogin, onLogout, onGoToDashboard }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className={`text-2xl font-extrabold tracking-tight ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'
              }`}>
              Fitness<span className="text-red-600">Pro</span>
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-x-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative group font-medium text-sm uppercase tracking-wide transition-colors ${scrolled ? 'text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400' : 'text-white/90 hover:text-white'
                  }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>

            <SimpleThemeToggle />

            {user ? (
              <div className="flex items-center gap-4 ml-2">
                <div className="flex items-center gap-2">
                  <FaUserCircle className={`w-5 h-5 ${scrolled ? 'text-gray-600 dark:text-gray-300' : 'text-white/80'}`} />
                  <span className={`text-sm font-medium ${scrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
                    {user.first_name}
                  </span>
                </div>
                <button
                  onClick={onGoToDashboard}
                  className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all transform hover:scale-105 shadow-md"
                >
                  Dashboard
                </button>
                <button
                  onClick={onLogout}
                  className="bg-red-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-red-700 transition-all transform hover:scale-105 shadow-md shadow-red-600/20"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-red-600/30 transition-all transform hover:scale-105"
              >
                Join Now
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <SimpleThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className={`p-2 rounded-full transition-colors ${scrolled ? 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-white hover:bg-white/10'
                }`}
            >
              {open ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 px-4 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                {user ? (
                  <div className="space-y-3 px-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 font-bold text-lg">
                        {user.first_name[0]}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
                        <p className="font-bold text-gray-900 dark:text-white">{user.first_name} {user.last_name}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { setOpen(false); onGoToDashboard(); }}
                      className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
                    >
                      Go to Dashboard
                    </button>
                    <button
                      onClick={() => { setOpen(false); onLogout(); }}
                      className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <div className="px-4">
                    <button
                      onClick={() => { setOpen(false); onLogin(); }}
                      className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-3 rounded-xl font-bold shadow-lg shadow-red-500/30 active:scale-95 transition-transform"
                    >
                      Login / Register
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
