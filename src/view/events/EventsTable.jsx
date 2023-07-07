import { save, accept, refuse } from "../../assets/index";
import "../utilisateurs/DemandeAbonnementTable.css";
import PopUp from "../shared/popUp/PopUp";
import { useState } from "react";

const EventsTable = () => {
  const [showPopUp1, setShowPopUp1] = useState(false);
  const [showPopUp2, setShowPopUp2] = useState(false);
  return (
    <>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Event</th>
            <th>Titre de l’événement</th>
            <th>Type</th>
            <th>Type de résérvation</th>
            <th>Utilisateur</th>
            <th>Prix</th>
            <th>Tiquet</th>
            <th>Date de résérvation</th>
            <th>Paiment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Rorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
            <td>Regroupement</td>
            <td>Versement</td>
            <td>
              <div className="user-details">
                <img src="https://picsum.photos/200" alt="user" />
                <div className="user-info">
                  <p>Utilisateur 1</p>
                  <span>mondher@gmail.com</span>
                </div>
              </div>
            </td>
            <td>12200 DA</td>
            <td>1</td>
            <td>11-02-2023</td>
            <td>Versement</td>
            <td>
              <div className="actions">
                <img src={save} alt="" />
                <img src={accept} alt="" onClick={() => setShowPopUp1("10")} />
                <img src={refuse} alt="" onClick={() => setShowPopUp2("10")} />
              </div>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Rorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
            <td>Regroupement</td>
            <td>Versement</td>
            <td>
              <div className="user-details">
                <img src="https://picsum.photos/200" alt="user" />
                <div className="user-info">
                  <p>Utilisateur 1</p>
                  <span>mondher@gmail.com</span>
                </div>
              </div>
            </td>
            <td>12200 DA</td>
            <td>1</td>
            <td>11-02-2023</td>
            <td>Versement</td>
            <td>
              <div className="actions">
                <img src={save} alt="" />
                <img src={accept} alt="" onClick={() => setShowPopUp1("11")} />
                <img src={refuse} alt="" onClick={() => setShowPopUp2("11")} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {showPopUp1 && (
        <PopUp
          text="Vous voulez vraiment accepter cette réservation?"
          setShowPopUp={setShowPopUp1}
          button="Accepter"
          id={showPopUp1}
        />
      )}
      {showPopUp2 && (
        <PopUp
          text="Vous voulez vraiment refuser cette réservation?"
          setShowPopUp={setShowPopUp2}
          button="Refuser"
          id={showPopUp2}
        />
      )}
    </>
  );
};

export default EventsTable;
