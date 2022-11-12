import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  CLEAR_ORDER_DETAILS
} from '../actions/order';

const initialState = {
  orderRequest: false,
  orderFailed: false,
  orderNumber: null,
  isOrderDetailsOpened: false
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST:
      return {
        ...state,
        orderRequest: true,
        isOrderDetailsOpened: true
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
        isOrderDetailsOpened: true
      };

    case CLEAR_ORDER_DETAILS:
      return initialState;

    default:
      return state;
  };
};