import NavBar from "../shared/navBar/NavBar";
import "./AddProductPage.css";
import { image, deleteIcon, edite } from "../../assets/index";
import { useReducer } from "react";
import { addProductReducer } from "../../reducers/ProductReducer/addProductReducer";
import { RichTextEditor } from "@mantine/rte";

import {
  ADD_VALUE,
  SET_QUANTITE,
  SET_VALUE,
  SAVE,
  EDIT,
  DELETE,
  UPDATE_VALUE,
  UPDATE_QUANTITE,
  SET_NAME,
  SET_DESCRIPTION,
  SET_FREE_PRICE,
  SET_PREMIUM_PRICE,
  SET_PRO_PRICE,
  SET_OPTION,
  SET_MEDIA,
  SET_LAVAGE,
  SET_DELEVERY_DESCRIPTION,
} from "../../reducers/ProductReducer/addProductActions";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useState } from "react";
import { useEffect } from "react";
const initialState = {
  value: "",
  quantite: "",
  values: [],
  isFinished: false,
  isAddingAfterSaved: false,
  desabled: true,
  isAdded: false,
  name: "",
  description: "",
  free_price: "",
  premium_price: "",
  pro_price: "",
  media: "",
  lavage: "",
  optionName: "",
  deliveryDesc: "",
  product_images: [],
};
const AddProductPage = () => {
  const [state, dispatch] = useReducer(addProductReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCat, setShowCat] = useState(false);
  const [showSubCat, setShowSubCat] = useState(false);
  let [categoriesSelected, setCategoriesSelected] = useState([]);
  let [subCategoriesSelected, setSubCategoriesSelected] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // turn the array of values into an object
    try {
      setLoading(true);
      setError(false);
      const totalStock = state.values.reduce(
        (acc, item) => acc + item.quantite,
        0
      );
      const values = state.values.reduce((acc, value) => {
        return {
          ...acc,
          [value.value]: value.quantite,
        };
      }, {});
      const formData = new FormData();
      formData.append("name", state.name);
      formData.append("description", state.description);
      formData.append("free_price", state.free_price);
      formData.append("premium_price", state.premium_price);
      formData.append("pro_price", state.pro_price);
      formData.append("stock", totalStock);
      formData.append("options", JSON.stringify(values));
      formData.append("table_image", state.lavage);
      formData.append("optionName", state.optionName);
      formData.append("deliveryDesc", state.deliveryDesc);
      for (let i of state.product_images) {
        formData.append("product_images", i);
      }
      categoriesSelected = categoriesSelected.join(",");
      subCategoriesSelected = subCategoriesSelected.join(",");
      formData.append("categories", categoriesSelected);
      formData.append("subcategories", subCategoriesSelected);
      console.log(categoriesSelected);
      console.log(subCategoriesSelected);
      const response = await axiosInstance.post(
        `${baseUrl}product/create/`,
        formData
      );
      console.log(response);
      if (response.data.success === false) {
        setLoading(false);
        setError(true);
        return;
      }
      setLoading(false);
      window.location.href = "/produit";
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  // get all catégories
  const getCategories = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}category/admin/?pagination=false&child=true`
      );
      console.log(response);
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <NavBar title="Produit" />
      <div className="container">
        <p>Ajouter un produit</p>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input nom">
              <label htmlFor="nom">Nom Produit</label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="T-shirt"
                onChange={(e) =>
                  dispatch({
                    type: SET_NAME,
                    payload: e.target.value,
                  })
                }
              />
            </div>
            <div className="cat">
              <div className="input">
                <label
                  htmlFor="nom"
                  className="hover"
                  onClick={() => setShowCat(!showCat)}
                >
                  Catégorie
                </label>
                <div className="sub">
                  {categories.map((category) => {
                    return (
                      <div key={category.id}>
                        <input
                          type="checkbox"
                          checked={categoriesSelected.includes(category.id)}
                          onChange={(e) => {
                            console.log(e.target.checked);
                            if (e.target.checked) {
                              setCategoriesSelected([
                                ...categoriesSelected,
                                category.id,
                              ]);
                            } else {
                              setCategoriesSelected(
                                categoriesSelected.filter(
                                  (item) => item !== category.id
                                )
                              );
                            }
                          }}
                        />
                        <label htmlFor="nom">{category.name}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="input">
                <label
                  htmlFor="nom"
                  onClick={() => setShowSubCat(!showSubCat)}
                  className="hover"
                >
                  Sous catégorie
                </label>

                <div className="sub">
                  {categories.map((category) => {
                    return category.subCategories.map((child) => {
                      return (
                        <div key={child.id}>
                          <input
                            type="checkbox"
                            checked={subCategoriesSelected.includes(child.id)}
                            onChange={(e) => {
                              console.log(e.target.checked);
                              if (e.target.checked) {
                                setSubCategoriesSelected([
                                  ...subCategoriesSelected,
                                  child.id,
                                ]);
                              } else {
                                setSubCategoriesSelected(
                                  subCategoriesSelected.filter(
                                    (item) => item !== child.id
                                  )
                                );
                              }
                            }}
                          />
                          <label htmlFor="nom">{child.name}</label>
                        </div>
                      );
                    });
                  })}
                </div>
              </div>
            </div>
            <div className="input desc">
              <label htmlFor="desc">Description</label>
              <RichTextEditor
                sx={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
               value={state.description}
                onChange={(e) =>
                  dispatch({
                    type: SET_DESCRIPTION,
                    payload: e,
                  })
                }
              ></RichTextEditor>
            </div>
            <div className="input livraison">
              <label htmlFor="livraison">Livraison</label>
              <textarea
                name="livraison"
                id="livraison"
                cols="30"
                rows="10"
                placeholder="Description de la livraison"
                onChange={(e) => {
                  dispatch({
                    type: SET_DELEVERY_DESCRIPTION,
                    payload: e.target.value,
                  });
                }}
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
                    dispatch({
                      type: SET_MEDIA,
                      payload: e.target.files[0],
                    });
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
                    dispatch({
                      type: SET_LAVAGE,
                      payload: e.target.files[0],
                    });
                  }}
                />
                <img src={image} alt="image" />
                <p className="photo">Ajouter une photo</p>
              </div>
            </div>
            <div className="input prix">
              <div className="price gratuit">
                <label htmlFor="gratuit">Prix abonnement gratuit</label>
                <input
                  type="text"
                  id="gratuit"
                  name="gratuit"
                  onChange={(e) =>
                    dispatch({
                      type: SET_FREE_PRICE,
                      payload: e.target.value,
                    })
                  }
                />
              </div>
              <div className="price premium">
                <label htmlFor="premium">Prix abonnement premium</label>
                <input
                  type="text"
                  id="premium"
                  name="premium"
                  onChange={(e) =>
                    dispatch({
                      type: SET_PREMIUM_PRICE,
                      payload: e.target.value,
                    })
                  }
                />
              </div>
              <div className="price premium-box">
                <label htmlFor="premium-box">
                  Prix abonnement premium boxe
                </label>
                <input
                  type="text"
                  id="premium-box"
                  name="premium-box"
                  onChange={(e) =>
                    dispatch({
                      type: SET_PRO_PRICE,
                      payload: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="input option-name">
              <label htmlFor="option-name">Nom de l’option</label>
              <input
                type="text"
                id="option-name"
                name="option-name"
                placeholder="Nom de l’option"
                onChange={(e) =>
                  dispatch({
                    type: SET_OPTION,
                    payload: e.target.value,
                  })
                }
              />
            </div>
            <div className="valeurs">
              <label htmlFor="valeurs">Valeurs</label>
              {state.values.length > 0
                ? state.values.map((value) => {
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
                          type="number"
                          disabled={value.disabled}
                          onChange={(e) => {
                            const int = parseInt(e.target.value);
                            dispatch({
                              type: UPDATE_QUANTITE,
                              payload: {
                                id: value.id,
                                quantite: int,
                              },
                            });
                          }}
                        />
                        {value.isAddingAfterSaved ? (
                          <img
                            src={edite}
                            alt="Modifier"
                            className="hover"
                            onClick={() => {
                              dispatch({ type: EDIT, payload: value.value });
                            }}
                          />
                        ) : (
                          <img
                            alt="Supprimer"
                            className="hover"
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
                  }}
                />
                <input
                  type="number"
                  id="quantité"
                  name="quantité"
                  placeholder="Quantité"
                  value={state.quantite}
                  onChange={(e) => {
                    // convert the value to int
                    const int = parseInt(e.target.value);
                    dispatch({ type: SET_QUANTITE, payload: int });
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
            <button type="submit" className="add-value submit">
              {loading ? "Chargement..." : error ? "Error" : "Ajouter"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddProductPage;
