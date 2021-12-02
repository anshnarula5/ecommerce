import {ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS} from "../types"

export const orderCreateReducer = (state = {}, actions) => {
    const {type, payload} = actions
    switch (type) {
        case ORDER_CREATE_REQUEST:
            return {loading: true}
        case ORDER_CREATE_SUCCESS:
            return {loading : false, success : true, order : payload}
        case ORDER_CREATE_FAIL:
            return {loading : false, error : payload}
        default:
            return state
    }
}

export const orderDetailsReducer = (state = {orderItems : [], shippingAddress : {}, loading : true}, actions) => {
    const {type, payload} = actions
    switch (type) {
        case ORDER_DETAILS_REQUEST:
            return {...state, loading: true}
        case ORDER_DETAILS_SUCCESS:
            return { loading : false,  order : payload}
        case ORDER_DETAILS_FAIL:
            return {loading : false, error : payload}
        default:
            return state
    }
}