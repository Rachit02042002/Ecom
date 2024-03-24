// import './App.css';
// import { useEffect } from 'react';
// import Header from "./component/layout/Header/Header.js"
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import WebFont from 'webfontloader';
// import React from 'react';
// import Footer from './component/layout/Footer/Footer.js';
// import Home from "./component/Home/Home.js"
// import Loader from './component/layout/Loader/Loader.js';
// import ProductDetails from "./component/Product/ProductDetails.js"
// import Products from "./component/Product/Products.js"
// import  Search  from './component/Product/Search.js';
// import LoginSignUp from './component/User/LoginSignUp.js';
// import store from "./store.js"
// import { loadUser } from './actions/userAction.js';
// import UserOptions from "./component/layout/Header/UserOptions.js"
// import { useSelector } from 'react-redux';
// import Profile from "./component/User/Profile.js"
// import ProtectedRoute from './component/Route/ProtectedRoute.js';

// function App() {
//   const {isAuthenticated,user} =useSelector(state=>state.user)
//   useEffect(()=>{
//     WebFont.load({
//       google:{
//         families:["Roboto","Droid Sans","Chilanka"]
//       }
//     })
//       store.dispatch(loadUser());
     
//   },[])
//   return (
//     <Router>
//       <Header />
//       {isAuthenticated && <UserOptions user={user}/>}
//       <Routes>
      
//         <Route exact path="/" element={<Home />} />
//         <Route exact path="/product/:id" element={<ProductDetails/>} />
//         <Route exact path="/products" element={<Products/>} />
//         <Route  path="/products/:keyword" element={<Products/>} />
//         <Route exact path="/search" element={<Search/>} />
//         <ProtectedRoute exact path ="/account" element={<Profile/>}/>
//         <Route exact path="/login" element={<LoginSignUp/>} />
//       </Routes>
//       <Footer />
//     </Router>

//   );
// }

// export default App;


import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import { useSelector } from 'react-redux';
import store from "./store.js";
import { loadUser } from './actions/userAction.js';
import Header from "./component/layout/Header/Header.js";
import Footer from './component/layout/Footer/Footer.js';
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from './component/Product/Search.js';
import LoginSignUp from './component/User/LoginSignUp.js';
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import UpdateProfile from "./component/User/UpdateProfile.js"
import UpdatePassword from "./component/User/UpdatePassword.js"
import ForgotPassword from "./component/User/ForgotPassword.js"
import ResetPassword from "./component/User/ResetPassword.js"
import Cart from "./component/Cart/Cart.js"
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import Payment from "./component/Cart/Payment.js"
import axios from 'axios';
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import { useState } from 'react';
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import MyOrders from "./component/Order/MyOrders.js"
import OrderDetails from "./component/Order/OrderDetails.js"
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js"
import NewProduct from './component/admin/NewProduct.js';
import UpdateProduct from "./component/admin/UpdateProduct.js"
function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const [stripeApikey,setStripeApikey] = useState("")

  async function getStripeApikey(){
    const {data} = await axios.get("/api/v1/stripeapikey")
    setStripeApikey(data.stripeApikey)
  }
  
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
    store.dispatch(loadUser());
    getStripeApikey()
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route path="/account" element = {<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path="/me/update" element = {<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
        <Route path="/password/update" element = {<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
        <Route path="/password/forgot" element = {<ForgotPassword/>}/>
        <Route path="/password/reset/:token" element = {<ResetPassword/>}/>
        <Route path="/cart" element = {<ProtectedRoute><Cart/></ProtectedRoute>}/>
        <Route path="/login/shipping" element = {<ProtectedRoute><Shipping/></ProtectedRoute>}/>
        <Route path='/order/confirm' element = {<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
        <Route path='/process/payment' element = {stripeApikey && <Elements stripe={loadStripe(stripeApikey)}><ProtectedRoute><Payment/></ProtectedRoute></Elements>}/>
        <Route path='/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}/>
        <Route path='/orders' element={<ProtectedRoute><MyOrders/></ProtectedRoute>}/>
        <Route path='/order/:id' element={<ProtectedRoute><OrderDetails/></ProtectedRoute>}/>
        <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>}/>
        <Route path='/admin/products' element={<ProtectedRoute isAdmin = {true}><ProductList/></ProtectedRoute>}/>
        <Route path='/admin/product' element={<ProtectedRoute isAdmin = {true}><NewProduct/></ProtectedRoute>}/>
        <Route path='/admin/product/:id' element={<ProtectedRoute isAdmin = {true}><UpdateProduct/></ProtectedRoute>}/>
        <Route exact path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
