/* eslint-disable react/prop-types */
import "./PopUp.css";
import { cancel } from "../../../assets/index";

const PopUp = (props) => {
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
              if(props?.setAction) {
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
                    if(props?.setAction) {
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
