import {
  ERROR,
  IS_AUTHENTICATED,
  LOADING,
  LOGOUT,
  SET_EMAIL,
  SET_PASSWORD,
  SET_VERIFICATION_FIRST_CODE,
  SET_VERIFICATION_FOURTH_CODE,
  SET_VERIFICATION_SECOND_CODE,
  SET_VERIFICATION_THIRD_CODE,
  SET_NEW_PASSWORD,
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
  if (action.type === SET_NEW_PASSWORD) {
    return {
      ...state,
      newPassword: action.payload,
    };
  }
  if (action.type === SET_VERIFICATION_FIRST_CODE) {
    return {
      ...state,
      firstCode: action.payload,
    };
  }
  if (action.type === SET_VERIFICATION_SECOND_CODE) {
    return {
      ...state,
      secondCode: action.payload,
    };
  }
  if (action.type === SET_VERIFICATION_THIRD_CODE) {
    return {
      ...state,
      thirdCode: action.payload,
    };
  }
  if (action.type === SET_VERIFICATION_FOURTH_CODE) {
    return {
      ...state,
      fourthCode: action.payload,
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
