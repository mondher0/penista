import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import { image } from "../../assets/index";
import { useReducer } from "react";
import { addOffreReducer } from "../../reducers/offreReducer/addOffreReducer";
import {
  SET_OFFRE_TYPE,
  SET_OFFRE_TITLE,
  SET_OFFRE_IMAGE,
  SET_OFFRE_PERCENTAGE,
  SET_OFFRE_PROMO_CODE,
  SET_OFFRE_EXPIRATION_DATE,
  SET_OFFRE_HOUR,
  SET_OFFRE_MINUTE,
} from "../../reducers/offreReducer/addOffreActions";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useState } from "react";
import RichTextEditor from "@mantine/rte";

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
const AddOffrePage = () => {
  const [state, dispatch] = useReducer(addOffreReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const formData = new FormData();
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
      const response = await axiosInstance.post(
        `${baseUrl}promotion/create/`,
        formData
      );
      if (response.data.success === false) {
        setLoading(false);
        setError(true);
        return;
      }
      setLoading(false);
      window.location.href = "/offres";
    } catch (error) {
      setLoading(false);
      setError(true);
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
              <RichTextEditor
                sx={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                value={state.title}
                onChange={(e) => {
                  dispatch({
                    type: SET_OFFRE_TITLE,
                    payload: e,
                  });
                }}
              ></RichTextEditor>
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
                <p className="photo">Ajouter une photo</p>
              </div>
            </div>
            <div className="input prix">
              <div className="price gratuit ticket">
                <label htmlFor="gratuit">Code promo</label>
                <input
                  type="text"
                  id="gratuit"
                  name="gratuit"
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
              {loading ? "Chargement..." : error ? "Erreur" : "Ajouter l’offre"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddOffrePage;
