/* eslint-disable react-hooks/exhaustive-deps */
import "../utilisateurs/DemandeAbonnementTable.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import getLocalDate from "../../utils/getLocalDate";

const TicketsTable = () => {
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const style = {
    width: "50%",
    height: "40px",
    margin: "auto",
    fontSize: "20px",
    paddingLeft: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };
  const [ticket, setTicket] = useState();

  // get tickets
  const getTickets = async () => {
    try {
      setIsLoading(true);
      setIsEmpty(false);
      const response = await axiosInstance.get(
        `${baseUrl}match/ticket/?page=${currentPage}
         ${ticket ? `&q=${ticket}` : ""}
        `,
      );
      if (response.data.data.tickets?.length === 0) {
        setIsEmpty(true);
      }
      setTickets(response.data.data.tickets);
      setPages(response.data.data.pages);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    getTickets();
  }, [currentPage, ticket]);

  // Pagination handlers
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  return (
    <>
      <input
        type="text"
        onChange={(e) => setTicket(e.target.value)}
        style={style}
        placeholder="Rechercher un tiquet"
      />
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
            const { newDate, time } = getLocalDate(startDate);

            return (
              <>
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{newDate}</td>
                  <td>{time}</td>
                  <td>
                    {ticket.match.homeTeam?.team_id === 541
                      ? ticket.match.awayTeam?.name
                      : ticket.match.homeTeam?.name}
                  </td>
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
