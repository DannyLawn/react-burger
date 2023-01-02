import { currentApi } from "../../utils/API";
import { setCookie, deleteCookie, getCookie } from "../../utils/cookie";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const USER_DATA_REQUEST = "USER_DATA_REQUEST";
export const USER_DATA_SUCCESS = "USER_DATA_SUCCESS";
export const USER_DATA_FAILED = "USER_DATA_FAILED";

export const CHECK_AUTH = "CHECK_AUTH";

export const UPGRADE_USER_REQUEST = 'UPGRADE_USER_REQUEST';
export const UPGRADE_USER_SUCCESS = 'UPGRADE_USER_SUCCESS';
export const UPGRADE_USER_FAILED = 'UPGRADE_USER_FAILED';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const SHOW_ERROR = "SHOW_ERROR";
export const HIDE_ERROR = "HIDE_ERROR";



export const register = ({ email, password, name }) => {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });
    currentApi.register(email, password, name).then((res) => {
      if (res && res.success) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res
        });
        localStorage.setItem("refreshToken", res.refreshToken);
        setCookie("accessToken", res.accessToken);
      }
    }
    ).catch((err) =>
      dispatch({
        type: REGISTER_FAILED,
        payload: err.message
      })
    );
  };
};


export const logIn = ({ email, password }) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });
    currentApi.logIn(email, password).then((res) => {
      if (res && res.success) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.user,
        });
        localStorage.setItem("refreshToken", res.refreshToken);
        setCookie("accessToken", res.accessToken);
      }
    }
    ).catch((err) =>
      dispatch({
        type: LOGIN_FAILED,
        payload: err.message
      })
    );
  }
};


export const logOut = () => {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    });
    currentApi.logOut(localStorage.getItem("refreshToken")).then((res) => {
      if (res && res.success) {
        dispatch({
          type: LOGOUT_SUCCESS
        });
        localStorage.removeItem("refreshToken");
        deleteCookie("accessToken");
      }
    }
    ).catch((err) =>
      dispatch({
        type: LOGOUT_FAILED,
        payload: err.message
      })
    );
  }
};

export const refreshToken = () => {
  return function (dispatch) {
    currentApi.refreshToken(localStorage.getItem("refreshToken")).then((res) => {
      if (res && res.success) {
        localStorage.setItem("refreshToken", res.refreshToken);
        setCookie("accessToken", res.accessToken);
        dispatch(getUserData());
      }
    }
    ).catch((err) =>
      dispatch({
        type: USER_DATA_FAILED
      })
    );
  }
};

export const getUserData = () => {
  return function (dispatch) {
    dispatch({
      type: USER_DATA_REQUEST
    });
    currentApi.getUserData(getCookie("accessToken")).then((res) => {
      res && res.success &&
        dispatch({
          type: USER_DATA_SUCCESS,
          payload: res.user
        });
    }
    ).catch((err) => {
      if (err.message === "jwt expired") {
        dispatch(refreshToken());
      }
      dispatch({
        type: USER_DATA_FAILED
      });
    }
    ).finally(() =>
      dispatch({
        type: CHECK_AUTH
      })
    );
  }
};

export const upgradeUser = ({ email, password, name }) => {
  return function (dispatch) {
    dispatch({
      type: UPGRADE_USER_REQUEST
    });
    currentApi.upgradeUserData(getCookie("accessToken"), email, password, name).then((res) => {
      if (res && res.success) {
        dispatch({
          type: UPGRADE_USER_SUCCESS,
          payload: { userData: res.user, message: "User data changes" }
        });
      }
    }
    ).catch((err) =>
      dispatch({
        type: UPGRADE_USER_FAILED,
        payload: err.message
      })
    );
  };
};

export const forgotPassword = (email) => {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    });
    currentApi.forgotPasswordReset(email).then((res) => {
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: res
      })
    }).catch((err) =>
      dispatch({
        type: FORGOT_PASSWORD_FAILED,
        payload: err.message
      })
    );
  }
}

export const resetPassword = (data) => {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });
    currentApi.resetPassword(data).then((res) => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: res
      })
    }).catch((err) =>
      dispatch({
        type: RESET_PASSWORD_FAILED,
        payload: err.message
      })
    );
  }
}

export const showError = (message) => ({
  type: SHOW_ERROR,
  payload: message
});

export const hideError = () => ({
  type: HIDE_ERROR
});