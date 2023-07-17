/* eslint-disable react-hooks/exhaustive-deps */
import "../produit/ProductTable.css";
import { edite } from "../../assets/index";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const TicketsMatcheTable = () => {
  const [tickets, setTickets] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();

  // get all tickets
  const getAllTickets = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseUrl}match/with/ticket/?page=${currentPage}`
      );
      console.log(response);
      if (response.data.data.matchs.length === 0) {
        setIsEmpty(true);
      }
      setTickets(response.data.data.matchs);
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
    getAllTickets();
  }, [currentPage]);

  return (
    <>
      {isLoading && <div className="loader">Chargement...</div>}
      {isError && <div className="loader">Erreur de chargement</div>}
      {isEmpty && <div className="loader">Aucune Tickets</div>}
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Match</th>
            <th>Date du match</th>
            <th>Titre de la ligue</th>
            <th>Equipe adverse</th>
            <th>N° Rond</th>
            <th>Stade</th>
            <th>Tiquets</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets &&
            tickets.map((ticket) => (
              <>
                <tr>
                  <td>{ticket.id}</td>
                  <td>{ticket.startDate}</td>
                  <td>{ticket.league.name}</td>
                  <td>{ticket.opposingTeam.name}</td>
                  <td>{ticket.league.round}</td>
                  <td>{ticket.is_home ? "Maison" : "Extérieur"}</td>
                  <td>{ticket.tickets}</td>
                  <td>
                    <img
                      src={edite}
                      alt="Modifier"
                      onClick={() => {
                        navigate(`/tiquet/modifier-tiquet/${ticket.id}`);
                      }}
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

export default TicketsMatcheTable;
