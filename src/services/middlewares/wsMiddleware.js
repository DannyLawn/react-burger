import { startPublicWsConnection, startUserWsConnection } from "../actions/wsOrders";
import { getCookie } from "../../utils/cookie";

export const wsMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;
    let isConnected = false;
    const token = getCookie('accessToken')?.replace('Bearer ', '');
    
    return (next) => (action) => {

      const { type } = action;
      const { dispatch } = store;
      const { wsStart, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsStart) {
        socket = action.payload ? new WebSocket(`${wsUrl}${action.payload}`)
          : new WebSocket(wsUrl);
        isConnected = true;
      }
      if (type === onClose) {
        socket.close(1000, 'reason')
      }
      if (socket) {
        socket.onopen = (evt) => {
          dispatch({ type: onOpen, payload: evt });
        }
        socket.onerror = (evt) => {
          dispatch({ type: onError, payload: evt })
        }
        socket.onmessage = (evt) => {
          const { data } = evt;
          const parsedData = JSON.parse(data);
          const { success, ...orders } = parsedData;

          dispatch({ type: onMessage, payload: orders });
        }
        socket.onclose = (evt) => {
          if(evt.code !== 1000) {
            dispatch({ type: onError, payload: evt });
            if(isConnected) {
              action.payload ? dispatch(startUserWsConnection(token)) : dispatch(startPublicWsConnection());
            }
          }
          dispatch({ type: onClose });
        }
      }
      next(action);
    }
  }
}