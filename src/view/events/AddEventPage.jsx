import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import { image, lien } from "../../assets/index";
import "./AddEventPage.css";
import { useState } from "react";
import { useReducer } from "react";
import { addEventReducer } from "../../reducers/eventReducer/addEventReducer";
import {
  SET_END_DATE,
  SET_PLACES,
  SET_START_DATE,
  SET_DATES,
  SET_OPTION_NAME,
  SET_OPTION_VALUE,
  SET_VALUES,
  SET_TITLE,
  SET_TYPE,
  SET_DESCRIPTION,
  SET_IMAGE,
  SET_MAX_TICKETS,
  SET_MIN_TICKETS,
  SET_PRO_PRICE,
  SET_PREMIUM_PRICE,
  SET_FREE_PRICE,
  SET_MAPS_LINK,
  SET_ADDRESS,
  SET_DATE_START,
  SET_DATE_END,
  SET_TICKETS,
  FOR_USER,
  SET_RESERVATION_TYPE,
} from "../../reducers/eventReducer/addEventActions";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
const initialState = {
  startDate: "",
  endDate: "",
  place: "",
  dates: [],
  optionName: "",
  value: "",
  values: [],
  title: "",
  type: "",
  description: "",
  uploaded_images: "",
  max_ticket: "",
  min_ticket: "",
  pro_price: "",
  premium_price: "",
  free_price: "",
  maps_link: "",
  reservation_type: "",
  address: "",
  date_start: "",
  date_end: "",
  tickets: "",
  forUser: "",
};
const AddEventPage = () => {
  const [competition, setCompetition] = useState(false);
  const [state, dispatch] = useReducer(addEventReducer, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // handle competition submit
  const handleCompetitionSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const formData = new FormData();
      formData.append("title", state.title);
      formData.append("type", state.type);
      formData.append("description", state.description);
      formData.append("uploaded_images", state.uploaded_images);
      formData.append("address", state.address);
      formData.append("maps_link", state.maps_link);
      formData.append("dates", JSON.stringify(state.dates));
      const options = {
        name: state.optionName,
        values: state.values,
      };
      formData.append("options", JSON.stringify(options));
      const response = await axiosInstance.post(
        `${baseUrl}event/create/`,
        formData
      );
      if (response.data.success === false) {
        setLoading(false);
        setError(true);
        return;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  // handle submite event
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const formData = new FormData();
      formData.append("title", state.title);
      formData.append("type", state.type);
      formData.append("description", state.description);
      formData.append("uploaded_images", state.uploaded_images);
      formData.append("max_ticket", state.max_ticket);
      formData.append("min_ticket", state.min_ticket);
      formData.append("pro_price", state.pro_price);
      formData.append("premium_price", state.premium_price);
      formData.append("free_price", state.free_price);
      formData.append("maps_link", state.maps_link);
      formData.append("res_type", state.reservation_type);
      formData.append("address", state.address);
      formData.append("date_start", state.date_start);
      formData.append("lastReservationDate", state.date_end);
      formData.append("tickets", state.tickets);
      formData.append("forUser", state.forUser);
      const response = await axiosInstance.post(
        `${baseUrl}event/create/`,
        formData
      );
      if (response.data.success === false) {
        setLoading(false);
        setError(true);
        return;
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <NavBar title="Evénements" />
      <div className="container">
        <p>Ajouter un événements</p>
        <div className="form">
          <form onSubmit={competition ? handleCompetitionSubmit : handleSubmit}>
            <div className="input nom">
              <label htmlFor="nom">Titre de l’événement</label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="Match"
                onChange={(e) => {
                  dispatch({ type: SET_TITLE, payload: e.target.value });
                }}
              />
            </div>
            <div className="input nom">
              <label htmlFor="nom">Type de l’événement</label>
              <select
                style={{
                  border: "1px solid #E5E5E5",
                }}
                onChange={(e) => {
                  if (e.target.value === "Compétition") {
                    setCompetition(true);
                  } else {
                    setCompetition(false);
                  }
                  dispatch({ type: SET_TYPE, payload: e.target.value });
                }}
              >
                <option value="">Choisissez le type de l’événement</option>
                <option value="Regroupement">Regroupement</option>
                <option value="voyage">voyage</option>
                <option value="Compétition">Compétition</option>
              </select>
            </div>
            <div className="input desc">
              <label htmlFor="desc">Description</label>
              <textarea
                name="desc"
                id="desc"
                cols="30"
                rows="10"
                placeholder="Description du l'événement"
                onChange={(e) => {
                  dispatch({
                    type: SET_DESCRIPTION,
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
                    dispatch({ type: SET_IMAGE, payload: e.target.files[0] });
                  }}
                />
                <img src={image} alt="image" />
                <p className="photo">Ajouter une photo</p>
              </div>
            </div>
            {competition && (
              <>
                <label>Options de date pour l’évenement</label>
                {state.dates.length > 0
                  ? state.dates.map((date) => {
                      return (
                        <>
                          <div
                            className="input prix"
                            style={{
                              marginTop: "10px",
                            }}
                          >
                            <div className="price gratuit">
                              <label htmlFor="gratuit">Date de début</label>
                              <input
                                type="text"
                                id="gratuit"
                                name="gratuit"
                                value={date.date_start}
                                disabled
                              />
                            </div>
                            <div className="price premium">
                              <label htmlFor="premium">Date de fin</label>
                              <input
                                type="text"
                                id="premium"
                                name="premium"
                                value={date.date_end}
                                disabled
                              />
                            </div>
                            <div className="price premium-box">
                              <label htmlFor="premium-box">place</label>
                              <input
                                type="text"
                                id="premium-box"
                                name="premium-box"
                                value={date.place}
                                disabled
                              />
                            </div>
                          </div>
                        </>
                      );
                    })
                  : null}
                <div
                  className="input prix"
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <div className="price gratuit">
                    <label htmlFor="gratuit">Date de début</label>
                    <input
                      type="date"
                      id="gratuit"
                      name="gratuit"
                      onChange={(e) => {
                        dispatch({
                          type: SET_START_DATE,
                          payload: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="price premium">
                    <label htmlFor="premium">Date de fin</label>
                    <input
                      type="date"
                      id="premium"
                      name="premium"
                      onChange={(e) => {
                        dispatch({
                          type: SET_END_DATE,
                          payload: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="price premium-box">
                    <label htmlFor="premium-box">place</label>
                    <input
                      type="number"
                      id="premium-box"
                      name="premium-box"
                      onChange={(e) => {
                        dispatch({
                          type: SET_PLACES,
                          payload: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <button
                  className="add-value"
                  style={{
                    marginBottom: "10px",
                  }}
                  type="button"
                  onClick={() => {
                    dispatch(
                      {
                        type: SET_DATES,
                      },
                    );
                  }}
                >
                  Ajouter
                </button>
                <div className="input nom">
                  <label htmlFor="nom">Autres options et propositions</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    placeholder="Ajouter une option"
                    onChange={(e) => {
                      dispatch({
                        type: SET_OPTION_NAME,
                        payload: e.target.value,
                      });
                    }}
                  />
                </div>
                {state.values.length > 0
                  ? state.values.map((value) => {
                      return (
                        <>
                          <div className="input nom">
                            <input
                              type="text"
                              id="nom"
                              name="nom"
                              value={value}
                              disabled
                            />
                          </div>
                        </>
                      );
                    })
                  : null}
                <div className="input nom">
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    placeholder="valeurs"
                    onChange={(e) => {
                      dispatch({
                        type: SET_OPTION_VALUE,
                        payload: e.target.value,
                      });
                    }}
                  />
                </div>
                <button
                  className="add-value"
                  style={{
                    marginBottom: "10px",
                  }}
                  type="button"
                  onClick={() => {
                    dispatch({
                      type: SET_VALUES,
                    });
                  }}
                >
                  Ajouter
                </button>
              </>
            )}
            {!competition && (
              <>
                <div className="input nom">
                  <label htmlFor="nom">Date de l’événement</label>
                  <input
                    type="date"
                    id="nom"
                    name="nom"
                    placeholder="date"
                    onChange={(e) => {
                      dispatch({
                        type: SET_DATE_START,
                        payload: e.target.value,
                      });
                    }}
                  />
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
                  <input
                    type="date"
                    id="nom"
                    name="nom"
                    placeholder="date"
                    onChange={(e) => {
                      dispatch({ type: SET_DATE_END, payload: e.target.value });
                    }}
                  />
                </div>
                <div className="input prix">
                  <div className="price gratuit">
                    <label htmlFor="gratuit">Prix abonnement gratuit</label>
                    <input
                      type="text"
                      id="gratuit"
                      name="gratuit"
                      onChange={(e) => {
                        dispatch({
                          type: SET_FREE_PRICE,
                          payload: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="price premium">
                    <label htmlFor="premium">Prix abonnement premium</label>
                    <input
                      type="text"
                      id="premium"
                      name="premium"
                      onChange={(e) => {
                        dispatch({
                          type: SET_PREMIUM_PRICE,
                          payload: e.target.value,
                        });
                      }}
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
                      onChange={(e) => {
                        dispatch({
                          type: SET_PRO_PRICE,
                          payload: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="input prix">
                  <div className="price gratuit ticket">
                    <label htmlFor="gratuit">Nombre de tiquets Min</label>
                    <input
                      type="number"
                      id="gratuit"
                      name="gratuit"
                      onChange={(e) => {
                        dispatch({
                          type: SET_MIN_TICKETS,
                          payload: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="price premium ticket">
                    <label htmlFor="premium">Nombre de tiquets Max</label>
                    <input
                      type="number"
                      id="premium"
                      name="premium"
                      onChange={(e) => {
                        dispatch({
                          type: SET_MAX_TICKETS,
                          payload: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="price premium ticket">
                    <label htmlFor="premium">Nombre de tiquets</label>
                    <input
                      type="number"
                      id="premium"
                      name="premium"
                      onChange={(e) => {
                        dispatch({
                          type: SET_TICKETS,
                          payload: e.target.value,
                        });
                      }}
                    />
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
                    onChange={(e) => {
                      dispatch({
                        type: SET_RESERVATION_TYPE,
                        payload: e.target.value,
                      });
                    }}
                  >
                    <option value="">Choisissez le type de réservation</option>
                    <option value="Présence confirmée">
                      Confirmer présence
                    </option>
                    <option value="bank transfer">Versement</option>
                  </select>
                </div>
                <div className="input nom">
                  <label htmlFor="nom">Déstiné à</label>
                  <select
                    style={{
                      border: "1px solid #E5E5E5",
                    }}
                    onChange={(e) => {
                      dispatch({
                        type: FOR_USER,
                        payload: e.target.value,
                      });
                    }}
                  >
                    <option value="">Choisissez le type de l’événement</option>
                    <option value="all">Tous les utilisateurs</option>
                    <option value="premium">
                      Uniquement les utilisateurs Penista Premium
                    </option>
                  </select>
                </div>
              </>
            )}
            <div className="input adress">
              <label htmlFor="option-name">Adresse de l’événement</label>
              <input
                type="text"
                id="option-name"
                name="option-name"
                placeholder="Adresse"
                onChange={(e) => {
                  dispatch({
                    type: SET_ADDRESS,
                    payload: e.target.value,
                  });
                }}
              />
            </div>
            <div className="input adress">
              <label htmlFor="option-name">Lieu de l’événement</label>
              <div className="url">
                <input
                  type="text"
                  id="option-name"
                  name="option-name"
                  placeholder="Lien maps"
                  onChange={(e) => {
                    dispatch({
                      type: SET_MAPS_LINK,
                      payload: e.target.value,
                    });
                  }}
                />
                <img src={lien} alt="image" />
              </div>
            </div>
            <button type="submit" className="add-value submit">
              {loading ? "Chargement..." : error ? "Erreur" : "Ajouter"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddEventPage;
