import NavBar from "../shared/navBar/NavBar";
import "./AddProductPage.css";
import { image } from "../../assets/index";
import { useReducer } from "react";
import { addProductReducer } from "./reducers/addProductReducer";
import {
  ADD_VALUE,
  SET_QUANTITE,
  SET_VALUE,
  SAVE,
} from "./reducers/addProductActions";
const initialState = {
  value: "",
  quantite: "",
  values: [],
  isSaved: false,
  isFinished: false,
  isAddingAfterSaved: false,
};
const AddProductPage = () => {
  const [state, dispatch] = useReducer(addProductReducer, initialState);
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
            <label htmlFor="prix">Media</label>
            <div className="media">
              <div className="image">
                <input
                  type="file"
                  id="image"
                  name="image"
                  size="60px"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
                <img src={image} alt="image" />
                <p className="photo">Ajouter une photo</p>
              </div>
            </div>
            <label htmlFor="prix">
              Vous pouvez meme consulter le tableau des lavages
            </label>
            <div className="consulter">
              <div className="image">
                <input
                  type="file"
                  id="image"
                  name="image"
                  size="60px"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
                <img src={image} alt="image" />
                <p className="photo">Ajouter une photo</p>
              </div>
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
            <div className="input option-name">
              <label htmlFor="option-name">Nom de l’option</label>
              <input
                type="text"
                id="option-name"
                name="option-name"
                placeholder="Nom de l’option"
              />
            </div>
            <div className="valeurs">
              <label htmlFor="valeurs">Valeurs</label>
              {state.values.length > 0
                ? state.values.map((value) => {
                    console.log(value);
                    return (
                      <div className="added" key={value.value}>
                        {state.isAddingAfterSaved && (
                          <div className="saved-value">{value.value}</div>
                        )}
                        {!state.isAddingAfterSaved && (
                          <div className="added-value">{value.value}</div>
                        )}
                        <div className="added-quantite">{value.quantite}</div>
                      </div>
                    );
                  })
                : null}
              <div className="valeur">
                <input
                  type="text"
                  id="valeur"
                  name="valeur"
                  placeholder="Valeur"
                  onChange={(e) => {
                    dispatch({ type: SET_VALUE, payload: e.target.value });
                    console.log(state);
                  }}
                />
                <input
                  type="text"
                  id="quantité"
                  name="quantité"
                  placeholder="Quantité"
                  onChange={(e) => {
                    dispatch({ type: SET_QUANTITE, payload: e.target.value });
                    console.log(state);
                  }}
                />
              </div>
              <button
                type="button"
                className="add-value"
                onClick={() => {
                  dispatch({ type: ADD_VALUE, payload: state });
                  console.log(state);
                }}
              >
                Ajouter une valeur
              </button>
              {state.isFinished && (
                <button
                  type="button"
                  className="add-value"
                  onClick={() => {
                    dispatch({ type: SAVE });
                  }}
                >
                  Terminer
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProductPage;
