import React, { useState } from 'react';
import SimpleThemeToggle from '../components/SimpleThemeToggle';

const Header = ({ user, onLogin, onLogout, onGoToDashboard }) => {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="bg-black text-white fixed top-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-red-500">FitnessPro</h1>
          </div>

          <nav className="hidden md:flex items-center gap-x-8">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="relative group text-white">
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-red-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}
            <SimpleThemeToggle />
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-white">Welcome, {user.first_name}!</span>
                <button onClick={onGoToDashboard} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">Dashboard</button>
                <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition">Logout</button>
              </div>
            ) : (
              <button onClick={onLogin} className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition">Login</button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <SimpleThemeToggle />
            <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="p-2 rounded-md bg-white/10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-black/95 border-t border-gray-800">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block py-2 text-white font-medium">
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-gray-800">
              {user ? (
                <div className="space-y-2">
                  <div className="text-white">Welcome, {user.first_name}!</div>
                  <button onClick={() => { setOpen(false); onGoToDashboard(); }} className="w-full bg-blue-500 text-white px-4 py-2 rounded">Dashboard</button>
                  <button onClick={() => { setOpen(false); onLogout(); }} className="w-full bg-red-500 text-white px-4 py-2 rounded">Logout</button>
                </div>
              ) : (
                <button onClick={() => { setOpen(false); onLogin(); }} className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded">Login</button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
