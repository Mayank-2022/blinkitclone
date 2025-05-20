import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Home, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-10 pb-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <div className="text-green-500 mr-2">
                <Home size={24} />
              </div>
              <span className="font-bold text-xl text-green-500">BlinkitClone</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde repellat architecto commodi quisquam. Quibusdam nobis consequatur repellat harum mollitia amet sunt debitis ducimus soluta vero? Beatae reiciendis doloremque veritatis hic.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-green-500">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-500">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-500">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/fruits-vegetables" className="text-gray-600 hover:text-green-500">
                  Fruits & Vegetables
                </Link>
              </li>
              <li>
                <Link to="/category/dairy-breakfast" className="text-gray-600 hover:text-green-500">
                  Dairy & Breakfast
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-green-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-green-500">
                  Cart
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-500">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="text-green-500 mr-3 mt-1">
                  <Home size={18} />
                </div>
                <span className="text-gray-600">
                  123 Grocery Lane, Fresh City, FC 10101
                </span>
              </li>
              <li className="flex items-center">
                <div className="text-green-500 mr-3">
                  <Phone size={18} />
                </div>
                <span className="text-gray-600">+1 234 567 8901</span>
              </li>
              <li className="flex items-center">
                <div className="text-green-500 mr-3">
                  <Mail size={18} />
                </div>
                <span className="text-gray-600">support@blinkitClone.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} BlinkBuy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;