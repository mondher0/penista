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
  // get data
  const getData = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}dashboard/top-product/`
      );
      setTopProducts(response.data.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <NavBar title="Dashboard" />
      <div className="container">
        <p>Statistiques</p>
        <section className="statistique">
          <StatistiqueContainer title="Revenus" number="1000" img={revenue} />
          <StatistiqueContainer title="Utilisateurs" number="1000" img={user} />
          <StatistiqueContainer
            title="Produit acheté"
            number="1000"
            img={buy}
          />
          <StatistiqueContainer
            title="Evènement réservé"
            number="1000"
            img={reserve}
          />
          <StatistiqueContainer
            title="Participant au jeu"
            number="1000"
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
                console.log(product.images[0].image),
                (
                  <>
                    <CustomContainer
                      title={product.name}
                      cmd={product.total_stock}
                      key={product.id}
                      image={product.images[0].image}
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
