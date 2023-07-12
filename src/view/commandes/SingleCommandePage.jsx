/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "../shared/navBar/NavBar";
import { next } from "../../assets/index";
import { useParams } from "react-router-dom";
import "./SingleCommandePage.css";
import CommandeCard from "./CommandeCard";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";

const SingleCommandePage = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const getSingleCommande = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`${baseUrl}order/${id}/`);
      console.log(response);
      setItems(response.data.data.orderItems);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };
  useEffect(() => {
    getSingleCommande();
  }, []);

  return (
    <>
      <NavBar title="Commandes" />
      <div className="container">
        <div className="header">
          <p>Tous les commandes</p>
          <img src={next} />
          <p>{id}</p>
        </div>
        {isLoading && (
          <div
            className="loading"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <p
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Chargement...
            </p>
          </div>
        )}

        {isError && (
          <div
            className="loading"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            <p
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Something went wrong...
            </p>
          </div>
        )}

        {!isLoading && (
          <div className="commande-cards">
            {items?.map((item) => (
              <CommandeCard
                key={item.id}
                title={item.product_name}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SingleCommandePage;
