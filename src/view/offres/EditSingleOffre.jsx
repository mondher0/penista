/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import { image } from "../../assets/index";
import { useEffect, useReducer } from "react";
import {
  SET_OFFRE_TYPE,
  SET_OFFRE_TITLE,
  SET_OFFRE_IMAGE,
  SET_OFFRE_PERCENTAGE,
  SET_OFFRE_PROMO_CODE,
  SET_OFFRE_EXPIRATION_DATE,
  SET_OFFRE_HOUR,
  SET_OFFRE_MINUTE,
  GET_offre_DETAILS,
} from "../../reducers/offreReducer/addOffreActions";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useParams } from "react-router-dom";
import { editOffreReducer } from "../../reducers/offreReducer/editOffreReducer";

const initialState = {
  type: "",
  title: "",
  percentage: null,
  promoCode: "",
  expirationDate: "",
  expirationHour: "",
  expirationMinute: "",
  image: "",
};
const EditSingleOffre = () => {
  const { id } = useParams();
  console.log(id);
  const [state, dispatch] = useReducer(editOffreReducer, initialState);
  console.log(state);

  // get single offre
  const getSingleOffre = async () => {
    try {
      const response = await axiosInstance.get(`${baseUrl}promotion/${id}/`);
      console.log(response);
      dispatch({
        type: GET_offre_DETAILS,
        payload: response.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleOffre();
  }, []);

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      console.log(state);
      formData.append("promoType", state.type);
      formData.append("title", state.title);
      formData.append("percentage", state.percentage);
      formData.append("promo_code", state.promoCode);
      formData.append(
        "expirationDate",
        state.expirationDate +
          " " +
          state.expirationHour +
          ":" +
          state.expirationMinute
      );
      formData.append("image", state.image);
      const response = await axiosInstance.put(
        `${baseUrl}promotion/update/${id}/`,
        formData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar title="Offres" />
      <div className="container">
        <p>Ajouter une offre</p>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input nom">
              <label htmlFor="nom">Type de l’offre</label>
              <select
                name="type-offre"
                id="type-offre"
                style={{
                  border: "1px solid #E5E5E5",
                }}
                value={state.type}
                onChange={(e) => {
                  dispatch({
                    type: SET_OFFRE_TYPE,
                    payload: e.target.value,
                  });
                }}
              >
                <option value="">Choisissez le type de l’offre</option>
                <option value="inApp">Penista</option>
                <option value="external">Externe</option>
              </select>
            </div>
            <div className="input nom">
              <label htmlFor="nom">Titre de l’offre</label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="Titre de l’offre"
                value={state.title}
                onChange={(e) => {
                  dispatch({
                    type: SET_OFFRE_TITLE,
                    payload: e.target.value,
                  });
                }}
              />
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
                      type: SET_OFFRE_IMAGE,
                      payload: e.target.files[0],
                    });
                  }}
                />
                <img src={image} alt="image" />
                <p className="photo">Modifier la photo</p>
              </div>
            </div>
            <div className="input prix">
              <div className="price gratuit ticket">
                <label htmlFor="gratuit">Code promo</label>
                <input
                  type="text"
                  id="gratuit"
                  name="gratuit"
                  value={state.promoCode}
                  onChange={(e) => {
                    dispatch({
                      type: SET_OFFRE_PROMO_CODE,
                      payload: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="price premium ticket">
                <label htmlFor="premium">Pourcentage de réduction</label>
                <input
                  type="number"
                  id="premium"
                  name="premium"
                  value={state.percentage}
                  onChange={(e) => {
                    dispatch({
                      type: SET_OFFRE_PERCENTAGE,
                      payload: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="input prix">
              <div className="input nom">
                <label htmlFor="nom">Date de la fin</label>
                <input
                  type="date"
                  id="nom"
                  name="nom"
                  placeholder="date"
                  value={state.expirationDate}
                  onChange={(e) => {
                    dispatch({
                      type: SET_OFFRE_EXPIRATION_DATE,
                      payload: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="input nom">
                <label htmlFor="nom">Heure de la fin</label>
                <input
                  type="number"
                  id="nom"
                  name="nom"
                  placeholder="Heure"
                  onChange={(e) => {
                    dispatch({
                      type: SET_OFFRE_HOUR,
                      payload: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="input nom">
                <label htmlFor="nom">Minute de la fin</label>
                <input
                  type="number"
                  id="nom"
                  name="nom"
                  placeholder="Minute"
                  onChange={(e) => {
                    dispatch({
                      type: SET_OFFRE_MINUTE,
                      payload: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="add-value submit"
              style={{
                marginTop: "5px",
              }}
            >
              Modifier l’offre
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default EditSingleOffre;
