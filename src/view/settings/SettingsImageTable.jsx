import "../produit/ProductTable.css";
import { deleteIcon, edite } from "../../assets/index";
import { useEffect, useState } from "react";
import PopUp from "../shared/popUp/PopUp";
import "../utilisateurs/UtilisateursTable.css";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import "./SettingsImageTable.css";
import usePopUpContext from "../../hooks/usePopUpContext";

const SettingsImageTable = () => {
  const [showPopUp1, setShowPopUp1] = useState("");
  const [showPopUp2, setShowPopUp2] = useState("");
  const [showPopUp3, setShowPopUp3] = useState("");
  const [action, setAction] = useState();
  const [ads, setAds] = useState();
  const { update } = usePopUpContext();
  const [isLoading1, setIsLoading1] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  // get all ads
  const getAllAds = async () => {
    try {
      setIsLoading1(true);
      const response = await axiosInstance.get(`${baseUrl}ads/`);
      console.log(response);
      setAds(response.data.data);
      if (response.data.data.length === 0) {
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
    getAllAds();
  }, [update]);
  return (
    <>
      {isLoading1 && <div className="loader">Chargement...</div>}
      {isError && <div className="loader">Erreur de chargement</div>}
      {isEmpty && <div className="loader">Aucune publicitée</div>}
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Note</th>
            <th>Date d’ajout</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ads &&
            ads.map((ad) => (
              <>
                <tr>
                  <td>
                    <img
                      src={`${baseUrl}${ad.image}`}
                      alt="Pub"
                      className="pub"
                    />
                  </td>
                  <td>{ad.title}</td>
                  <td>{ad.createdAt}</td>
                  <td>
                    <div className="action">
                      {action == ad.id && (
                        <div
                          className="edit"
                          onClick={() => {
                            if (ad.is_active) {
                              setShowPopUp2(ad.id);
                            } else {
                              setShowPopUp3(ad.id);
                              console.log(showPopUp3);
                            }
                          }}
                        >
                          {ad.is_active ? "Suspendre" : "Activer"}
                        </div>
                      )}
                      <div className="type">
                        {ad.is_active ? "ACTIF" : "INACTIF"}
                      </div>
                    </div>
                  </td>
                  <td>
                    <img
                      src={deleteIcon}
                      alt="Supprimer"
                      onClick={() => {
                        setShowPopUp1(ad.id);
                      }}
                    />
                    <img
                      src={edite}
                      alt="Modifier"
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
      {showPopUp1 && (
        <PopUp
          setShowPopUp={setShowPopUp1}
          text="Vous voulez vraiment supprimer cette publicités?"
          id={showPopUp1}
          button="Supprimer"
          action="delete ad"
        />
      )}
      {showPopUp2 && (
        <PopUp
          setShowPopUp={setShowPopUp2}
          text="Vous voulez vraiment Suspendre cette publicités?"
          id={showPopUp2}
          button="Suspendre"
          setAction={setAction}
          action="change ad status"
        />
      )}
      {showPopUp3 && (
        <PopUp
          setShowPopUp={setShowPopUp3}
          text="Vous voulez vraiment Activer cette publicités?"
          id={showPopUp3}
          button="Activer"
          setAction={setAction}
          action="change ad status"
        />
      )}
    </>
  );
};

export default SettingsImageTable;
