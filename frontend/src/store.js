import {  combineReducers } from "redux";
import {thunk} from "redux-thunk"; // Removed curly braces around thunk

import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer } from "./reducers/productReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers/cartReducer";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./reducers/orderReducer";
const reducer = combineReducers({
  // Add your reducers here if you have any
  products:productsReducer,
  productDetails:productDetailsReducer,
  user:userReducer,
  profile:profileReducer,
  forgotPassword:forgotPasswordReducer,
  cart:cartReducer,
  newOrder:newOrderReducer,
  myOrders:myOrdersReducer,
  orderDetails:orderDetailsReducer,
  newReview:newReviewReducer,
  newProduct:newProductReducer,
  product:productReducer,
});

let preloadedState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
      shippingInfo:localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      :{},
  }
};

// Removed curly braces around thunk
const middleware = [thunk];

const store = configureStore(
  {
    reducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(...middleware),
  }
  // composeWithDevTools()
);

export default store;