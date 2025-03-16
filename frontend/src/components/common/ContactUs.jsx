import React from "react";

const ContactUs = () => {
  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-500 via-blue-500 to-green-500
 px-6">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-4xl flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-indigo-700">CONTACT US</h2>
          <p className="text-gray-600 mt-4">
            Have a question, suggestion, or need assistance?  
            Our team is here to help! Get in touch with us for **restaurant partnerships,  
            customer support, or food donation inquiries.**  
            We value your feedback and strive to enhance your experience.
          </p>
          <form className="mt-7 mr-3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 border rounded-md mb-3"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 border rounded-md mb-3"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-2 border rounded-md mb-3"
              rows="3"
            ></textarea>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold">
              Send Message
            </button>
          </form>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <img
            src="https://img.freepik.com/free-photo/futuristic-business-scene-with-ultra-modern-ambiance_23-2151003773.jpg?ga=GA1.1.1352903550.1739698574&semt=ais_hybrid"
            alt="Contact Us"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;