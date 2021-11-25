import {combineReducers} from "redux";

import productListReducer from "./productReducer"

const rootReducer = combineReducers({productListReducer})

export default rootReducer