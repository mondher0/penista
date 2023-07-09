/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useEffect } from "react";
import { useReducer } from "react";
import { authReducer } from "../reducers/authReducer/authReducer";
import { loginUrl } from "../utils/constants";
import axios from "axios";
import {
  ERROR,
  LOADING,
  SET_EMAIL,
  SET_PASSWORD,
  IS_AUTHENTICATED,
  LOGOUT,
} from "../reducers/authReducer/authActions";

export const AuthContext = createContext();
const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLogged: false,
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  console.log(state);
  // set email function
  const setEmail = (email) => {
    dispatch({ type: SET_EMAIL, payload: email });
  };

  // set password function
  const setPassword = (password) => {
    dispatch({ type: SET_PASSWORD, payload: password });
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
      console.log(error);
      dispatch({ type: ERROR, payload: error.response.data?.detail });
    }
  };

  // check if user is authenticated with virify token using jwt decode
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("token exist");
      dispatch({ type: IS_AUTHENTICATED });
      console.log(state);
    }
  };
  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT });
    window.location.href = "/login";
  };

  useEffect(() => {
    isAuthenticated();
    console.log(state);
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, setEmail, setPassword, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
