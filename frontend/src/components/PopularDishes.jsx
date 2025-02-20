import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
const PopularDishes = () => {
    const navigate=useNavigate();
    function Clickmenu(){
        navigate('/signup')
    }
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-900 px-6">
      <div className="bg-gradient-to-br from-red-500 via-blue-500 to-green-500

 shadow-lg rounded-lg p-10 max-w-4xl flex flex-col md:flex-row items-center">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-indigo-700">POPULAR DISHES</h2>
          <p className="text-white mt-4">
            Explore our **top-rated dishes** loved by customers!  
            From **spicy street food delights** to **authentic regional flavors**,  
            we bring you a diverse menu that caters to all taste buds.  
            **Order now and enjoy a delightful dining experience!**
          </p>
          <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold" onClick={Clickmenu}>
            View Menu
          </button>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <img
            src="https://img.freepik.com/free-photo/top-view-eid-al-fitr-celebration-with-delicious-food_23-2151205140.jpg?ga=GA1.1.1352903550.1739698574&semt=ais_hybrid"
            alt="Popular Dishes"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;
