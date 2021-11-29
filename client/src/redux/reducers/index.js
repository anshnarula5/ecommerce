import { combineReducers } from "redux";

import {productListReducer, productDetailsReducer} from "./productReducer";
import { cartReducer } from "./cartReducer";
import {userLoginReducer, userRegisterReducer, userDetailsReducer} from "./userReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin : userLoginReducer,
  userRegister : userRegisterReducer,
  userDetails : userDetailsReducer
});

export default rootReducer;
