/* eslint-disable react-hooks/exhaustive-deps */
import "../utilisateurs/DemandeAbonnementTable.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";

const TicketsTable = () => {
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  // get tickets
  const getTickets = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseUrl}match/ticket/?page=${currentPage}`
      );
      console.log(response);
      if (response.data.data.tickets?.length === 0) {
        setIsEmpty(true);
      }
      setTickets(response.data.data.tickets);
      setPages(response.data.data.pages);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getTickets();
  }, [currentPage]);

  // Pagination handlers
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  return (
    <>
      {isLoading && <div className="loader">Chargement...</div>}
      {isError && <div className="loader">Erreur de chargement</div>}
      {isEmpty && <div className="loader">Aucune demande</div>}
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Tiquet</th>
            <th>Date du match</th>
            <th>Heure du match</th>
            <th>Equipe adverse</th>
            <th>Utilisateur</th>
            <th>Numéro</th>
            <th>Prix</th>
            <th>Tiquet</th>
            <th>Date de résérvation</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => {
            const { match, client_info } = ticket;
            const { startDate } = match;
            const [date, hour] = startDate.split(" ");

            return (
              <>
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{date}</td>
                  <td>{hour}</td>
                  <td>{match.opposingTeam.name}</td>
                  <td>
                    <div className="user-details">
                      <img src={`${baseUrl}${client_info.image}`} alt="user" />
                      <div className="user-info">
                        <p>
                          {client_info.first_name} {client_info.last_name}
                        </p>
                        <span>{client_info.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{client_info.phone_no}</td>
                  <td>{ticket.total_price} DA</td>
                  <td>{ticket.tickets}</td>
                  <td>{ticket.createdAt}</td>
                </tr>
              </>
            );
          })}
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

export default TicketsTable;
