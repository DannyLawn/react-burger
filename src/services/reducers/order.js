import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  CLEAR_ORDER_DETAILS,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
} from '../actions/order';

const initialState = {
  orderRequest: false,
  orderFailed: false,
  getOrderRequest: false,
  getOrderFailed: false,
  orderData: null,
  orderNumber: null,
  isOrderReceiptOpened: false
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true,
        isOrderReceiptOpened: true
      };

    case POST_ORDER_SUCCESS:
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        orderNumber: action.payload.order.number
      };

    case POST_ORDER_FAILED:
      return {
        ...state,
        orderFailed: true,
        orderRequest: false,
        isOrderReceiptOpened: true
      };

    case GET_ORDER_REQUEST:
      return {
        ...state,
        getOrderRequest: true
      };

    case GET_ORDER_SUCCESS:
      return {
        ...state,
        getOrderRequest: false,
        getOrderFailed: false,
        orderData: action.payload || 'orderNotFound'
      };

    case GET_ORDER_FAILED:
      return {
        ...state,
        getOrderFailed: true,
        getOrderRequest: false,
        orderData: null
      };

    case CLEAR_ORDER_DETAILS:
      return initialState;

    default:
      return state;
  };
};