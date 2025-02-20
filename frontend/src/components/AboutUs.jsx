import React from "react";

const AboutUs = () => {
  return (
    <section className="flex justify-center items-center min-h-screen bg-black px-6">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-4xl flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-indigo-700">ABOUT US</h2>
          <p className="text-gray-600 mt-4">
            Welcome to our food ordering platform, where convenience meets quality!  
            We aim to bridge the gap between **restaurants, food lovers, and donors**  
            by providing a seamless experience for ordering, booking, and contributing surplus food.  
            Our goal is to **reduce food waste, support local businesses, and ensure delicious meals reach those in need.**
          </p>
          <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold">
            Contact Now
          </button>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <img
            src="https://img.freepik.com/free-vector/business-landing-page-template_52683-605.jpg"
            alt="About Us"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
