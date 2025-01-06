import React from "react";

const ContactPage = () => {
  return (
    <div className="p-6 md:p-12 bg-gradient-to-r from-teal-100 via-blue-100 to-indigo-100 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          We’d love to hear from you! Whether you have a question, feedback, or
          just want to say hello, feel free to get in touch with us.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Form */}
        <div className="bg-white shadow-lg rounded-lg p-8 lg:w-1/2">
          <h2 className="text-3xl font-bold text-center mb-6">
            Send Us a Message
          </h2>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Write your message here..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 text-white font-bold py-3 rounded-lg hover:bg-teal-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="lg:w-1/2">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-6">
              Contact Details
            </h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center">
                <span className="text-teal-500 text-2xl mr-4">
                  <i className="fas fa-phone"></i>
                </span>
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center">
                <span className="text-teal-500 text-2xl mr-4">
                  <i className="fas fa-envelope"></i>
                </span>
                <span>support@example.com</span>
              </li>
              <li className="flex items-center">
                <span className="text-teal-500 text-2xl mr-4">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <span>123 Main Street, Anytown, USA</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-6">Find Us Here</h2>
        <div className="bg-gray-300 rounded-lg shadow-lg h-64 w-full">
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434508619!2d144.95373631575785!3d-37.817209942021476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5778d9bbf514a89!2s123+Main+St%2C+Melbourne+VIC+3000%2C+Australia!5e0!3m2!1sen!2sus!4v1612407412345!5m2!1sen!2sus"
            className="w-full h-full rounded-lg border-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
