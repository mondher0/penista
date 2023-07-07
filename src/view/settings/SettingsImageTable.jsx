import "../produit/ProductTable.css";
import { deleteIcon, edite, pub } from "../../assets/index";
import { useState } from "react";
import PopUp from "../shared/popUp/PopUp";
import "../utilisateurs/UtilisateursTable.css";

const SettingsImageTable = () => {
  const [showPopUp1, setShowPopUp1] = useState("");
  const [showPopUp2, setShowPopUp2] = useState("");
  const [action, setAction] = useState();
  return (
    <>
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
          <tr>
            <td>
              <img src={pub} alt="Pub" />
            </td>
            <td>Lorem ipsum</td>
            <td>12-12-2022</td>
            <td>
              <div className="action">
                {action == "3" && (
                  <div
                    className="edit"
                    onClick={() => {
                      setShowPopUp2("3");
                    }}
                  >
                    Suspendre
                  </div>
                )}
                <div className="type">Commande</div>
              </div>
            </td>
            <td>
              <img
                src={deleteIcon}
                alt="Supprimer"
                onClick={() => {
                  setShowPopUp1("3");
                }}
              />
              <img src={edite} alt="Modifier" onClick={() => setAction("3")} />
            </td>
          </tr>
          <tr>
            <td>
              <img src={pub} alt="Pub" />
            </td>
            <td>Lorem ipsum</td>
            <td>12-12-2022</td>
            <td>
              <div className="action">
                {action == "4" && (
                  <div
                    className="edit"
                    onClick={() => {
                      setShowPopUp2("4");
                    }}
                  >
                    Suspendre
                  </div>
                )}
                <div className="type">Commande</div>
              </div>
            </td>
            <td>
              <img
                src={deleteIcon}
                alt="Supprimer"
                onClick={() => {
                  setShowPopUp1("4");
                }}
              />
              <img
                src={edite}
                alt="Modifier"
                onClick={() => {
                  if (action == "4") {
                    setAction("");
                  } else {
                    setAction("4");
                  }
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {showPopUp1 && (
        <PopUp
          setShowPopUp={setShowPopUp1}
          text="Vous voulez vraiment supprimer cette publicités?"
          id={showPopUp1}
          button="Supprimer"
        />
      )}
      {showPopUp2 && (
        <PopUp
          setShowPopUp={setShowPopUp2}
          text="Vous voulez vraiment Suspendre cette publicités?"
          id={showPopUp2}
          button="Suspendre"
          setAction={setAction}
        />
      )}
    </>
  );
};

export default SettingsImageTable;
