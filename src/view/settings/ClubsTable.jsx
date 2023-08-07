/* eslint-disable react-hooks/exhaustive-deps */
import "../produit/ProductTable.css";
import { edite } from "../../assets/index";
import { useEffect, useState } from "react";
import "../utilisateurs/UtilisateursTable.css";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import "./SettingsImageTable.css";

const ClubsTable = () => {
  const [teams, setTeams] = useState();
  const [isLoading1, setIsLoading1] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);

  // get all teams
  const getTeams = async () => {
    try {
      setIsLoading1(true);
      const response = await axiosInstance.get(
        `${baseUrl}teams/active/?page=${currentPage}`
      );
      console.log(response);
      setTeams(response.data.data.teams);
      setPages(response.data.data.pages);
      if (response.data.data.teams.length === 0) {
        setIsEmpty(true);
      }
      setIsLoading1(false);
    } catch (error) {
      console.log(error);
      setIsLoading1(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    getTeams();
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
          {teams &&
            teams.map((team) => (
              <>
                <tr key={team.id}>
                  <td>
                    <img src={team.logo} alt="club" />
                  </td>
                  <td>{team.name}</td>
                  <td>
                    <img
                      src={`${baseUrl}${team.card_primary}`}
                      alt="Pub"
                      width="170px"
                      height="100px"
                    />
                  </td>
                  <td>
                    <img
                      src={`${baseUrl}${team.card_secondary}`}
                      alt="Pub"
                      width="170px"
                      height="100px"
                    />
                  </td>
                  <td>Reçu et Yalidine</td>
                  <td>
                    <img src={edite} alt="Modifier" className="hover" />
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
