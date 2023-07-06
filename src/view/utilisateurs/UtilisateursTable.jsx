import { edite } from "../../assets/index";
import "./UtilisateursTable.css";
import { useState } from "react";
import PopUp from "../shared/popUp/PopUp";

const UtilisateursTable = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [action, setAction] = useState(false);
  return (
    <>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Utilisateur</th>
            <th>Utilisateur</th>
            <th>Téléphone</th>
            <th>Wilaya</th>
            <th>Sexe</th>
            <th>Abonnement</th>
            <th>Date d’inscription</th>
            <th>Commande</th>
            <th>Evénement</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              <div className="user-details">
                <img src="https://picsum.photos/200" alt="user" />
                <div className="user-info">
                  <p>Utilisateur 1</p>
                  <span>mondher@gmail.com</span>
                </div>
              </div>
            </td>
            <td>0558604705</td>
            <td>Béjaia</td>
            <td>Féminin</td>
            <td>Gratuit</td>
            <td>11-02-2023</td>
            <td>32</td>
            <td>40</td>
            <td>
              <div className="type">
                <select name="status" id="status">
                  <option value="actif">Actif</option>
                  <option value="inactif">Bloquer</option>
                </select>
              </div>
            </td>
            <td>
              <img src={edite} alt="Consulter" />
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>
              <div className="user-details">
                <img src="https://picsum.photos/200" alt="user" />
                <div className="user-info">
                  <p>Utilisateur 1</p>
                  <span>mondher@gmail.com</span>
                </div>
              </div>
            </td>
            <td>0558604705</td>
            <td>Béjaia</td>
            <td>Féminin</td>
            <td>Gratuit</td>
            <td>11-02-2023</td>
            <td>32</td>
            <td>40</td>
            <td>
              <div className="action">
                {action && (
                  <div
                    className="edit"
                    onClick={() => {
                      setShowPopUp(true);
                    }}
                  >
                    Bloquer
                  </div>
                )}
                <div className="type">Commande</div>
              </div>
            </td>
            <td>
              <img
                src={edite}
                alt="Modifier"
                onClick={() => {
                  setAction(!action);
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {showPopUp && (
        <PopUp
          setShowPopUp={setShowPopUp}
          setAction={setAction}
          text="Vous voulez vraiment bloquer
      cet utilisateur?"
          id="4"
        />
      )}
    </>
  );
};

export default UtilisateursTable;
