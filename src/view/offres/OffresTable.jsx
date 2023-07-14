import "../produit/ProductTable.css";
import { deleteIcon, edite } from "../../assets/index";
import { useEffect, useState } from "react";
import PopUp from "../shared/popUp/PopUp";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";

const OffresTable = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(0);

  const [offre, setOffre] = useState();
  const getOffrs = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`${baseUrl}promotion/`);
      console.log(response);
      setOffre(response.data.data.Promotions);
      setPages(response.data.data.pages);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
    getOffrs();
  }, [currentPage]);

  return (
    <>
      {isLoading && <div className="loader">Chargement...</div>}
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Offre</th>
            <th>Titre de l’offre</th>
            <th>Pourcentage de réduction</th>
            <th>Code promo</th>
            <th>Fin de l’offre</th>
            <th>Status offre</th>
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
                    <td>{offre.title}</td>
                    <td>{offre.percentage}</td>
                    <td>{offre.promo_code}</td>
                    <td>{offre.expirationDate}</td>
                    <td>
                      <div className="type">
                        {offre.status ? "Actif" : "Inactif"}
                      </div>
                    </td>
                    <td>
                      <img
                        src={deleteIcon}
                        alt="Supprimer"
                        onClick={() => setShowPopUp("1")}
                      />
                      <img src={edite} alt="Modifier" />
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
          text="Vous voulez vraiment supprimer cette offre?"
          button="Supprimer"
          id={showPopUp}
        />
      )}
    </>
  );
};

export default OffresTable;
