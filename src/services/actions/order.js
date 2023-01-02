import { currentApi } from '../../utils/API';
import { getCookie } from '../../utils/cookie';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS';


export const postOrder = (order) => {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST
    });
    currentApi.postOrder(order, getCookie("accessToken")).then((res) => res && res.success &&
      dispatch({
        type: POST_ORDER_SUCCESS,
        payload: res
      })  
    ).catch((err) =>
      dispatch({
        type: POST_ORDER_FAILED
      })
    )
  }
};

export const closeOrder = () => ({
  type: CLEAR_ORDER_DETAILS
});
