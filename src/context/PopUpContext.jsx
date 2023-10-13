/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
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
      setUpdate(!update);
    } catch (error) {}
  };

  // handle unblock user
  const handleUnblock = async (id) => {
    try {
      const response = await axiosInstance.put(
        `${baseUrl}accounts/users/deblock/${id}/`
      );
      setUpdate(!update);
    } catch (error) {}
  };

  // handle delete produt
  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `${baseUrl}product/delete/${id}/`
      );
      setUpdate(!update);
    } catch (error) {}
  };

  // handle accept reservation
  const handleAccept = async (id) => {
    try {
      const response = await axiosInstance.put(
        `${baseUrl}reservation/approve/${id}/`
      );
      setUpdate(!update);
    } catch (error) {}
  };

  // handle refuse reservation
  const handleRefuse = async (id) => {
    try {
      const response = await axiosInstance.put(
        `${baseUrl}reservation/reject/${id}/`
      );
      setUpdate(!update);
    } catch (error) {}
  };

  // handle accept demande abonnement
  const handleAcceptDemandeAbonnement = async (id) => {
    try {
      const response = await axiosInstance.put(
        `${baseUrl}accounts/subscription/approve/${id}/`
      );
      setUpdate(!update);
    } catch (error) {}
  };

  // change status of ad
  const handleChangeStatus = async (id) => {
    try {
      const response = await axiosInstance.post(`${baseUrl}ads/status/${id}/`);
      setUpdate(!update);
    } catch (error) {}
  };

  // handle refuse demande abonnement
  const handleRefuseDemandeAbonnement = async (id) => {
    try {
      const response = await axiosInstance.put(
        `${baseUrl}accounts/subscription/reject/${id}/`
      );
      setUpdate(!update);
    } catch (error) {}
  };

  // handle delete ad
  const handleDeleteAd = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `${baseUrl}ads/delete/${id}/`
      );
      setUpdate(!update);
    } catch (error) {}
  };

  // enlever points
  const handleEnleverPoints = async (id, points) => {
    try {
      const data = {
        points: points,
      };
      const response = await axiosInstance.put(
        `${baseUrl}accounts/users/point/retrive/${id}/`,
        data
      );
      setUpdate(!update);
    } catch (error) {}
  };

  // handle accept order
  const handleAcceptOrder = async (id) => {
    try {
      const response = await axiosInstance.put(
        `${baseUrl}order/delivery/${id}/`
      );
      setUpdate(!update);
    } catch (error) {}
  };

  // handle refuse order
  const handleRefuseOrder = async (id) => {
    try {
      const response = await axiosInstance.put(`${baseUrl}order/cancel/${id}/`);
      setUpdate(!update);
    } catch (error) {}
  };

  // handle delete offre
  const handleDeleteOffre = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `${baseUrl}promotion/delete/${id}/`
      );
      setUpdate(!update);
    } catch (error) {}
  };

  // handle delete event
  const handleDeleteEvent = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `${baseUrl}event/delete/${id}/`
      );
      setUpdate(!update);
    } catch (error) {}
  };
  // delete categorie from database
  const deleteCategorie = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `${baseUrl}category/admin/delete/${id}/`
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
        handleChangeStatus,
        handleDeleteAd,
        handleEnleverPoints,
        handleAcceptOrder,
        handleRefuseOrder,
        handleDeleteOffre,
        handleDeleteEvent,
        deleteCategorie,
        update,
        setUpdate,
      }}
    >
      {children}
    </PopUpContext.Provider>
  );
};
export default PopUpContextProvider;
