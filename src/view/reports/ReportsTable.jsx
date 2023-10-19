/* eslint-disable react-hooks/exhaustive-deps */
import "../produit/ProductTable.css";
import { eye } from "../../assets/index";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import usePopUpContext from "../../hooks/usePopUpContext";
import "../produit/AddProductPage.css";

const ReportsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(0);
  const [offre, setOffre] = useState();
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const { update } = usePopUpContext();
  const navigate = useNavigate();

  // get all offres
  const getOffres = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseUrl}report/admin/?page=${currentPage}`
      );
      console.log(response);
      setOffre(response.data.data.reports);
      setPages(response.data.data.pages);
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
            <th>ID Signalement</th>
            <th>Utilisateur</th>
            <th>Date d’envoie</th>
            <th>Objet</th>
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
                    <td>
                      <div className="user-details">
                        <img
                          src={`${baseUrl}${offre.user.image}`}
                          alt="user"
                        />
                        <div className="user-info">
                          <p>{offre.user.first_name} {offre.user.first_last_name}</p>
                          <span>{offre.user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>{offre.create_date}</td>
                    <td>{offre.subject}</td>
                    <td>
                      <img
                        src={eye}
                        alt="Supprimer"
                        className="hover"
                        onClick={() =>
                          navigate(`/voir-signalement/${offre.id}`)
                        }
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
    </>
  );
};

export default ReportsTable;
