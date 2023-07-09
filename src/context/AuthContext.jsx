/* eslint-disable react/prop-types */
import { createContext } from "react";
import { useReducer } from "react";
import { authReducer } from "../reducers/authReducer/authReducer";
import { loginUrl } from "../utils/constants";
import axios from "axios";
import {
  ERROR,
  LOADING,
  SET_EMAIL,
  SET_PASSWORD,
} from "../reducers/authReducer/authActions";

export const AuthContext = createContext();
const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
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
      console.log(response);
      dispatch({ type: LOADING });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR, payload: error.response.data?.detail });
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...state, setEmail, setPassword, handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
