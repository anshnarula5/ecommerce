import axios from "axios";
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS } from "../types";

export const listProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
