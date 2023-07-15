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
  // get all demande abonnement
  const getDemandeAbonnement = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${baseUrl}accounts/subscription/?page=20`
      );
      console.log(response);
      // filter demande abonnement that have status waiting
      const demandeAbonnement = response.data.data.filter(
        (demande) => demande.status == "WAITING"
      );
      if (demandeAbonnement.length === 0) {
        setIsEmpty(true);
      }
      setDemandeAbonnement(demandeAbonnement);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDemandeAbonnement();
  }, [update]);

  return (
    <>
      {isLoading && <div className="loader">Chargement...</div>}
      {isEmpty && <div className="loader">Aucune demande d{"'"}abonnement</div>}
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
              return (
                <>
                  <tr key={demande.id}>
                    <td>{demande.id}</td>
                    <td>
                      <div className="user-details">
                        <img src="https://picsum.photos/200" alt="user" />
                        <div className="user-info">
                          <p>Utilisateur 1</p>
                          <span>mondher@gmail.com</span>
                        </div>
                      </div>
                    </td>
                    <td>{demande.plan}</td>
                    <td>{demande.start_date}</td>
                    <td>Versement</td>
                    <td>
                      <div className="actions">
                        <img src={save} alt="" />
                        <img
                          src={accept}
                          alt=""
                          onClick={() => {
                            setShowPopUp1(demande.id);
                          }}
                        />
                        <img
                          src={refuse}
                          alt=""
                          onClick={() => {
                            setShowPopUp2(demande.id);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
      {showPopUp1 && (
        <PopUp
          text="Vous voulez vraiment accepter cette réservation?"
          setShowPopUp={setShowPopUp1}
          button="Accepter"
          id={showPopUp1}
          action="accept demande abonnement"
        />
      )}
      {showPopUp2 && (
        <PopUp
          text="Vous voulez vraiment refuser cette réservation?"
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
