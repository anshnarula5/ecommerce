import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_PRODUCT_DETAILS,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  TOP_PRODUCTS_REQUEST,
  TOP_PRODUCTS_SUCCESS,
  TOP_PRODUCTS_FAIL,
} from "../types";

export const productListReducer = (state = { products: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: payload.products, page : payload.page, pages : payload.pages  };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
export const productDetailsReducer = (state = { product : {reviews : []}}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: payload };
    case PRODUCT_DETAILS_FAIL:
      return {loading: false, error: payload};
      case CLEAR_PRODUCT_DETAILS:
        return { loading: true, product: { reviews: [] } };
    default:
      return state;
  }
};
export const productReviewCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true};
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success : true};
    case PRODUCT_CREATE_REVIEW_FAIL:
      return {loading: false, error: payload};
    case PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state;
  }
};
export const topProductsReducer = (state = {products : []}, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOP_PRODUCTS_REQUEST:
      return { loading: true, products : []};
    case TOP_PRODUCTS_SUCCESS:
      return { loading: false, products : payload};
    case TOP_PRODUCTS_FAIL :
      return {loading: false, error: payload};
    default:
      return state;
  }
};
