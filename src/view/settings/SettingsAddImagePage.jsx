import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import { image } from "../../assets/index";
const SettingsAddImagePage = () => {
  return (
    <>
      <NavBar title="Paramètres" />
      <div className="container">
        <p>Slider et publicités</p>
        <div className="form">
          <form>
            <div className="input nom">
              <label htmlFor="nom">Note</label>
              <input type="text" id="nom" name="nom" placeholder="Note" />
            </div>
            <label htmlFor="prix">Image Slider</label>
            <div className="media">
              <div className="image">
                <input type="file" id="image" name="image" size="60px" />
                <img src={image} alt="image" />
                <p className="photo">Ajouter une photo</p>
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
export default SettingsAddImagePage;
