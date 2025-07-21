const Header = () => {
  return (
    <div className="bg-black text-white fixed top-0 w-full z-50 flex justify-around py-4 px-6">
      <div className="flex ml-auto gap-x-16">
        {[
          { href: "#home", label: "Home" },
          { href: "#about", label: "About" },
          { href: "#services", label: "Service" },
          { href: "#testimonials", label: "Testimonials" },
          { href: "#contact", label: "Contact" },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="relative group text-white"
          >
            {link.label}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-red-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Header;
