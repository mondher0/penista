import NavBar from "../shared/navBar/NavBar";
import "./UtilisateursPage.css";
import UtilisateursTable from "./UtilisateursTable";
const UtilisateursPage = () => {
  return (
    <>
      <NavBar title="Utilisateurs" />
      <div className="container">
        <div className="title">
          <p>Tous les utilisateurs</p>
          <div className="btns">
            <button className="add-product">Demandes d’abonnement</button>
            <button className="add-product">Envoyer des notifications</button>
          </div>
        </div>
        <UtilisateursTable />
      </div>
    </>
  );
};

export default UtilisateursPage;
