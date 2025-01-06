// pages/HomePage.js
import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="p-2">
        <img src="/assets/free.jpg" alt="Hero" className="" />
      </section>

      {/* About Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">About Us</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            At CafeName, we are passionate about delivering an unforgettable
            experience with every cup of coffee and every plate of food. Join us
            for a delightful journey.
          </p>
        </div>
      </section>

      {/* Specials Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Our Specials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-4 border-red-500 rounded-[20px]">
            <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
              <img
                src="https://chopnotch.com/wp-content/uploads/2020/11/Panna-Cotta-1.jpg"
                alt="Special 1"
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">Special Coffee</h3>
              <p className="text-gray-600">
                A unique blend of flavors crafted to perfection.
              </p>
            </div>
            <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
              <img
                src="https://shotejbazar.com/wp-content/uploads/2023/09/coffee-brain-caffeine-neuroscincces.webp"
                alt="Special 2"
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">Gourmet Meal</h3>
              <p className="text-gray-600">
                Indulge in our chef's finest creations.
              </p>
            </div>
            <div className="p-6 bg-gray-100 shadow-lg rounded-lg">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfPHnSzwK4Hlo5taS9JO36XX03MRdcNEu0yw&s"
                alt="Special 3"
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">Desserts</h3>
              <p className="text-gray-600">
                Treat yourself to our delightful desserts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Have questions or want to make a reservation? Reach out to us and
            we'll be happy to assist you.
          </p>
          <Link to="/contact">
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
              Get in Touch
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
