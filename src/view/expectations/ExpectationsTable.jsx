/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import "../utilisateurs/DemandeAbonnementTable.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";

const ExpectationsTable = (props) => {
  const [expectations, setExpectations] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  // get all expectations
  const getAllExpectations = async () => {
    try {
      setIsLoading(true);
      setIsEmpty(false);
      setIsError(false);
      const response = await axiosInstance.get(
        `${baseUrl}expectation/?page=${currentPage}&matchStatusExpectation=${props.etat}&team=${props.adversaire}&matchDate=${props.date}`
      );
      setExpectations(response.data.data);
      if (response.data.data?.length === 0) {
        setIsEmpty(true);
      }
      setPages(response.data.pages);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    getAllExpectations();
  }, [currentPage, props.filter]);

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
      {isEmpty && <div className="loader">Aucune expectation</div>}
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Expectation</th>
            <th>Date du match</th>
            <th>Nom club</th>
            <th>Nom adversaire</th>
            <th>Utilisateur</th>
            <th>Etat</th>
            <th>Club</th>
            <th>Adversaire</th>
          </tr>
        </thead>
        <tbody>
          {expectations &&
            expectations.map((expectation) => {
              return (
                <>
                  <tr key={expectation.id}>
                    <td>{expectation.id}</td>
                    <td>{expectation.match_info.startDate}</td>
                    <td>{expectation.client_info.team?.name}</td>
                    <td>
                      {expectation.match_info.awayTeam?.name ===
                      expectation.client_info.team?.name
                        ? expectation.match_info.homeTeam?.name
                        : expectation.match_info.awayTeam?.name}
                    </td>
                    <td>
                      <div className="user-details">
                        <img
                          src={`${baseUrl}${expectation.client_info.image}`}
                          alt="user"
                        />
                        <div className="user-info">
                          <p>
                            {expectation.client_info.first_name}{" "}
                            {expectation.client_info.last_name}
                          </p>
                          <span>{expectation.client_info.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      {expectation.answer.win
                        ? "Victoire"
                        : expectation.answer.win === false
                        ? "Défaite"
                        : "Nul"}
                    </td>
                    <td>{expectation.answer.ourTeamGoals}</td>
                    <td>{expectation.answer.opposingTeam}</td>
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

export default ExpectationsTable;
