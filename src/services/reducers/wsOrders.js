import {
  WS_PUBLIC_SUCCESS,
  WS_USER_SUCCESS,
  WS_PUBLIC_ERROR,
  WS_USER_ERROR,
  WS_PUBLIC_CLOSED,
  WS_USER_CLOSED,
  WS_PUBLIC_ORDERS,
  WS_USER_ORDERS
} from '../actions/wsOrders';

const initialState = {
  publicConnection: false,
  userConnection: false,
  publicConnectionError: null,
  userConnectionError: null,
  publicOrders: null,
  userOrders: null
}

export const wsOrdersReducer = ( state = initialState, action) => {
  switch(action.type) {
    case WS_PUBLIC_SUCCESS:
      return {
        ...state,
        publicConnection: true,
        publicConnectionError: null
      };
    case WS_USER_SUCCESS: 
      return {
        ...state, 
        userConnection: true,
        userConnectionError: null
      }
    case WS_PUBLIC_ERROR:
      return {
        ...state,
        publicConnection: false,
        publicConnectionError: action.payload,
        publicOrders: null
      }
    case WS_USER_ERROR:
      return {
        ...state,
        userConnection: false,
        userConnectionError: action.payload,
        userOrders: null
      }
    case WS_PUBLIC_CLOSED:
      return {
        ...state,
        publicConnection: false,
        publicConnectionError: null,
        publicOrders: null
      }
    case WS_USER_CLOSED:
      return {
        ...state, 
        userConnection: false,
        userConnectionError: null,
        userOrders: null
      }
    case WS_PUBLIC_ORDERS:
      return {
        ...state,
        publicOrders: action.payload
      }
    case WS_USER_ORDERS: 
      return {
        ...state,
        userOrders: action.payload
      }
    default:
      return state;
  }
}

