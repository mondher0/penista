import NavBar from "../shared/navBar/NavBar";
import DemandeAbonnementTable from "./DemandeAbonnementTable";
const DemandeAbonnementPage = () => {
  return (
    <>
      <NavBar title="Utilisateurs" />
      <div className="container">
        <p>Demandes d’abonnement</p>
        <DemandeAbonnementTable />
      </div>
    </>
  );
};

export default DemandeAbonnementPage;
