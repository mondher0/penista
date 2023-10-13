/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { deleteIcon, edite } from "../../assets/index";
import usePopUpContext from "../../hooks/usePopUpContext";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import PopUp from "../shared/popUp/PopUp";
import { useNavigate } from "react-router-dom";

const CategoriesTable = () => {
  const [showPopUp, setShowPopUp] = useState("");
  const [categories, setCategories] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const { update } = usePopUpContext();
  const navigate = useNavigate();

  // get categories from database
  const getCategories = async () => {
    setIsEmpty(false);
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `${baseUrl}category/admin/?page=${currentPage}`
      );
      console.log(response);
      setCategories(response.data.data);
      if (response.data.data.length === 0) setIsEmpty(true);
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
    getCategories();
  }, [currentPage, update]);

  return (
    <>
      {isLoading && <div className="loader">Chargement...</div>}
      {isError && <div className="loader">Erreur de chargement</div>}
      {isEmpty && <div className="loader">Aucun produit</div>}
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Catégories</th>
            <th>Catégorie</th>
            <th>Sous catégories</th>
            <th>Nombre de produits</th>
            <th>Action </th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((categorie) => {
              return categorie.subCategories.map((subCategorie, index) => {
                return (
                  <tr key={index}>
                    <td>{categorie.id}</td>
                    <td>{categorie.name}</td>
                    <td>{subCategorie.name}</td>
                    <td>missing from backend</td>
                    <td>
                      <img
                        src={deleteIcon}
                        alt="Supprimer"
                        className="hover"
                        onClick={() => setShowPopUp(categorie.id)}
                      />
                      <img
                        src={edite}
                        alt="Modifier"
                        className="hover"
                        onClick={() =>
                          navigate(
                            `/categories/modifier-categorie/${categorie.id}`
                          )
                        }
                      />
                    </td>
                  </tr>
                );
              });
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
          text="Vous voulez vraiment supprimer cette categorie?"
          id={showPopUp}
          button="Supprimer"
          action="deleteCategorie"
        />
      )}
    </>
  );
};

export default CategoriesTable;
