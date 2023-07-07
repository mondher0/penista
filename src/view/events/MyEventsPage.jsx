import NavBar from "../shared/navBar/NavBar";
import MyEventsTable from "./MyEventsTable";
import { useNavigate } from "react-router-dom";

const MyEventsPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar title="Evénements" />
      <div className="container">
        <div className="title">
          <p>Mes événements</p>
          <button
            className="add-product"
            onClick={() => navigate("/evenements/ajouter-evenement")}
          >
            Ajouter événement
          </button>
        </div>
        <MyEventsTable />
      </div>
    </>
  );
};

export default MyEventsPage;
