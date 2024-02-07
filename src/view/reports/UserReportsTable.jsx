/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { edite } from "../../assets/index";
import "../utilisateurs/UtilisateursTable.css";
import { useEffect, useState } from "react";
import PopUp from "../shared/popUp/PopUp";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils/constants";
import axiosInstance from "../../utils/axiosInstance";
import usePopUpContext from "../../hooks/usePopUpContext";

const UserReportsTable = () => {
  const [showPopUp1, setShowPopUp1] = useState(false);
  const [showPopUp2, setShowPopUp2] = useState(false);
  const [action, setAction] = useState();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const { update } = usePopUpContext();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const style = {
    width: "50%",
    height: "40px",
    margin: "auto",
    fontSize: "20px",
    paddingLeft: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  // Fetch users based on the current page
  const getUsers = async () => {
    try {
      setIsLoading(true);
      setIsEmpty(false);
      const response = await axiosInstance.get(
        `${baseUrl}report/admin/chat/?page=${currentPage}`,
      );
      console.log(response.data.data.pages);
      setUsers(response.data.data.reports);
      if (response.data.data.reports.length === 0) {
        setIsEmpty(true);
      }
      setPages(response.data.data.pages);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    getUsers();
  }, [currentPage, update, user]);

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
            <th>ID Signalement</th>
            <th>Utilisateur Signalé</th>
            <th>Utilisateur qui a signalé</th>
            <th>Nombre total des signalements</th>
            <th>Nombre de points</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const { id } = user;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>
                  <div className="user-details">
                    <img src={`${baseUrl}${user.reported.image}`} alt="user" />
                    <div className="user-info">
                      <p>
                        {user.reported.first_name} {user.reported.last_name}
                      </p>
                      <span>{user.reported.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="user-details">
                    <img src={`${baseUrl}${user.reporter.image}`} alt="user" />
                    <div className="user-info">
                      <p>
                        {user.reporter.first_name} {user.reporter.last_name}
                      </p>
                      <span>{user.reporter.email}</span>
                    </div>
                  </div>
                </td>
                <td>{user.reports_received_count}</td>
                <td>{user.reported.points}</td>
                <td>
                  <div className="action">
                    {action === id && (
                      <div
                        className="edit hover"
                        onClick={() => {
                          if (user.reported.can_chat) {
                            setShowPopUp1(user.reported.id);
                          } else {
                            setShowPopUp2(user.reported.id);
                          }
                        }}
                      >
                        {user.reported.can_chat ? "Bloquer" : "Débloquer"}
                      </div>
                    )}
                    <div className="type">
                      {user.reported.can_chat ? "actif" : "Bloqué"}
                    </div>
                  </div>
                </td>
                <td>
                  <img
                    src={edite}
                    alt="Modifier"
                    className="hover"
                    onClick={() => {
                      if (action === id) {
                        setAction("");
                      } else {
                        setAction(id);
                      }
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={goToPreviousPage}>
          Previous
        </button>
        <span>Page{currentPage}</span>
        <button onClick={goToNextPage} disabled={currentPage == pages}>
          Next
        </button>
      </div>
      {showPopUp1 && (
        <PopUp
          setShowPopUp={setShowPopUp1}
          setAction={setAction}
          text="Vous voulez vraiment désactiver l'envoi de messages à cet utilisateur?"
          button="Désactiver"
          id={showPopUp1}
          action="désactiver"
        />
      )}
      {showPopUp2 && (
        <PopUp
          setShowPopUp={setShowPopUp2}
          setAction={setAction}
          text="Vous voulez vraiment activer l'envoi de messages à cet utilisateur?"
          button="Activer"
          id={showPopUp2}
          action="activer"
        />
      )}
    </>
  );
};

export default UserReportsTable;
