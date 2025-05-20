/* This code snippet is a TypeScript React component for a website header. Here's a breakdown of what
the code is doing: */
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Home } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-green-500 mr-2">
              <Home size={24} />
            </div>
            <span className="font-bold text-xl text-green-500">BlinkitClone</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-lg mx-8 relative"
          >
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-gray-50"
              />
            </div>
            <button 
              type="submit"
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Search
            </button>
          </form>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/cart" 
              className="relative flex items-center text-gray-700 hover:text-green-500 transition"
            >
              <ShoppingCart size={24} />
              {cart.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <Link to="/cart" className="relative mr-4">
              <ShoppingCart size={24} />
              {cart.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <form 
          onSubmit={handleSearch}
          className="md:hidden py-3"
        >
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search for items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 bg-gray-50"
            />
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <Link 
              to="/" 
              className="block py-2 text-gray-700 hover:text-green-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/cart" 
              className="block py-2 text-gray-700 hover:text-green-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;