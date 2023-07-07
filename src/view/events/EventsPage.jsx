import NavBar from "../shared/navBar/NavBar";
import EventsTable from "./EventsTable";
import { useNavigate } from "react-router-dom";
const EventsPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar title="Evénements" />
      <div className="container">
        <div className="title">
          <p>Tous les événements résérvés</p>
          <button
            className="add-product"
            onClick={() => navigate("/evenements/mes-evenements")}
          >
            Mes événements
          </button>
        </div>
        <EventsTable />
      </div>
    </>
  );
};

export default EventsPage;
