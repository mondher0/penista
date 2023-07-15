/* eslint-disable react/prop-types */
import "./PopUp.css";
import { cancel } from "../../../assets/index";
import usePopUpContext from "../../../hooks/usePopUpContext";
const PopUp = (props) => {
  const {
    handleBlock,
    handleUnblock,
    handleDelete,
    handleAccept,
    handleRefuse,
    handleAcceptDemandeAbonnement,
    handleRefuseDemandeAbonnement,
  } = usePopUpContext();
  console.log(props.id);
  return (
    <div className="them">
      <div className="them_container">
        <div className="cancel">
          <img
            src={cancel}
            alt="cancel"
            onClick={() => {
              props.setShowPopUp(false);
              if (props?.setAction) {
                props?.setAction(false);
              }
            }}
          />
        </div>
        <div className="info">
          <p>{props.text}</p>
          <form>
            {props.case === "points" && (
              <input
                type="number"
                placeholder="Nombre de points"
                className="points"
              />
            )}
            <div className="buttons">
              {!props.case && (
                <button
                  className="outline annuler"
                  onClick={() => {
                    props.setShowPopUp(false);
                    if (props?.setAction) {
                      props?.setAction(false);
                    }
                  }}
                >
                  Annuler
                </button>
              )}
              <button
                className="elevated Supprimer"
                type={props.case ? "submit" : "button"}
                onClick={() => {
                  if (props.action === "bloquer") {
                    handleBlock(props.id);
                  }
                  if (props.action === "débloquer") {
                    handleUnblock(props.id);
                  }
                  if (props.action === "deleteProduct") {
                    handleDelete(props.id);
                  }
                  if (props.action === "accept") {
                    handleAccept(props.id);
                  }
                  if (props.action === "refuse") {
                    handleRefuse(props.id);
                  }
                  if (props.action === "accept demande abonnement") {
                    handleAcceptDemandeAbonnement(props.id);
                  }
                  if (props.action === "refuse demande abonnement") {
                    handleRefuseDemandeAbonnement(props.id);
                  }

                  props.setShowPopUp(false);
                  props?.setAction(false);
                }}
              >
                {props.button}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
