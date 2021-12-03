import {MY_ORDERS_RESET, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS} from "../types";
import axios from "axios"

export const login = ({email, password}) => async (dispatch) => {
    try {
        dispatch({type: USER_LOGIN_REQUEST});
        const config = {
            headers: {
                "Content-Type" : "applciation/json"
            }
        }
        const res = await axios.post("/api/users/login", {email, password});
        dispatch({type: USER_LOGIN_SUCCESS, payload: res.data});
        localStorage.setItem("userInfo", JSON.stringify(res.data))
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const register = ({email, password, name}) => async (dispatch) => {
    try {
        dispatch({type: USER_REGISTER_REQUEST});
        const config = {
            headers: {
                "Content-Type" : "applciation/json"
            }
        }
        const res = await axios.post("/api/users", {email, password, name});
      dispatch({type: USER_REGISTER_SUCCESS, payload: res.data});
      dispatch({type: USER_LOGIN_SUCCESS, payload: res.data});
      
        localStorage.setItem("userInfo", JSON.stringify(res.data))
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: USER_DETAILS_REQUEST});
        const {userLogin : {userInfo}} = getState()
        const config = {
            headers: {
            "Content-Type": "applciation/json",
              Authorization : `Bearer ${userInfo.token}`
            }
        }
        const res = await axios.get(`/api/users/${id}`, config);
      dispatch({type: USER_DETAILS_SUCCESS, payload: res.data});
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo")
  dispatch({type: USER_LOGOUT})
  dispatch({type : MY_ORDERS_RESET})
  dispatch({type : USER_DETAILS_RESET})
  };