/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "../shared/navBar/NavBar";
import { useParams } from "react-router-dom";
import { next } from "../../assets/index";
import SingleUtilisateurCommandeTable from "./SingleUtilisateurCommandeTable";


const SingleUtilisateurCommandesPage = () => {
  const { id } = useParams();
 
  return (
    <>
      <NavBar title="Utilisateurs" />
      <div className="container">
        <div className="header">
          <p>Tous les utilisateurs</p>
          <img src={next} alt="next" />
          <p>{id}</p>
          <img src={next} alt="next" />
          <p>Commandes</p>
        </div>
        <SingleUtilisateurCommandeTable id={id} />
      </div>
    </>
  );
};

export default SingleUtilisateurCommandesPage;
