import { CART_ADD_ITEM, CART_REMOVE_ITEM, SAVE_ADDRESS, SAVE_PAYMENT_METHOD } from "../types";

export const cartReducer = (state = { cartItems: [], shippingAddress : {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ADD_ITEM:
      const item = payload;
      const existItem = state.cartItems.find((i) => i.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === item.product ? item : i
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== payload),
      };
    case SAVE_ADDRESS:
      return {...state, shippingAddress : payload}
    case SAVE_PAYMENT_METHOD:
      return {...state, paymentMethod : payload}
    default:
      return state;
  }
};
