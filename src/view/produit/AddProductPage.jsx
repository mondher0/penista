import NavBar from "../shared/navBar/NavBar";
import "./AddProductPage.css";
import { image } from "../../assets/index";

const AddProductPage = () => {
  return (
    <>
      <NavBar title="Produit" />
      <div className="container">
        <p>Ajouter un produit</p>
        <div className="form">
          <form>
            <div className="input nom">
              <label htmlFor="nom">Nom Produit</label>
              <input type="text" id="nom" name="nom" placeholder="T-shirt" />
            </div>
            <div className="input desc">
              <label htmlFor="desc">Description</label>
              <textarea
                name="desc"
                id="desc"
                cols="30"
                rows="10"
                placeholder="Description du produit"
              ></textarea>
            </div>
            <div className="input livraison">
              <label htmlFor="livraison">Livraison</label>
              <textarea
                name="livraison"
                id="livraison"
                cols="30"
                rows="10"
                placeholder="Description de la livraison"
              ></textarea>
            </div>
            <label
              htmlFor="prix"
              style={{
                marginBottom: "10px",
              }}
            >
              Media
            </label>
            <div className="media">
              <div className="image">
                <input type="file" id="image" name="image" size="60px" onChange={(e) => {
                    console.log(e.target.value);
                }}/>
                <img src={image} alt="image" />
                <p className="photo">Ajouter une photo</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProductPage;
