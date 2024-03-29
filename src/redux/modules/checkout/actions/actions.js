import types from "../types";

export const setCheckoutOrders = (payload) => ({
  type: types.SET_CHECKCOUT_ORDERS,
  payload,
});

export const setCheckoutSelectSender = (payload) => ({
  type: types.SET_CHECKCOUT_SELECT_SENDER,
  payload,
});

export const setCheckoutShipping = (payload) => ({
  type: types.SET_CHECKCOUT_SHIPPING,
  payload,
});

export const setCheckoutPayment = (payload) => ({
  type: types.SET_CHECKCOUT_PAYMENT,
  payload,
});

export const setCheckoutReceiver = (payload) => ({
  type: types.SET_CHECKCOUT_RECEIVER,
  payload,
});

export const getCheckout = (payload) => ({
  type: types.GET_CHECKOUT,
  payload,
});
export const getCheckoutSuccess = (payload) => ({
  type: types.GET_CHECKOUT_SUCCESS,
  payload,
});
export const setIsLoadingGetChekcout = (payload) => ({
  type: types.IS_LOADING_GET_CHECKOUT,
  payload,
});
export const resetCheckout = (payload) => ({
  type: types.RESET_CHECKOUT,
  payload,
});
