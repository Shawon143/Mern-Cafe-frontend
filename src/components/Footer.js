// components/Footer.js
import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()} CafeName. All Rights Reserved.
        </p>
        <p className="text-sm md:text-base">
          123 Coffee Lane, Brewtown, USA | (123) 456-7890
        </p>
      </div>
    </footer>
  );
}

export default Footer;
