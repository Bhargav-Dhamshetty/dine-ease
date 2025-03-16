import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import RootLayout from './components/common/RootLayout';
import Sign from './components/common/Sign';
import Login from './components/common/Login';
import Home from './components/common/Home';
import MyOrders from './components/userprofile/MyOrders';
import MyReservations from './components/userprofile/MyReservations';
import Restaurent from './components/restaurent/Restaurent';
import RestaurentList from './components/restaurent/RestaurentList';
import AddRestaurent from './components/ownerprofile/AddRestaurent';
import UserOwnerContext from './components/context/UserOwnerContext';
import OrdersList from './components/restaurent/OrdersList';
import TableOverview from './components/restaurent/TableOverview';
import ContactUs from './components/common/ContactUs';
import AboutUs from './components/common/AboutUs';
import PopularDishes from './components/common/PopularDishes';
//import Payment from './components/userprofile/Payment';
import TableBookings from './components/ownerprofile/TableBookings';
import FoodOrders from './components/ownerprofile/FoodOrders';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserOwnerContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/signup" element={<Sign />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/mybookings" element={<MyReservations />} />
            <Route path="/addrestaurent" element={<AddRestaurent />} />
            <Route path="/foodorders" element={<FoodOrders />} />
            <Route path="/restaurent" element={<Restaurent />} />
            <Route path="/restaurentlist" element={<RestaurentList />} />
            <Route path="/tables" element={<TableOverview />} />
            <Route path="/orderslist" element={<OrdersList />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/popular" element={<PopularDishes />} />
            {/* <Route path="/payment" element={<Payment />} /> */}
            <Route path="/tablebookings" element={<TableBookings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserOwnerContext>
  </StrictMode>
);