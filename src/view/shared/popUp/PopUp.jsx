/* eslint-disable react/prop-types */
import "./PopUp.css";
import { cancel } from "../../../assets/index";
import usePopUpContext from "../../../hooks/usePopUpContext";
import { useState } from "react";
const PopUp = (props) => {
  const {
    handleBlock,
    handleUnblock,
    handleDelete,
    handleAccept,
    handleRefuse,
    handleAcceptDemandeAbonnement,
    handleRefuseDemandeAbonnement,
    handleChangeStatus,
    handleDeleteAd,
    handleEnleverPoints,
    handleAcceptOrder,
    handleRefuseOrder,
    handleDeleteOffre,
    handleDeleteEvent,
    deleteCategorie,
    deleteQuizz,
  } = usePopUpContext();
  const [points, setPoints] = useState();
  return (
    <div className="them">
      <div className="them_container">
        <div className="cancel hover">
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
                onChange={(e) => {
                  setPoints(e.target.value);
                }}
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
                    props?.setAction(false);
                  }
                  if (props.action === "débloquer") {
                    handleUnblock(props.id);
                    props?.setAction(false);
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
                  if (props.action === "change ad status") {
                    handleChangeStatus(props.id);
                    props?.setAction(false);
                  }
                  if (props.action === "delete ad") {
                    handleDeleteAd(props.id);
                  }
                  if (props.action === "enlever") {
                    handleEnleverPoints(props.id, points);
                  }
                  if (props.action === "accept order") {
                    handleAcceptOrder(props.id);
                  }
                  if (props.action === "cancel order") {
                    handleRefuseOrder(props.id);
                  }
                  if (props.action === "delete offre") {
                    handleDeleteOffre(props.id);
                  }
                  if (props.action === "deleteEvent") {
                    handleDeleteEvent(props.id);
                  }
                  if (props.action === "deleteCategorie") {
                    deleteCategorie(props.id);
                  }
                  if (props.action === "delete quizz") {
                    deleteQuizz(props.id);
                  }
                  props.setShowPopUp(false);
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
