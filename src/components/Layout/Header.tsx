import React, { useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <header className="bg-white/70 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 relative flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`transition-colors duration-300 font-medium ${
              isActive('/') ? 'text-[#b9a779]' : 'text-[#054239] hover:text-[#b9a779]'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`transition-colors duration-300 font-medium ${
              isActive('/products') ? 'text-[#b9a779]' : 'text-[#054239] hover:text-[#b9a779]'
            }`}
          >
            Products
          </Link>
          <Link 
            to="/about" 
            className={`transition-colors duration-300 font-medium ${
              isActive('/about') ? 'text-[#b9a779]' : 'text-[#054239] hover:text-[#b9a779]'
            }`}
          >
            About Us
          </Link>
          <Link 
            to="/blog" 
            className={`transition-colors duration-300 font-medium ${
              isActive('/blog') ? 'text-[#b9a779]' : 'text-[#054239] hover:text-[#b9a779]'
            }`}
          >
            Blog
          </Link>
          <Link 
            to="/contact" 
            className={`transition-colors duration-300 font-medium ${
              isActive('/contact') ? 'text-[#b9a779]' : 'text-[#054239] hover:text-[#b9a779]'
            }`}
          >
            Contact
          </Link>
          <button className="flex items-center space-x-1 text-[#b9a779] hover:text-[#054239] transition-colors duration-300">
            <Download size={16} />
            <span className="text-sm">ISO Certificate</span>
          </button>
        </nav>

        {/* Centered Big Logo */}
        <Link 
          to="/" 
          className="absolute left-1/2 -translate-x-1/2 top-0 md:top-4 flex flex-col items-center z-40"
        >
          <img 
            src="https://i.postimg.cc/0Q8pxwTM/logo.png" 
            alt="Al-Shamali Logo" 
            className="h-32 w-32 md:h-40 md:w-40 object-contain drop-shadow-xl"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-[#054239] mt-2">Al-Shamaly</h1>
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t">
          <nav className="flex flex-col space-y-4 pt-4 px-4">
            <Link 
              to="/" 
              className={`transition-colors duration-300 ${
                isActive('/') ? 'text-[#b9a779]' : 'text-[#054239] hover:text-[#b9a779]'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`transition-colors duration-300 ${
                isActive('/products') ? 'text-[#b9a779]' : 'text-[#054239] hover:text-[#b9a779]'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors duration-300 ${
                isActive('/about') ? 'text-[#b9a779]' : 'text-[#054239] hover:text-[#b9a779]'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/blog" 
              className={`transition-colors duration-300 ${
                isActive('/blog') ? 'text-[#b9a779]' : 'text-[#054239] hover:text-[#b9a779]'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className={`transition-colors duration-300 ${
                isActive('/contact') ? 'text-[#b9a779]' : 'text-[#054239] hover:text-[#b9a779]'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <button className="flex items-center space-x-1 text-[#b9a779] hover:text-[#054239] transition-colors duration-300">
              <Download size={16} />
              <span>ISO Certificate</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
