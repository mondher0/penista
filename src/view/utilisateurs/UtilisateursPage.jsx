import { useNavigate } from "react-router-dom";
import NavBar from "../shared/navBar/NavBar";
import "./UtilisateursPage.css";
import UtilisateursTable from "./UtilisateursTable";
const UtilisateursPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar title="Utilisateurs" />
      <div className="container">
        <div className="title">
          <p>Tous les utilisateurs</p>
          <div className="btns">
            <button
              className="add-product"
              onClick={() => navigate("/utilisateurs/demande-abonnement")}
            >
              Demandes d’abonnement
            </button>
            <button
              className="add-product"
              onClick={() => navigate("/utilisateurs/notifications")}
            >
              Envoyer des notifications
            </button>
          </div>
        </div>
        <UtilisateursTable />
      </div>
    </>
  );
};

export default UtilisateursPage;
