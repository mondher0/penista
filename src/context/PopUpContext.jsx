/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { baseUrl } from "../utils/constants";

export const PopUpContext = createContext();
const PopUpContextProvider = ({ children }) => {
  const [update, setUpdate] = useState(false);
  // handle bloc user
  const handleBlock = async (id) => {
    try {
      const response = await axiosInstance.put(
        `${baseUrl}accounts/users/block/${id}/`
      );
      console.log(response);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };

  // handle unblock user
  const handleUnblock = async (id) => {
    try {
      const response = await axiosInstance.put(
        `${baseUrl}accounts/users/deblock/${id}/`
      );
      console.log(response);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };

  // handle delete produt
  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `${baseUrl}product/delete/${id}/`
      );
      console.log(response);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };

  // handle accept reservation
  const handleAccept = async (id) => {
    try {
      const response = await axiosInstance.put(
        `${baseUrl}reservation/approve/${id}/`
      );
      console.log(response);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };

  // handle refuse reservation
  const handleRefuse = async (id) => {
    try {
      const response = await axiosInstance.put(
        `${baseUrl}reservation/reject/${id}/`
      );
      console.log(response);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };

  // handle accept demande abonnement
  const handleAcceptDemandeAbonnement = async (id) => {
    try {
      const response = await axiosInstance.put(
        `${baseUrl}accounts/subscription/approve/${id}/`
      );
      console.log(response);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };

  // handle refuse demande abonnement
  const handleRefuseDemandeAbonnement = async (id) => {
    try {
      const response = await axiosInstance.put(
        `${baseUrl}accounts/subscription/reject/${id}/`
      );
      console.log(response);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PopUpContext.Provider
      value={{
        handleBlock,
        handleUnblock,
        handleDelete,
        handleAccept,
        handleRefuse,
        handleAcceptDemandeAbonnement,
        handleRefuseDemandeAbonnement,
        update,
        setUpdate
      }}
    >
      {children}
    </PopUpContext.Provider>
  );
};
export default PopUpContextProvider;
