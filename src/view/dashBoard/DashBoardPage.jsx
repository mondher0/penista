/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "../shared/navBar/NavBar";
import "./DashBoardPage.css";
import StatistiqueContainer from "./StatistiqueContainer";
import { buy, games, reserve, revenue, user } from "../../assets/index";
import PerformanceChart from "./PerformanceChart";
import CustomContainer from "./CustomContainer";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";

const DashBoardPage = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [statistiques, setStatistiques] = useState({});
  // get data
  const getData = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}dashboard/top-product/`
      );
      console.log(response);
      setTopProducts(response.data.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatistiques = async () => {
    try {
      const response = await axiosInstance.get(`${baseUrl}dashboard/`);
      console.log(response);
      setStatistiques(response.data.data);
      console.log(statistiques["Utilisateur participant au jeu "]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStatistiques();
    getData();
  }, []);

  return (
    <>
      <NavBar title="Dashboard" />
      <div className="container">
        <p>Statistiques</p>
        <section className="statistique">
          <StatistiqueContainer
            title="Revenus"
            number={statistiques["Revenus "]}
            img={revenue}
          />
          <StatistiqueContainer
            title="Utilisateurs"
            number={statistiques.Utilisateur}
            img={user}
          />
          <StatistiqueContainer
            title="Produit acheté"
            number={statistiques.Produit_achete}
            img={buy}
          />
          <StatistiqueContainer
            title="Evènement réservé"
            number={statistiques.Evenement_reserve}
            img={reserve}
          />
          <StatistiqueContainer
            title="Participant au jeu"
            number={statistiques["Utilisateur participant au jeu"]}
            img={games}
          />
        </section>
        <p>Performance</p>
        <section className="performance">
          <div className="performance-container">
            <PerformanceChart />
          </div>
          <div className="custom">
            {topProducts.map(
              (product) => (
                console.log(product?.images[0]?.image),
                console.log(product),
                (
                  <>
                    <CustomContainer
                      title={product.name}
                      cmd={product.sales}
                      key={product.id}
                      image={product.images[0]?.image}
                    />
                  </>
                )
              )
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default DashBoardPage;
