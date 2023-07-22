/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { save, accept, refuse } from "../../assets/index";
import "./DemandeAbonnementTable.css";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useEffect, useState } from "react";
import PopUp from "../shared/popUp/PopUp";
import usePopUpContext from "../../hooks/usePopUpContext";

const SingleUtilisateurEventsTable = ({ id }) => {
  const { update } = usePopUpContext();
  const [showPopUp1, setShowPopUp1] = useState(false);
  const [showPopUp2, setShowPopUp2] = useState(false);
  const [reservations, setReservations] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  // get all events of the user
  const getUserEvents = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseUrl}reservation/user/${id}/?page=${currentPage}`
      );
      console.log(response);
      setReservations(response.data.reservations);
      if (response.data.reservations.length === 0) {
        setIsEmpty(true);
      }
      setPages(response.data.pages);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  // download image
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

  // Pagination handlers
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    getUserEvents();
  }, [currentPage, update]);

  return (
    <>
      {isLoading && <div className="loader">Chargement...</div>}
      {isError && <div className="loader">Erreur de chargement</div>}
      {isEmpty && <div className="loader">Aucun événement</div>}
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Event</th>
            <th>Titre de l’événement</th>
            <th>Type</th>
            <th>Type de résérvation</th>
            <th>Prix</th>
            <th>Tiquet</th>
            <th>Date de résérvation</th>
            <th>Paiment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations &&
            reservations.map((reservation) => {
              console.log(reservation.status);
              return (
                <>
                  <tr key={reservation.id}>
                    <td>{reservation.id}</td>
                    <td>{reservation.event_detail.title}</td>
                    <td>{reservation.event_detail.type}</td>
                    <td>
                      {reservation.event_detail.res_type === "bank transfer"
                        ? "Versement"
                        : reservation.event_detail.res_type}
                    </td>
                    <td>{reservation.totalPrice} DA</td>
                    <td>{reservation.ticket}</td>
                    <td>{reservation.reservationDate}</td>
                    <td>
                      {reservation.payment === "bank transfer"
                        ? "Versement"
                        : reservation.payment}
                    </td>
                    <td>
                      <div className="actions">
                        {reservation.payment === "bank transfer" ? (
                          <img
                            src={save}
                            alt=""
                            onClick={() => {
                              handleDownload(reservation.image);
                            }}
                          />
                        ) : null}
                        {reservation.payment === "bank transfer" &&
                        reservation.status === "WAITING" ? (
                          <>
                            {" "}
                            <img
                              src={accept}
                              alt=""
                              onClick={() => setShowPopUp1(reservation.id)}
                            />
                            <img
                              src={refuse}
                              alt=""
                              onClick={() => setShowPopUp2(reservation.id)}
                            />
                          </>
                        ) : null}
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
      {showPopUp1 && (
        <PopUp
          text="Vous voulez vraiment accepter cette réservation?"
          setShowPopUp={setShowPopUp1}
          button="Accepter"
          id={showPopUp1}
          action="accept"
        />
      )}
      {showPopUp2 && (
        <PopUp
          text="Vous voulez vraiment refuser cette réservation?"
          setShowPopUp={setShowPopUp2}
          button="Refuser"
          id={showPopUp2}
          action="refuse"
        />
      )}
    </>
  );
};

export default SingleUtilisateurEventsTable;
