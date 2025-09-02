import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-pink-100 text-center text-sm text-gray-700 py-6 mt-0 shadow-inner">
      <div className="container mx-auto px-4">
        <p>© {new Date().getFullYear()} PrincessGlow. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <Link to="/terms" className="text-pink-500 hover:underline">
            Terms of Service
          </Link>
          <span>|</span>
          <Link to="/privacy" className="text-pink-500 hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
