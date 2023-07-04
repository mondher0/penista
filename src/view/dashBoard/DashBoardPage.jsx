import NavBar from "../shared/navBar/NavBar";
import "./DashBoardPage.css";
import StatistiqueContainer from "./StatistiqueContainer";
import { buy, games, reserve, revenue, user } from "../../assets/index";
import PerformanceChart from "./PerformanceChart";
import CustomContainer from "./CustomContainer";

const DashBoardPage = () => {
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
            title="Utilisateur participant au jeu"
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
            <CustomContainer />
            <CustomContainer />
            <CustomContainer />
            <CustomContainer />
          </div>
        </section>
      </div>
    </>
  );
};

export default DashBoardPage;
