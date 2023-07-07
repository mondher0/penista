import NavBar from "../shared/navBar/NavBar";
import OffresTable from "./OffresTable";
import { useNavigate } from "react-router-dom";

const OffresPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar title="Offres" />
      <div className="container">
        <div className="title">
          <p>Toutes les offres</p>
          <button
            className="add-product"
            onClick={() => navigate("/offres/ajouter-offre")}
          >
            Ajouter offre
          </button>
        </div>
        <OffresTable />
      </div>
    </>
  );
};

export default OffresPage;
