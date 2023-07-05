/* eslint-disable react/prop-types */
import "./PopUp.css";
import { cancel } from "../../../assets/index";

const PopUp = (props) => {
  return (
    <div className="them">
      <div className="them_container">
        <div className="cancel">
          <img
            src={cancel}
            alt="cancel"
            onClick={() => {
                props.setShowPopUp(false);
            }}
          />
        </div>
        <div className="info">
          <p>Vous voulez vraiment supprimer ce produit?</p>
          <div className="buttons">
            <button
              className="outline annuler"
              onClick={() => {
                props.setShowPopUp(false);
              }}
            >
              Annuler
            </button>
            <button className="elevated Supprimer">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
