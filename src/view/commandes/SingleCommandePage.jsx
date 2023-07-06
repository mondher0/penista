import NavBar from "../shared/navBar/NavBar";
import { next } from "../../assets/index";
import { useParams } from "react-router-dom";
import "./SingleCommandePage.css";
import CommandeCard from "./CommandeCard";

const SingleCommandePage = () => {
  const { id } = useParams();
  return (
    <>
      <NavBar title="Commandes" />
      <div className="container">
        <div className="title">
          <p>Tous les commandes</p>
          <img src={next} />
          <p>{id}</p>
        </div>
        <div className="commande-cards">
          <CommandeCard />
          <CommandeCard />
          <CommandeCard />
          <CommandeCard />
        </div>
      </div>
    </>
  );
};

export default SingleCommandePage;
