import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import { image } from "../../assets/index";
import "../events/AddEventPage.css";
import SettingsImageTable from "./SettingsImageTable";
import SettingsPageTable from "./SettingsPageTable";
import { useNavigate } from "react-router-dom";
const SettingsPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar title="Paramètres" />
      <div className="container">
        <p>Information personnelles</p>
        <div className="form">
          <form>
            <div className="input prix">
              <div className="price gratuit ticket">
                <label htmlFor="gratuit">Nom</label>
                <input type="text" id="gratuit" name="gratuit" />
              </div>
              <div className="price premium ticket">
                <label htmlFor="premium">Prénom</label>
                <input type="text" id="premium" name="premium" />
              </div>
            </div>
            <div className="input prix">
              <div className="price gratuit ticket">
                <label htmlFor="gratuit">Téléphone</label>
                <input type="text" id="gratui" name="gratuit" />
              </div>
              <div className="price premium ticket">
                <label htmlFor="premium">Email</label>
                <input type="email" id="premiu" name="premium" />
              </div>
            </div>
            <div className="input prix">
              <div className="price gratuit ticket">
                <label htmlFor="gratuit">Nom d’utilisateur</label>
                <input type="text" id="ratuit" name="gratuit" />
              </div>
              <div className="price premium ticket">
                <label htmlFor="premium">Nouveau mot de passe</label>
                <input type="password" id="remium" name="premium" />
              </div>
            </div>

            <label htmlFor="prix">Photo de Profile</label>
            <div className="media">
              <div className="image">
                <input type="file" id="image" name="image" size="60px" />
                <img src={image} alt="image" />
                <p className="photo">Ajouter une photo</p>
              </div>
            </div>
            <button
              type="submit"
              className="add-value submit"
              style={{
                marginTop: "0",
              }}
            >
              Enregistrer
            </button>
          </form>
        </div>
        <div className="form">
          <form>
            <p>Yalidine information</p>
            <div
              className="input prix"
              style={{
                marginTop: "10px",
              }}
            >
              <div className="price gratuit ticket">
                <label htmlFor="gratuit">API Token</label>
                <input type="text" id="grahhtuit" name="gratuit" />
              </div>
              <div className="price premium ticket">
                <label htmlFor="premium">API Key</label>
                <input type="text" id="premhhium" name="premium" />
              </div>
            </div>
            <button
              type="submit"
              className="add-value submit"
              style={{
                marginTop: "0",
              }}
            >
              Enregistrer
            </button>
          </form>
        </div>
        <div className="title">
          <p>Sliders et publicités</p>
          <button
            className="add-product"
            onClick={() => navigate("/parametres/ajouter-image")}
          >
            Ajouter une image
          </button>
        </div>
        <SettingsImageTable />
        <div className="title">
          <p>Pages</p>
          <button
            className="add-product"
            onClick={() => {
              navigate("/parametres/ajouter-page");
            }}
          >
            Ajouter une page
          </button>
        </div>
        <SettingsPageTable />
      </div>
    </>
  );
};
export default SettingsPage;
