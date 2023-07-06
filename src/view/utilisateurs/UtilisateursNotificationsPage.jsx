import NavBar from "../shared/navBar/NavBar";
import "./UtilisateursNotificationsPage.css";

const UtilisateursNotificationsPage = () => {
  return (
    <>
      <NavBar title="Utilisateurs" />
      <div className="container">
        <p>Envoyer des notifications</p>

        <form className="form">
          <div className="filtres">
            <div className="filtre">
              <div>Abonnement</div>
              <select name="abonnement" id="abonnement">
                <option value="">Choisir</option>
              </select>
            </div>
            <div className="filtre">
              <div>Sex</div>
              <select name="sex" id="sex">
                <option value="">Choisir</option>
              </select>
            </div>
            <div className="filtre">
              <div>Wilaya</div>
              <select name="wilaya" id="wilaya">
                <option value="">Choisir</option>
              </select>
            </div>
            <div className="filtre">
              <div>Nombre d’étoiles </div>
              <select name="nmbr" id="nmbr">
                <option value="">Choisir</option>
              </select>
            </div>
          </div>
          <label>Ecrivez votre message</label>
          <textarea cols="30" rows="10"></textarea>
          <button type="submit" className="submit">Envoyer</button>
        </form>
      </div>
    </>
  );
};

export default UtilisateursNotificationsPage;
