import { save, accept, refuse } from "../../assets/index";
import "./DemandeAbonnementTable.css";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useEffect, useState } from "react";
import PopUp from "../shared/popUp/PopUp";
import usePopUpContext from "../../hooks/usePopUpContext";

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

  // Get all demande abonnement
  const getDemandeAbonnement = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseUrl}accounts/subscription/?page=${currentPage}`
      );
      console.log(response);
      setPages(response.data.data.pages);
      setDemandeAbonnement(response.data.data.subscriptions);
      if (demandeAbonnement?.length === 0) {
        setIsEmpty(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
    console.log(url);
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
  }, [currentPage, update]);

  return (
    <>
      {isLoading && <div className="loader">Chargement...</div>}{" "}
      {isEmpty && <div className="loader">Aucune demande d{"'"}abonnement</div>}
      {isError && <div className="loader">Erreur de chargement</div>}
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Demande</th>
            <th>Utilisateur</th>
            <th>Abonnement</th>
            <th>Date de demande</th>
            <th>Paiement</th>
            <th>Action </th>
          </tr>
        </thead>
        <tbody>
          {demandeAbonnement &&
            demandeAbonnement.map((demande) => {
              console.log(demande.payment_receipt);
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
                      <img
                        src={save}
                        alt=""
                        className="hover"
                        onClick={() => {
                          handleDownload(demande.payment_receipt);
                        }}
                      />
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
