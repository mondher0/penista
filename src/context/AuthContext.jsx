/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/authReducer/authReducer";
import { loginUrl, baseUrl } from "../utils/constants";
import axios from "axios";

import {
  ERROR,
  LOADING,
  SET_EMAIL,
  SET_PASSWORD,
  IS_AUTHENTICATED,
  LOGOUT,
  SET_VERIFICATION_FIRST_CODE,
  SET_VERIFICATION_SECOND_CODE,
  SET_VERIFICATION_THIRD_CODE,
  SET_VERIFICATION_FOURTH_CODE,
  SET_NEW_PASSWORD,
} from "../reducers/authReducer/authActions";

export const AuthContext = createContext();
const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLogged: false,
  firstCode: "",
  secondCode: "",
  thirdCode: "",
  fourthCode: "",
  newPassword: "",
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  // set email function
  const setEmail = (email) => {
    dispatch({ type: SET_EMAIL, payload: email });
  };

  // set password function
  const setPassword = (password) => {
    dispatch({ type: SET_PASSWORD, payload: password });
  };

  // set verification code function
  const setVerificationFirstCode = (code) => {
    dispatch({ type: SET_VERIFICATION_FIRST_CODE, payload: code });
  };
  const setVerificationSecondCode = (code) => {
    dispatch({ type: SET_VERIFICATION_SECOND_CODE, payload: code });
  };
  const setVerificationThirdCode = (code) => {
    dispatch({ type: SET_VERIFICATION_THIRD_CODE, payload: code });
  };
  const setVerificationFourthCode = (code) => {
    dispatch({ type: SET_VERIFICATION_FOURTH_CODE, payload: code });
  };

  // set new password function
  const setNewPassword = (password) => {
    dispatch({ type: SET_NEW_PASSWORD, payload: password });
  };

  // handle login function
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      dispatch({ type: LOADING });
      const data = {
        username: state.username,
        password: state.password,
      };
      const response = await axios.post(loginUrl, data);
      const token = response.data.data.tokens.access;
      localStorage.setItem("token", token);
      dispatch({ type: LOADING });
      isAuthenticated();
      window.location.href = "/";
    } catch (error) {
      dispatch({ type: ERROR, payload: error.response.data?.detail });
    }
  };

  // check if user is authenticated with virify token using jwt decode
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: IS_AUTHENTICATED });
    }
  };
  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT });
    window.location.href = "/login";
  };

  // handle change password
  const handleChangePassword = async (e) => {
    try {
      e.preventDefault();
      dispatch({ type: LOADING });
      const data = {
        email: state.username,
        verification_code:
          state.firstCode +
          state.secondCode +
          state.thirdCode +
          state.fourthCode,
        password: state.password,
      };
      const response = await axios.post(
        `${baseUrl}accounts/password/reset/`,
        data
      );
      dispatch({ type: LOADING });
      window.location.href = "/login";
    } catch (error) {
      dispatch({ type: ERROR, payload: "something went wrong" });
    }
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setEmail,
        setPassword,
        setNewPassword,
        setVerificationFirstCode,
        setVerificationSecondCode,
        setVerificationThirdCode,
        setVerificationFourthCode,
        handleLogin,
        handleLogout,
        handleChangePassword,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
