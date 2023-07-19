/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useEffect, useState } from "react";

const CadeauxTable = () => {
  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  // get users
  const getUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseUrl}accounts/users/?page=${currentPage}`
      );
      console.log(response);
      setUsers(response.data.data.users);
      if (response.data.data.users.length === 0) {
        setIsEmpty(true);
      }
      setPages(response.data.data.pages);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    getUsers();
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
      {isEmpty && <div className="loader">Aucun utilisateur</div>}
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Utilisateur</th>
            <th>Utilisateur</th>
            <th>Téléphone</th>
            <th>Abonnement</th>
            <th>Total des Points</th>
            <th>Points expectations</th>
            <th>Etoiles</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            return (
              <>
                <tr>
                  <td>{user.id}</td>
                  <td>
                    <div className="user-details">
                      <img src={`${baseUrl}${user.image}`} alt="user" />
                      <div className="user-info">
                        <p>
                          {user.first_name} {user.last_name}
                        </p>
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{user.phone_no}</td>
                  <td>{user.plan_name}</td>
                  <td>{user.points}</td>
                  <td>1200</td>
                  <td>{user.stars}</td>
                  <td>
                    <div className="type">
                      {user.is_active ? "ACTIF" : "BLOQUÉ²"}
                    </div>
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

export default CadeauxTable;
