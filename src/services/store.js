import { compose, createStore, applyMiddleware } from "redux";
import {
  WS_PUBLIC_START,
  WS_USER_START,
  WS_PUBLIC_SUCCESS,
  WS_USER_SUCCESS,
  WS_PUBLIC_ERROR,
  WS_USER_ERROR,
  WS_PUBLIC_CLOSED,
  WS_USER_CLOSED,
  WS_PUBLIC_ORDERS,
  WS_USER_ORDERS
} from './actions/wsOrders';
import { ORDERS_WS_URL } from "../utils/data";
import { rootReducer } from "./reducers/index";
import { wsMiddleware } from "./middlewares/wsMiddleware";
import thunk from "redux-thunk";

const wsPublicActions = {
  wsStart: WS_PUBLIC_START, 
  onOpen: WS_PUBLIC_SUCCESS,
  onClose: WS_PUBLIC_CLOSED, 
  onError: WS_PUBLIC_ERROR,
  onMessage: WS_PUBLIC_ORDERS
}

const wsUserActions = {
  wsStart: WS_USER_START, 
  onOpen: WS_USER_SUCCESS,
  onClose: WS_USER_CLOSED, 
  onError: WS_USER_ERROR,
  onMessage: WS_USER_ORDERS
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const middlewares = [thunk, wsMiddleware(`${ORDERS_WS_URL}/all`, wsPublicActions), wsMiddleware(ORDERS_WS_URL, wsUserActions)];

const enhancer = composeEnhancers(applyMiddleware(...middlewares));
export const store = createStore(rootReducer, enhancer);