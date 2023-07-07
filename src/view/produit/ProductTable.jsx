import "./ProductTable.css";
import { deleteIcon, edite } from "../../assets/index";
import { useState } from "react";
import PopUp from "../shared/popUp/PopUp";

const ProductTable = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  return (
    <>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID Produit</th>
            <th>Produit</th>
            <th>Prix abonnement gratuit</th>
            <th>Prix abonnement premium</th>
            <th>Prix abonnement pro</th>
            <th>Quantité en stock</th>
            <th>Quantité vendue</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Produit 1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>10</td>
            <td>0</td>
            <td>
              <img
                src={deleteIcon}
                alt="Supprimer"
                onClick={() => {
                  setShowPopUp(true);
                }}
              />
              <img src={edite} alt="Modifier" />
            </td>
            {showPopUp && (
              <PopUp
                setShowPopUp={setShowPopUp}
                text="Vous voulez vraiment supprimer ce produit?"
                id="4"
                button="Supprimer"
              />
            )}
          </tr>
          <tr>
            <td>1</td>
            <td>Produit 1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>10</td>
            <td>0</td>
            <td>
              <img
                src={deleteIcon}
                alt="Supprimer"
                onClick={() => setShowPopUp(true)}
              />
              <img src={edite} alt="Modifier" />
            </td>
            {showPopUp && (
              <PopUp
                setShowPopUp={setShowPopUp}
                text="Vous voulez vraiment supprimer ce produit?"
                id="4"
                button="Supprimer"
              />
            )}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ProductTable;
