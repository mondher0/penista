/* eslint-disable react-hooks/exhaustive-deps */
import "../produit/ProductTable.css";
import { club, edite, primaryCard, secondaryCard } from "../../assets/index";
import { useEffect, useState } from "react";
import "../utilisateurs/UtilisateursTable.css";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import "./SettingsImageTable.css";
import usePopUpContext from "../../hooks/usePopUpContext";

const ClubsTable = () => {
  const [action, setAction] = useState();
  const [ads, setAds] = useState();
  const { update } = usePopUpContext();
  const [isLoading1, setIsLoading1] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);

  // get all ads
  const getAllAds = async () => {
    try {
      setIsLoading1(true);
      const response = await axiosInstance.get(
        `${baseUrl}ads/?page=${currentPage}`
      );
      setAds(response.data.data);
      setPages(response.data.pages);
      if (response.data.data.length === 0) {
        setIsEmpty(true);
      }
      setIsLoading1(false);
    } catch (error) {
      setIsLoading1(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    getAllAds();
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
      {isLoading1 && <div className="loader">Chargement...</div>}
      {isError && <div className="loader">Erreur de chargement</div>}
      {isEmpty && <div className="loader">Aucune publicitée</div>}
      <table className="product-table">
        <thead>
          <tr>
            <th>Photo club</th>
            <th>Nom du club</th>
            <th>Carte (Primaire)</th>
            <th>Carte (Secondaire)</th>
            <th>Type de paiement</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ads &&
            ads.map((ad) => (
              <>
                <tr key={ad.id}>
                  <td>
                    <img src={club} alt="club"  />
                  </td>
                  <td>Real Madrid</td>
                  <td>
                    <img src={primaryCard} alt="Pub"  />
                  </td>
                  <td>
                  <img src={secondaryCard} alt="Pub" />
                </td>
                  <td>
                  Reçu et Yalidine
                  </td>
                  <td>
                    <img
                      src={edite}
                      alt="Modifier"
                      className="hover"
                      onClick={() => {
                        if (action == ad.id) {
                          setAction("");
                        } else {
                          setAction(ad.id);
                        }
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

export default ClubsTable;
