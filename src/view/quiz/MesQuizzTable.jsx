/* eslint-disable react-hooks/exhaustive-deps */
import "../produit/ProductTable.css";
import { deleteIcon, edite } from "../../assets/index";
import { useEffect, useState } from "react";
import PopUp from "../shared/popUp/PopUp";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import usePopUpContext from "../../hooks/usePopUpContext";

const MesQuizzTable = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(0);
  const [offre, setOffre] = useState();
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();
  const { update } = usePopUpContext();

  // get all offres
  const getOffres = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseUrl}quiz/admin/?page=${currentPage}`
      );
      console.log(response);
      setOffre(response.data.data);
      setPages(response.data.pages);
      if (response.data.data.length === 0) {
        setIsEmpty(true);
      }
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
    getOffres();
  }, [currentPage, update]);

  return (
    <>
      {isLoading && <div className="loader">Chargement...</div>}
      {isError && <div className="loader">Erreur de chargement</div>}
      {isEmpty && <div className="loader">Aucun quizz</div>}
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Quizz</th>
            <th>Date du match</th>
            <th>Equipe 1</th>
            <th>Equipe 2</th>
            <th>Coupe à gagner</th>
            <th>Status</th>
            <th>Action </th>
          </tr>
        </thead>
        <tbody>
          {offre &&
            offre.map((offre) => {
              return (
                <>
                  <tr>
                    <td>{offre.id}</td>
                    <td>{offre.startDate}</td>
                    <td>{offre.awayTeam.name}</td>
                    <td>{offre.homeTeam.name}</td>
                    <td>{offre.league}</td>
                    <td>
                      <div className="type">{offre.status}</div>
                    </td>
                    <td>
                      <img
                        src={deleteIcon}
                        alt="Supprimer"
                        className="hover"
                        onClick={() => setShowPopUp(offre.id)}
                      />
                      <img
                        src={edite}
                        alt="Modifier"
                        className="hover"
                        onClick={() => {
                          navigate(`/modifier-quizz/${offre.id}`);
                        }}
                      />
                    </td>
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
      {showPopUp && (
        <PopUp
          setShowPopUp={setShowPopUp}
          text="Vous voulez vraiment supprimer ce quizz?"
          button="Supprimer"
          id={showPopUp}
          action="delete quizz"
        />
      )}
    </>
  );
};

export default MesQuizzTable;
