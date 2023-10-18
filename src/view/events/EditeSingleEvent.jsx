/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import { image, lien } from "../../assets/index";
import "./AddEventPage.css";
import { useEffect, useState } from "react";
import { useReducer } from "react";
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
  SET_RES_TYPE,
  SET_DATE_START,
  SET_DATE_END,
  GET_EVENT_DETAILS,
  EDIT_START_DATE,
  EDIT_END_DATE,
  EDIT_PLACES,
  EDIT_OPTION_VALUES,
  SET_TICKETS,
  FOR_USER,
} from "../../reducers/eventReducer/addEventActions";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { useParams } from "react-router-dom";
import { editEventReducer } from "../../reducers/eventReducer/editEventReducer";
import RichTextEditor from "@mantine/rte";
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
  res_type: "",
  address: "",
  date_start: "",
  date_end: "",
  tickets: "",
  forUser: "",
};
const EditeSingleEvent = () => {
  const { id } = useParams();
  const [competition, setCompetition] = useState(false);
  const [state, dispatch] = useReducer(editEventReducer, initialState);
  const [date, setDate] = useState("");
  const [res_dline, setRes_dline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // get single event
  const getSingleEvent = async () => {
    try {
      const response = await axiosInstance.get(`${baseUrl}event/${id}/`);
      setDate(response.data.data.date);
      setRes_dline(response.data.data.lastReservationDate);

      if (response.data.data.type === "Compétition") {
        setCompetition(true);
      }
      dispatch({
        type: GET_EVENT_DETAILS,
        payload: {
          response: response.data.data,
        },
      });
      dispatch({
        type: SET_DATE_START,
        payload: date,
      });
      dispatch({
        type: SET_DATE_END,
        payload: res_dline,
      });
    } catch (error) {}
  };

  useEffect(() => {
    getSingleEvent();
  }, []);

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
      const response = await axiosInstance.put(
        `${baseUrl}event/update/${id}/`,
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
      formData.append("res_type", state.res_type);
      formData.append("address", state.address);
      formData.append("date_start", date);
      formData.append("lastReservationDate", res_dline);
      formData.append("tickets", state.tickets);
      formData.append("forUser", state.forUser);
      const response = await axiosInstance.put(
        `${baseUrl}event/update/${id}/`,
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
                value={state.title}
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
                disabled={true}
                value={state.type}
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
              <RichTextEditor
                sx={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                value={state.description}
                onChange={(e) => {
                  dispatch({
                    type: SET_DESCRIPTION,
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
                    dispatch({ type: SET_IMAGE, payload: e.target.files[0] });
                  }}
                />
                <img src={image} alt="image" />
                <p className="photo">Modifier la photo</p>
              </div>
            </div>
            {competition && (
              <>
                <label>Options de date pour l’évenement</label>
                {state.dates?.length > 0
                  ? state.dates.map((date, index) => {
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
                                type="date"
                                id="gratuit"
                                name="gratuit"
                                value={date.date_start}
                                onChange={(e) => {
                                  dispatch({
                                    type: EDIT_START_DATE,
                                    payload: {
                                      date: e.target.value,
                                      index: index,
                                    },
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
                                value={date.date_end}
                                onChange={(e) => {
                                  dispatch({
                                    type: EDIT_END_DATE,
                                    payload: {
                                      date: e.target.value,
                                      index: index,
                                    },
                                  });
                                }}
                              />
                            </div>
                            <div className="price premium-box">
                              <label htmlFor="premium-box">place</label>
                              <input
                                type="text"
                                id="premium-box"
                                name="premium-box"
                                value={date.place}
                                onChange={(e) => {
                                  dispatch({
                                    type: EDIT_PLACES,
                                    payload: {
                                      date: e.target.value,
                                      index: index,
                                    },
                                  });
                                }}
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
                    dispatch({
                      type: SET_DATES,
                    });
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
                    value={state.optionName}
                    onChange={(e) => {
                      dispatch({
                        type: SET_OPTION_NAME,
                        payload: e.target.value,
                      });
                    }}
                  />
                </div>
                {state?.values?.length > 0
                  ? state.values.map((value, index) => {
                      return (
                        <>
                          <div className="input nom">
                            <input
                              type="text"
                              id="nom"
                              name="nom"
                              value={value}
                              onChange={(e) => {
                                dispatch({
                                  type: EDIT_OPTION_VALUES,
                                  payload: {
                                    value: e.target.value,
                                    index: index,
                                  },
                                });
                              }}
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
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
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
                    value={res_dline}
                    onChange={(e) => {
                      setRes_dline(e.target.value);
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
                      value={state.free_price}
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
                      value={state.premium_price}
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
                      value={state.pro_price}
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
                      value={state.min_ticket}
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
                      value={state.max_ticket}
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
                      value={state.tickets}
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
                    value={state.res_type}
                    onChange={(e) => {
                      dispatch({
                        type: SET_RES_TYPE,
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
                    value={state.forUser}
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
                value={state.address}
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
                  value={state.maps_link}
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
              {loading ? "Chargement..." : error ? "Erreur" : "Modifier"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default EditeSingleEvent;
