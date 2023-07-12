import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import { image, lien } from "../../assets/index";
import "./AddEventPage.css";
const AddEventPage = () => {
  return (
    <>
      <NavBar title="Evénements" />
      <div className="container">
        <p>Ajouter un événements</p>
        <div className="form">
          <form>
            <div className="input nom">
              <label htmlFor="nom">Titre de l’événement</label>
              <input type="text" id="nom" name="nom" placeholder="Match" />
            </div>
            <div className="input nom">
              <label htmlFor="nom">Type de l’événement</label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="Regroupement"
              />
            </div>
            <div className="input desc">
              <label htmlFor="desc">Description</label>
              <textarea
                name="desc"
                id="desc"
                cols="30"
                rows="10"
                placeholder="Description du l'événement"
              ></textarea>
            </div>
            <label htmlFor="prix">Media</label>
            <div className="media">
              <div className="image">
                <input type="file" id="image" name="image" size="60px" />
                <img src={image} alt="image" />
                <p className="photo">Ajouter une photo</p>
              </div>
            </div>
            <div className="input nom">
              <label htmlFor="nom">Date de l’événement</label>
              <input type="date" id="nom" name="nom" placeholder="date" />
            </div>
            <div className="input nom">
              <label
                htmlFor="nom"
                style={{
                  marginBottom: "0",
                }}
              >
                Dernier délai de la résérvation
              </label>
              <input type="date" id="nom" name="nom" placeholder="date" />
            </div>
            <div className="input prix">
              <div className="price gratuit">
                <label htmlFor="gratuit">Prix abonnement gratuit</label>
                <input type="text" id="gratuit" name="gratuit" />
              </div>
              <div className="price premium">
                <label htmlFor="premium">Prix abonnement premium</label>
                <input type="text" id="premium" name="premium" />
              </div>
              <div className="price premium-box">
                <label htmlFor="premium-box">
                  Prix abonnement premium boxe
                </label>
                <input type="text" id="premium-box" name="premium-box" />
              </div>
            </div>
            <div className="input prix">
              <div className="price gratuit ticket">
                <label htmlFor="gratuit">Nombre de tiquets Min</label>
                <input type="number" id="gratuit" name="gratuit" />
              </div>
              <div className="price premium ticket">
                <label htmlFor="premium">Nombre de tiquets Max</label>
                <input type="number" id="premium" name="premium" />
              </div>
            </div>
            <div className="input option-name">
              <label htmlFor="option-name">Type de réservation</label>
              <select
                name="type-reservation"
                id="type-reservation"
                style={{
                  border: "1px solid #E5E5E5",
                }}
              >
                <option value="">Choisissez le type de réservation</option>
                <option value="1">Confirmer présence</option>
                <option value="2">Versement</option>
              </select>
            </div>
            <div className="input adress">
              <label htmlFor="option-name">Adresse de l’événement</label>
              <input
                type="text"
                id="option-name"
                name="option-name"
                placeholder="Adresse"
              />
            </div>
            <div className="input adress">
              <label htmlFor="option-name">Lieu de l’événement</label>
              <div className="url">
                <input
                  type="url"
                  id="option-name"
                  name="option-name"
                  placeholder="Lien maps"
                />
                <img src={lien} alt="image" />
              </div>
            </div>
            <button type="submit" className="add-value submit">
              Ajouter le produit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddEventPage;
