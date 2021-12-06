import { combineReducers } from "redux";

import {productListReducer, productDetailsReducer, productReviewCreateReducer, topProductsReducer} from "./productReducer";
import { cartReducer } from "./cartReducer";
import {userLoginReducer, userRegisterReducer, userDetailsReducer, userListReducer, userDeleteReducer} from "./userReducer";
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
  productReviewCreate: productReviewCreateReducer,
  topProducts: topProductsReducer,
  userList: userListReducer,
  userDelete : userDeleteReducer
});

export default rootReducer;
