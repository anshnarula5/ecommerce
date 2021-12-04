import { combineReducers } from "redux";

import {productListReducer, productDetailsReducer, productReviewCreateReducer} from "./productReducer";
import { cartReducer } from "./cartReducer";
import {userLoginReducer, userRegisterReducer, userDetailsReducer} from "./userReducer";
import {myOrdersReducer, orderCreateReducer, orderDetailsReducer, orderPayReducer} from "./orderReducers";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin : userLoginReducer,
  userRegister : userRegisterReducer,
  userDetails: userDetailsReducer,
  orderCreate : orderCreateReducer,
  orderDetails : orderDetailsReducer,
  orderPay : orderPayReducer,
  myOrders: myOrdersReducer,
  productReviewCreate : productReviewCreateReducer
});

export default rootReducer;
