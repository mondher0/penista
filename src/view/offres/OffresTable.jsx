import "../produit/ProductTable.css";
import { deleteIcon, edite } from "../../assets/index";
import { useState } from "react";
import PopUp from "../shared/popUp/PopUp";

const OffresTable = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  return (
    <>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Offre</th>
            <th>Titre de l’offre</th>
            <th>Pourcentage de réduction</th>
            <th>Code promo</th>
            <th>Fin de l’offre</th>
            <th>Status offre</th>
            <th>Action </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>converse chuck taylors all stars leather hightops</td>
            <td>10000 DA</td>
            <td>SHOESLOVER</td>
            <td>10/10/2023 00:00h</td>
            <td>
              <div className="type">Actif</div>
            </td>
            <td>
              <img
                src={deleteIcon}
                alt="Supprimer"
                onClick={() => setShowPopUp("1")}
              />
              <img src={edite} alt="Modifier" />
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>converse chuck taylors all stars leather hightops</td>
            <td>10000 DA</td>
            <td>SHOESLOVER</td>
            <td>10/10/2023 00:00h</td>
            <td>
              <div className="type">Actif</div>
            </td>
            <td>
              <img
                src={deleteIcon}
                alt="Supprimer"
                onClick={() => setShowPopUp("2")}
              />
              <img src={edite} alt="Modifier" />
            </td>
          </tr>
        </tbody>
      </table>
      {showPopUp && (
        <PopUp
          setShowPopUp={setShowPopUp}
          text="Vous voulez vraiment supprimer cette offre?"
          button="Supprimer"
          id={showPopUp}
        />
      )}
    </>
  );
};

export default OffresTable;
