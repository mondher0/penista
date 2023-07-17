import { baseUrl } from "../../utils/constants";
import NavBar from "../shared/navBar/NavBar";
import "./UtilisateursNotificationsPage.css";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const UtilisateursNotificationsPage = () => {
  const [abonnement, setAbonnement] = useState("");
  const [gender, setGender] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [stars, setStars] = useState("");
  const [text, setText] = useState("");

  // Send notification
  const sendNotification = async (e) => {
    e.preventDefault();
    const data = {
      ...(gender && { gender }),
      ...(wilaya && { wilaya }),
      ...(stars && { stars: parseInt(stars) }),
      ...(text && { message: text }),
      ...(abonnement && { subscription: abonnement }),
    };
    try {
      const response = await axiosInstance.post(
        `${baseUrl}notification/admin/send/`,
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar title="Utilisateurs" />
      <div className="container">
        <p>Envoyer des notifications</p>

        <form className="form" onSubmit={sendNotification}>
          <div className="filtres">
            <div className="filtre">
              <div>Abonnement</div>
              <select
              style={{
                width:"167px"
              }}
                name="abonnement"
                id="abonnement"
                onChange={(e) => {
                  setAbonnement(e.target.value);
                }}
              >
                <option value="">Choisir</option>
                <option value="premiumBox">Premium box</option>
                <option value="premium">Premium</option>
                <option value="Free">Gratuit</option>
              </select>
            </div>
            <div className="filtre">
              <div>Sex</div>
              <select
                name="sex"
                id="sex"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value="">Choisir</option>
                <option value="1">femme</option>
                <option value="0">homme</option>
              </select>
            </div>
            <div className="filtre">
              <div>Wilaya</div>
              <input
                type="text"
                placeholder="Wilaya"
                onChange={(e) => {
                  setWilaya(e.target.value);
                }}
              />
            </div>
            <div className="filtre">
              <div>Nombre d’étoiles </div>
              <input
                type="number"
                placeholder="Etoiles"
                onChange={(e) => {
                  setStars(e.target.value);
                }}
              />
            </div>
          </div>
          <label>Ecrivez votre message</label>
          <textarea
            cols="30"
            rows="10"
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></textarea>
          <button type="submit" className="submit">
            Envoyer
          </button>
        </form>
      </div>
    </>
  );
};

export default UtilisateursNotificationsPage;
