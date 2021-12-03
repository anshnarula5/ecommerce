import { combineReducers } from "redux";

import {productListReducer, productDetailsReducer} from "./productReducer";
import { cartReducer } from "./cartReducer";
import {userLoginReducer, userRegisterReducer, userDetailsReducer} from "./userReducer";
import {orderCreateReducer, orderDetailsReducer, orderPayReducer} from "./orderReducers";

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
});

export default rootReducer;
