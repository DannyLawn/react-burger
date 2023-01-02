import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
  USER_DATA_FAILED,
  UPGRADE_USER_REQUEST,
  UPGRADE_USER_SUCCESS,
  UPGRADE_USER_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  CHECK_AUTH,
  SHOW_ERROR,
  HIDE_ERROR
} from "../actions/user";

const initialState = {
  userData: null,
  errorMessage: null,
  checkedAuth: false,
  registerRequest: false,
  registerFailed: false,
  logInRequest: false,
  logInFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  userDataRequest: false,
  userDataFailed: false,
  upgradeUserRequest: false,
  upgradeUserFailed: false,
  forgotPassRequest: false,
  forgotPassFailed: false,
  forgotPassSuccess: false,
  resetPassRequest: false,
  resetPassFailed: false,
  resetPassSuccess: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        registerRequest: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        userData: action.payload.user,
        registerRequest: false,
        registerFailed: false
      };
    case REGISTER_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
        registerFailed: true,
        registerRequest: false
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        logInRequest: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        errorMessage: null,
        logInRequest: false,
        logInFailed: false
      };
    case LOGIN_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
        logInFailed: true,
        logInRequest: false
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        logoutRequest: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        userData: null,
        errorMessage: null,
        logoutRequest: false,
        logoutFailed: false
      };
    case LOGOUT_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
        logoutFailed: true,
        logoutRequest: false
      };
    case USER_DATA_REQUEST:
      return {
        ...state,
        userDataRequest: true
      };
    case USER_DATA_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        userDataRequest: false,
        userDataFailed: false
      };
    case USER_DATA_FAILED:
      return {
        ...state,
        userDataFailed: true,
        userDataRequest: false
      };
    case UPGRADE_USER_REQUEST:
      return {
        ...state,
        upgradeUserRequest: true
      };
    case UPGRADE_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload.userData,
        errorMessage: action.payload.message,
        upgradeUserRequest: false,
        upgradeUserFailed: false
      };
    case UPGRADE_USER_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
        upgradeUserFailed: true,
        upgradeUserRequest: false
      };
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPassRequest: true
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPassSuccess: true,
        forgotPassRequest: false,
        forgotPassFailed: false,
        errorMessage: action.payload.message
      };
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
        forgotPassFailed: true,
        forgotPassRequest: false,
        forgotPassSuccess: false
      };
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPassRequest: true
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPassSuccess: true,
        errorMessage: action.payload.message,
        forgotPassSuccess: false,
        resetPassRequest: false,
        resetPassFailed: false
      }
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
        resetPassFailed: true,
        resetPassRequest: false,
        resetPassSuccess: false
      }

    case CHECK_AUTH:
      return {
        ...state,
        checkedAuth: true
      };
    case SHOW_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    case HIDE_ERROR:
      return {
        ...state,
        errorMessage: null
      };

    default:
      return state;
  }
}