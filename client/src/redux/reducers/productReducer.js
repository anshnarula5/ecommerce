import {PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS} from "../types"

const initialState = {
    loading: true,
    products :[],
    error : {}
}

 const productListReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: payload}
        case PRODUCT_LIST_FAIL:
            return {loading : false, products: [], error : payload}
        default:
            return state
    }
}

export default productListReducer