import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation

function Tables() {
  const navigate = useNavigate();
  
  // Mock data for table status (0 = open, 1 = booked)
  const [tableStatus, setTableStatus] = useState(
    Array(20).fill(0).map((_, index) => (index % 5 === 0 ? 1 : 0)) // Some tables are booked (1), others are open (0)
  );

  const handleTableClick = (index) => {
    // Redirect to the booked page if the table is booked
    if (tableStatus[index] === 0) {
      navigate('/mybookings'); // Assuming your "booked" page is at /booked
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h2 className="text-3xl font-bold my-6">Table Booking</h2>
      <div className="grid grid-cols-5 gap-4">
        {tableStatus.map((status, index) => (
          <div
            key={index}
            className={`w-20 h-20 rounded-md transition-all duration-300 
              ${status === 0 ? 'bg-green-500' : 'bg-red-500'} 
              hover:scale-105 cursor-pointer`}
            onClick={() => handleTableClick(index)}
            onPointerEnter={(e) => e.target.classList.add('scale-110')} 
            onPointerLeave={(e) => e.target.classList.remove('scale-110')}
          >
            <span className="text-white text-center flex items-center justify-center h-full font-bold">
              {status === 0 ? 'Open' : 'Booked'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tables;
