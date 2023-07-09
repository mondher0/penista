import NavBar from "../shared/navBar/NavBar";
import "./AddProductPage.css";
import { image, deleteIcon, edite } from "../../assets/index";
import { useReducer } from "react";
import { addProductReducer } from "../../reducers/ProductReducer/addProductReducer";
import {
  ADD_VALUE,
  SET_QUANTITE,
  SET_VALUE,
  SAVE,
  EDIT,
  DELETE,
  UPDATE_VALUE,
  UPDATE_QUANTITE,
} from "../../reducers/ProductReducer/addProductActions";
const initialState = {
  value: "",
  quantite: "",
  values: [],
  isFinished: false,
  isAddingAfterSaved: false,
  desabled: true,
  isAdded: false,
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
                        {value.isAddingAfterSaved && (
                          <input
                            className="saved-value"
                            type="text"
                            disabled
                            value={value.value}
                          />
                        )}
                        {value.isAdded === false && (
                          <input
                            className="added-value"
                            value={value.value}
                            type="text"
                            disabled={value.disabled}
                            onChange={(e) => {
                              dispatch({
                                type: UPDATE_VALUE,
                                payload: {
                                  id: value.id,
                                  value: e.target.value,
                                },
                              });
                            }}
                          />
                        )}
                        <input
                          className="added-quantite"
                          value={value.quantite}
                          type="text"
                          disabled={value.disabled}
                          onChange={(e) => {
                            dispatch({
                              type: UPDATE_QUANTITE,
                              payload: {
                                id: value.id,
                                quantite: e.target.value,
                              },
                            });
                          }}
                        />
                        {value.isAddingAfterSaved ? (
                          <img
                            src={edite}
                            alt="Modifier"
                            onClick={() => {
                              dispatch({ type: EDIT, payload: value.value });
                            }}
                          />
                        ) : (
                          <img
                            alt="Supprimer"
                            src={deleteIcon}
                            onClick={() => {
                              dispatch({ type: DELETE, payload: value.value });
                            }}
                          />
                        )}
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
                  value={state.value}
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
                  value={state.quantite}
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
                  if (state.value === "" || state.quantite === "") {
                    return;
                  }
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
                    console.log(state);
                  }}
                >
                  Terminer
                </button>
              )}
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
export default AddProductPage;
