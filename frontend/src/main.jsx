import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './components/common/RootLayout'
import Sign from './components/common/Sign'
import Login from './components/common/Login'
import Home from './components/common/Home'
import MyOrders from './components/userprofile/MyOrders'
import MyBookings from './components/userprofile/MyBookings'
import Order from './components/restaurent/Order'
import Restaurent from './components/restaurent/Restaurent'
import RestaurentList from './components/restaurent/RestaurentList'
import Tables from './components/restaurent/Tables'
import AddRestaurent from './components/ownerprofile/AddRestaurent'
import UserOwnerContext from './components/context/UserOwnerContext.jsx'
import OrdersList from './components/restaurent/OrdersList.jsx'
import  AboutUs  from './components/AboutUs.jsx'
import  ContactUs  from './components/ContactUs.jsx'
import  PopularDishes  from './components/PopularDishes.jsx'
const browserRouterObj=createBrowserRouter([{
  path:"/",
  element: <RootLayout/>,
  children:[{
      path:"",
      element: <Home/>
  },
  {
    path:'/signup',
    element:<Sign/>
  },{
    path:'/login',
    element: <Login/>
  },{
    path:'/myorders',
    element: <MyOrders/>
  },{
    path:'/mybookings',
    element: <MyBookings/>
  },{
    path:'/addrestaurent',
    element: <AddRestaurent/>
  },{
    path:'/order',
    element: <Order/>
  },{
    path:'/restaurent',
    element:<Restaurent/>
  },{
    path:'/restaurentlist',
    element: <RestaurentList/>
  },{
    path:'tables',
    element: <Tables/>
  },{
    path:'orderslist',
    element: <OrdersList/>
  },
  {
    path:'about',
    element: <AboutUs/>
  },
  {
    path:'contact',
    element: <ContactUs/>
  },
  {
    path:'popular',
    element: <PopularDishes/>
  }
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserOwnerContext>
      <RouterProvider router={browserRouterObj}/>
    </UserOwnerContext>
    
  </StrictMode>,
)
