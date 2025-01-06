import React from "react";

const AboutPage = () => {
  return (
    <div className="p-6 md:p-12 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Welcome to our platform! We are dedicated to delivering the best
          experiences and services tailored to your needs.
        </p>
      </section>

      {/* Mission Section */}
      {/* Side-by-Side Section 1 */}
      <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
        {/* Image */}
        <div className="md:w-1/2">
          <img
            src="/assets/banner.jpg"
            alt="Our Mission"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        {/* Text */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our mission is to create a platform that brings people together
            through seamless experiences and innovative solutions. We are
            committed to providing the highest quality of service while
            promoting inclusivity, creativity, and sustainability.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Team Member 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <img
              src="https://media.istockphoto.com/id/956600100/vector/chef-woman-gesturing-ok.jpg?s=612x612&w=0&k=20&c=ZIGRIbmSgMZRuywZ59JJBgEaDmeVeWmpyFjoUU1iry4="
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </div>
          {/* Team Member 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <img
              src="https://static.vecteezy.com/system/resources/previews/005/162/078/non_2x/cartoon-happy-chef-with-ok-sign-free-vector.jpg"
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Jane Smith</h3>
            <p className="text-gray-600">Head of Design</p>
          </div>
          {/* Team Member 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/047/305/019/small_2x/a-cartoon-chef-is-holding-a-spatula-and-smiling-vector.jpg"
              alt="Team Member"
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Emily Johnson</h3>
            <p className="text-gray-600">Lead Developer</p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
        <p className="text-lg text-gray-700 text-center mb-6">
          Have any questions or feedback? We'd love to hear from you!
        </p>
        <form className="max-w-xl mx-auto">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              placeholder="Enter your message"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-bold py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default AboutPage;
