import { combineReducers } from "redux";

import {productListReducer, productDetailsReducer} from "./productReducer";
import { cartReducer } from "./cartReducer";
import {userLoginReducer} from "./userReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin : userLoginReducer
});

export default rootReducer;
