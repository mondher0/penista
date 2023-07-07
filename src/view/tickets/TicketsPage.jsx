import NavBar from "../shared/navBar/NavBar";
import TicketsTable from "./TicketsTable";
import { useNavigate } from "react-router-dom";

const TicketsPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar title="Tiquet" />
      <div className="container">
        <div className="title">
          <p>Toutes les demandes des tiquets</p>
          <button
            className="add-product"
            onClick={() => navigate("/tiquet/mes-tiquets")}
          >
            Mes tiquets de matchs
          </button>
        </div>
        <TicketsTable />
      </div>
    </>
  );
};

export default TicketsPage;
