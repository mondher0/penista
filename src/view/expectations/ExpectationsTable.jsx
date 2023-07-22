/* eslint-disable react-hooks/exhaustive-deps */
import "../utilisateurs/DemandeAbonnementTable.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";

const ExpectationsTable = () => {
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
      const response = await axiosInstance.get(
        `${baseUrl}expectation/?page=${currentPage}`
      );
      console.log(response);
      setExpectations(response.data.data);
      if (response.data.data.length === 0) {
        setIsEmpty(true);
      }
      setPages(response.data.pages);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    getAllExpectations();
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
      {isEmpty && <div className="loader">Aucune expectation</div>}
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Expectation</th>
            <th>Date du match</th>
            <th>Nom adversaire</th>
            <th>Utilisateur</th>
            <th>Etat</th>
            <th>Real Madrid</th>
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
                    <td>{expectation.match_info.opposingTeam.name}</td>
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
                      {expectation.answer.ourTeamGoals >
                      expectation.answer.opposingTeam
                        ? "Victoire"
                        : expectation.answer.ourTeamGoals <
                          expectation.answer.opposingTeam
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
