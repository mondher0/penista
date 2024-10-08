/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
import "../produit/ProductTable.css";
import { edite, pause, play } from "../../assets/index";
import "../utilisateurs/UtilisateursTable.css";
import "./SettingsPageTable.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import usePopUpContext from "../../hooks/usePopUpContext";
const SettingsPageTable = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState();
  const { update, setUpdate } = usePopUpContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nmbrPages, setNmbrPages] = useState(1);

  // get all pages
  const getAllPages = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseUrl}page/?page=${currentPage}`
      );
      setPages(response.data.data);
      setNmbrPages(response.data.pages);
      if (response.data.data.length === 0) {
        setIsEmpty(true);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  // change status
  const handleChangeStatus = async (id) => {
    try {
      const response = await axiosInstance.post(`${baseUrl}page/status/${id}/`);
      setUpdate(!update);
    } catch (error) {
    }
  };

  useEffect(() => {
    getAllPages();
  }, [currentPage, update]);

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
      {isEmpty && <div className="loader">Aucune page</div>}
      <table className="product-table">
        <thead>
          <tr>
            <th>Titre de la page</th>
            <th>Dernière date de modification</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pages &&
            pages.map((page) => (
              <>
                <tr key={page.id}>
                  <td>{page.title}</td>
                  <td>{page.lastModification}</td>
                  <td>
                    <div className="type">
                      {page.is_active ? "Active" : "Inactive"}
                    </div>
                  </td>
                  <td>
                    <div className="action">
                      <img
                        src={page.is_active ? pause : play}
                        alt="Supprimer"
                        className="hover"
                        onClick={() => {
                          handleChangeStatus(page.id);
                        }}
                      />
                      <img
                        src={edite}
                        alt="Modifier"
                        className="hover"
                        onClick={() =>
                          navigate(`/parametres/${page.id}/modifier`)
                        }
                      />
                    </div>
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
        <button onClick={goToNextPage} disabled={currentPage == nmbrPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default SettingsPageTable;
