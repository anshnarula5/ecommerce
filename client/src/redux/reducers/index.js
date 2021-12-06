import { combineReducers } from "redux";

import {
  productListReducer,
  productDetailsReducer,
  productReviewCreateReducer,
  topProductsReducer,
  deleteProductReducer,
  createProductReducer,
  updateProductReducer
} from "./productReducer";
import { cartReducer } from "./cartReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userUpdateProfileReducer
} from "./userReducer";
import {
  myOrdersReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
} from "./orderReducers";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrders: myOrdersReducer,
  productReviewCreate: productReviewCreateReducer,
  topProducts: topProductsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  deleteProduct: deleteProductReducer,
  createProduct: createProductReducer,
  updateProduct : updateProductReducer
});

export default rootReducer;
