/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import "../utilisateurs/DemandeAbonnementTable.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
const QuizTable = (props) => {
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
      console.log(props.date);
      const response = await axiosInstance.get(
        `${baseUrl}quiz/admin/answers/?page=${currentPage}&status=${props.etat}&team=${props.adversaire}&matchDate=${props.date}`
      );
      console.log(response);
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
  // Pagination handlers
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    getAllExpectations();
  }, [currentPage, props.filter]);
  return (
    <>
      {isLoading && <div className="loader">Chargement...</div>}
      {isError && <div className="loader">Erreur de chargement</div>}
      {isEmpty && <div className="loader">Aucune quizz</div>}
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Expectation</th>
            <th>Date du match</th>
            <th>Nom Equipe 1</th>
            <th>Nom Equipe 2</th>
            <th>Utilisateur</th>
            <th>Etat</th>
            <th>Equipe 1</th>
            <th>Equipe 2</th>
          </tr>
        </thead>
        <tbody>
          {expectations &&
            expectations.map((expectation, index) => {
              return (
                <>
                  <tr key={index}>
                    <td>{expectation.id}</td>
                    <td>{expectation.quiz.startDate}</td>
                    <td>{expectation.quiz.homeTeam.name}</td>
                    <td>{expectation.quiz.awayTeam.name}</td>
                    <td>
                      <div className="user-details">
                        <img
                          src={`${baseUrl}${expectation.user.image}`}
                          alt="user"
                        />
                        <div className="user-info">
                          <p>
                            {expectation.user["first-name"]}{" "}
                            {expectation.user.last_name}
                          </p>
                          <span>{expectation.user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      {expectation.awayGoals < expectation.homeGoals
                        ? "Victoire"
                        : expectation.awayGoals > expectation.homeGoals
                        ? "Défaite"
                        : "Nul"}
                    </td>
                    <td>{expectation.homeGoals}</td>
                    <td>{expectation.awayGoals}</td>
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

export default QuizTable;
