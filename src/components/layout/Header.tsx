import React, { useState, useEffect } from "react";
import { Link, useLocation,} from "react-router-dom";
import { ShoppingCart, Search, Menu, X, Home } from "lucide-react";

const Header: React.FC = () => {
  const { cart } = useCart();
  const [ismenuOpen, setIsMenuOpen] = useState(false);
  //const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();


  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
                <Link to= "/" className="flex-items-center">
                <div className="text-green-500 mr-2">

                    </div>
                    <span className="font-bold text-xl text-green-500">BlinkitClone</span>
                </Link>
            </div>
                
        </div>


    </header>
  );
};
export default Header;
