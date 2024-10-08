import { save, accept, refuse } from "../../assets/index";
import "./DemandeAbonnementTable.css";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useEffect, useState } from "react";
import PopUp from "../shared/popUp/PopUp";
import usePopUpContext from "../../hooks/usePopUpContext";
import { useNavigate } from "react-router-dom";

const DemandeAbonnementTable = () => {
  const [demandeAbonnement, setDemandeAbonnement] = useState();
  const { update } = usePopUpContext();
  const [showPopUp1, setShowPopUp1] = useState(false);
  const [showPopUp2, setShowPopUp2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const style = {
    width: "50%",
    height: "40px",
    margin: "auto",
    fontSize: "20px",
    paddingLeft: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };
  const [user, setUser] = useState();

  // Get all demande abonnement
  const getDemandeAbonnement = async () => {
    try {
      setIsLoading(true);
      setIsEmpty(false);
      const response = await axiosInstance.get(
        `${baseUrl}accounts/subscription/?page=${currentPage}
          ${user ? `&q=${user}` : ""}
        `,
      );
      setPages(response.data.data.pages);
      setDemandeAbonnement(response.data.data.subscriptions);
      if (demandeAbonnement?.length === 0) {
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

  const handleDownload = async (url) => {
    if (!url) {
      return;
    }
    const imageUrl = `${baseUrl}${url}`; // Replace with the URL of the image you want to download

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "image.jpg"; // Replace with the desired filename for the downloaded image
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  useEffect(() => {
    getDemandeAbonnement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, update, user]);

  return (
    <>
      <input
        type="text"
        onChange={(e) => setUser(e.target.value)}
        style={style}
        placeholder="Rechercher un utilisateur"
      />
      {isLoading && <div className="loader">Chargement...</div>}{" "}
      {isEmpty && <div className="loader">Aucune demande d{"'"}abonnement</div>}
      {isError && <div className="loader">Erreur de chargement</div>}
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Demande</th>
            <th>Utilisateur</th>
            <th>Club</th>
            <th>Abonnement</th>
            <th>Date de demande</th>
            <th>Paiement</th>
            <th>Action </th>
          </tr>
        </thead>
        <tbody>
          {demandeAbonnement &&
            demandeAbonnement.map((demande) => {
              return (
                <tr key={demande.id}>
                  <td>{demande.id}</td>
                  <td>
                    <div className="user-details">
                      <img src={`${baseUrl}${demande.user.image}`} alt="user" />
                      <div className="user-info">
                        <p>{demande.user.first_name}</p>
                        <span>{demande.user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{demande.user?.team?.name}</td>
                  <td>{demande.plan.name}</td>
                  <td>{demande.start_date}</td>
                  <td>
                    {demande.payment_type === "bank transfer"
                      ? "Versement"
                      : demande.delivery_agency}
                  </td>
                  <td>
                    <div className="actions">
                      {/* Save image with onClick event handler */}
                      {demande.payment_type !== "on delivery" && (
                        <img
                          src={save}
                          alt=""
                          className="hover"
                          onClick={() => {
                            handleDownload(demande.payment_receipt);
                            const imageUrl = demande.payment_receipt;
                            const imageNameWithExtension = imageUrl.substring(
                              imageUrl.lastIndexOf("/") + 1,
                            );
                            const imageName =
                              imageNameWithExtension.split(".")[0];
                            const imageExtension =
                              imageNameWithExtension.split(".")[1];
                            console.log("Image Name: " + imageName);
                            console.log("Image Extension: " + imageExtension);
                            navigate(
                              `/telecharger-reçu/${imageName}?extension=${imageExtension}`,
                            );
                          }}
                        />
                      )}
                      {demande.status === "WAITING" && (
                        <>
                          <img
                            src={accept}
                            alt=""
                            className="hover"
                            onClick={() => {
                              setShowPopUp1(demande.id);
                            }}
                          />
                          <img
                            src={refuse}
                            alt=""
                            className="hover"
                            onClick={() => {
                              setShowPopUp2(demande.id);
                            }}
                          />
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={goToPreviousPage}>
          Previous
        </button>
        <span>Page{currentPage}</span>
        <button onClick={goToNextPage} disabled={currentPage === pages}>
          Next
        </button>
      </div>
      {showPopUp1 && (
        <PopUp
          text="Vous voulez vraiment accepter cette demande?"
          setShowPopUp={setShowPopUp1}
          button="Accepter"
          id={showPopUp1}
          action="accept demande abonnement"
        />
      )}
      {showPopUp2 && (
        <PopUp
          text="Vous voulez vraiment refuser cette demande?"
          setShowPopUp={setShowPopUp2}
          button="Refuser"
          id={showPopUp2}
          action="refuse demande abonnement"
        />
      )}
    </>
  );
};

export default DemandeAbonnementTable;
