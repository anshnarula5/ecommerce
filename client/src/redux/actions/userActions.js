import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT} from "../types";
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
export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo")
    dispatch({type : USER_LOGOUT})
  };