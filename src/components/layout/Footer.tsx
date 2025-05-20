import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, LinkedIn } from "lucide-react";

const Footer: React.FC = () => {

    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center">
                    <div className="flex space-x-4 mb-4">
                        <Link to="/about" className="text-gray-300 hover:text-white">About Us</Link>
                        <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
                        <Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <a href="#" className="text-gray-300 hover:text-white"><Facebook /></a>
                        <a href="#" className="text-gray-300 hover:text-white"><Twitter /></a>
                        <a href="#" className="text-gray-300 hover:text-white"><Instagram /></a>
                        <a href="#" className="text-gray-300 hover:text-white"><LinkedIn /></a>
                    </div>
                    <p className="text-sm text-gray-400">&copy; 2023 BlinkitClone. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer;


    