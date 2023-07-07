import NavBar from "../shared/navBar/NavBar";
import TicketsMatcheTable from "./TicketsMatcheTable";
import { useNavigate } from "react-router-dom";

const TicketsMatchePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar title="Tiquet" />
      <div className="container">
        <div className="title">
          <p>Tous les tiquets de matchs publiés</p>
          <button
            className="add-product"
            onClick={() => navigate("/tiquet/ajouter-tiquet")}
          >
            Ajouter un tiquet de match
          </button>
        </div>
        <TicketsMatcheTable />
      </div>
    </>
  );
};

export default TicketsMatchePage;
