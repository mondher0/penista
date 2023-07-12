import { edite } from "../../assets/index";
import "../utilisateurs/DemandeAbonnementTable.css";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyEventsTable = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState();
  // get events
  const getEvents = async () => {
    try {
      const response = await axiosInstance.get(`${baseUrl}/event/`);
      console.log(response.data.data.events);
      setEvents(response.data.data.events);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>ID Event</th>
          <th>Titre</th>
          <th>Type</th>
          <th>Gratuit</th>
          <th>Premium</th>
          <th>Boxe</th>
          <th>Tiquet Min</th>
          <th>Tiquet Max</th>
          <th>Date de l{"'"}evénement</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {events?.map((event) => (
          <>
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.title}</td>
              <td>{event.type}</td>
              <td>{event.free_price ? `${event.free_price} DA` : "-"}</td>
              <td>{event.premium_price ? `${event.premium_price} DA` : "-"}</td>
              <td>{event.pro_price ? `${event.pro_price} DA` : "-"}</td>
              <td>{event.min_ticket ? `${event.min_ticket}` : "-"}</td>
              <td>{event.max_ticket ? `${event.max_ticket}` : "-"}</td>
              <td>{event.date ? `${event.date}` : "-"}</td>
              <td>
                <img
                  src={edite}
                  alt=""
                  onClick={() =>
                    navigate(`/evenements/modifier-evenement/${event.id}`)
                  }
                />
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};

export default MyEventsTable;
