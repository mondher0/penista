import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import { image } from "../../assets/index";
const AddOffrePage = () => {
  return (
    <>
      <NavBar title="Offres" />
      <div className="container">
        <p>Ajouter une offre</p>
        <div className="form">
          <form>
            <div className="input nom">
              <label htmlFor="nom">Type de l’offre</label>
              <select name="type-offre" id="type-offre">
                <option value="">Choisissez le type de l’offre</option>
                <option value="1">Penista</option>
                <option value="2">Externe</option>
              </select>
            </div>
            <div className="input nom">
              <label htmlFor="nom">Titre de l’offre</label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="Titre de l’offre"
              />
            </div>
            <label htmlFor="prix">Media</label>
            <div className="media">
              <div className="image">
                <input type="file" id="image" name="image" size="60px" />
                <img src={image} alt="image" />
                <p className="photo">Ajouter une photo</p>
              </div>
            </div>
            <div className="input prix">
              <div className="price gratuit ticket">
                <label htmlFor="gratuit">Code promo</label>
                <input type="text" id="gratuit" name="gratuit" />
              </div>
              <div className="price premium ticket">
                <label htmlFor="premium">Pourcentage de réduction</label>
                <input type="number" id="premium" name="premium" />
              </div>
            </div>
            <div className="input prix">
              <div className="input nom">
                <label htmlFor="nom">Date de la fin</label>
                <input type="date" id="nom" name="nom" placeholder="date" />
              </div>
              <div className="input nom">
                <label htmlFor="nom">Heure de la fin</label>
                <input type="number" id="nom" name="nom" placeholder="Heure" />
              </div>
              <div className="input nom">
                <label htmlFor="nom">Minute de la fin</label>
                <input type="number" id="nom" name="nom" placeholder="Minute" />
              </div>
            </div>
            <button type="submit" className="add-value submit" style={{
                marginTop: "5px",
            }}>
              Ajouter
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddOffrePage;
