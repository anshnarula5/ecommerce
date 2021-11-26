import { combineReducers } from "redux";

import { productListReducer, productDetailsReducer } from "./productReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});

export default rootReducer;
