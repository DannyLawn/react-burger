export const wsMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;
    return (next) => (action) => {

      const { type } = action;
      const { dispatch } = store;
      const { wsStart, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsStart) {
        socket = action.payload ? new WebSocket(`${wsUrl}${action.payload}`)
          : new WebSocket(wsUrl);
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
          dispatch({ type: onClose });
        }
      }
      next(action);
    }
  }
}