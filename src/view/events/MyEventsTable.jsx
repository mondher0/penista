/* eslint-disable react-hooks/exhaustive-deps */
import { edite } from "../../assets/index";
import "../utilisateurs/DemandeAbonnementTable.css";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyEventsTable = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  // get events
  const getEvents = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseUrl}/event/?page=${currentPage}`
      );
      console.log(response.data.data.events);
      setEvents(response.data.data.events);
      if (response.data.data.events.length === 0) {
        setIsEmpty(true);
      }
      setPages(response.data.data.pages);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };
  // Pagination handlers
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    getEvents();
  }, [currentPage]);
  return (
    <>
      {isLoading && <div className="loader">Chargement...</div>}
      {isError && <div className="loader">Erreur de chargement</div>}
      {isEmpty && <div className="loader">Aucun événement</div>}
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
                <td>
                  {event.premium_price ? `${event.premium_price} DA` : "-"}
                </td>
                <td>{event.pro_price ? `${event.pro_price} DA` : "-"}</td>
                <td>{event.min_ticket ? `${event.min_ticket}` : "-"}</td>
                <td>{event.max_ticket ? `${event.max_ticket}` : "-"}</td>
                <td>{event.date ? `${event.date}` : "-"}</td>
                <td>
                  <img
                    src={edite}
                    alt=""
                    className="hover"
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
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={goToPreviousPage}>
          Previous
        </button>
        <span>Page{currentPage}</span>
        <button onClick={goToNextPage} disabled={currentPage == pages}>
          Next
        </button>
      </div>
    </>
  );
};

export default MyEventsTable;
