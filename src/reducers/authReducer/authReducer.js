import {
  ERROR,
  IS_AUTHENTICATED,
  LOADING,
  LOGOUT,
  SET_EMAIL,
  SET_PASSWORD,
} from "./authActions";
export const authReducer = (state, action) => {
  if (action.type === SET_EMAIL) {
    return {
      ...state,
      username: action.payload,
    };
  }
  if (action.type === SET_PASSWORD) {
    return {
      ...state,
      password: action.payload,
    };
  }
  if (action.type === LOADING) {
    if (state.isLoading === true) {
      return {
        ...state,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        isLoading: true,
      };
    }
  }
  if (action.type === ERROR) {
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };
  }
  if (action.type === LOGOUT) {
    return {
      ...state,
      isLogged: false,
    };
  }
  if (action.type === IS_AUTHENTICATED) {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("token exist");
      return {
        ...state,
        isLogged: true,
      };
    }
  }

  return state;
};
