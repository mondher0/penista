/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import { useEffect, useReducer, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { addTicketReducer } from "../../reducers/ticketReducer/addTicketsReducer";
import {
  SET_MATCHE_ID,
  SET_MAX_TICKET_NUMBER,
  SET_MIN_TICKET_NUMBER,
  SET_TICKET_DEADLINE,
  SET_TICKET_NUMBER,
  SET_TICKET_PRICE,
} from "../../reducers/ticketReducer/addTicketsActions";
const intitalState = {
  price: "",
  matchId: "",
  ticketNumber: "",
  maxTicketNumber: "",
  minTicketNumber: "",
  ticketDeadline: "",
};
const AddTicketPage = () => {
  const [matches, setMatches] = useState([]);
  const [state, dispatch] = useReducer(addTicketReducer, intitalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //get all matches
  const fetchMatches = async () => {
    try {
      const response = await axiosInstance.get(
        `${baseUrl}match/without/ticket/`
      );
      setMatches(response.data.data.matchs);
    } catch (error) {
    }
  };

  // handle submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      setError(false);
      const data = {
        matchId: state.matchId,
        ticket_price: state.price,
        min_ticket: state.minTicketNumber,
        max_ticket: state.maxTicketNumber,
        tickets: state.ticketNumber,
        lastReservationDate: state.ticketDeadline,
      };

      const response = await axiosInstance.post(
        `${baseUrl}match/ticket/create/`,
        data
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
  useEffect(() => {
    fetchMatches();
  }, []);
  return (
    <>
      <NavBar title="Tickets" />
      <div className="container">
        <p>Ajouter un tiquet de match</p>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input nom">
              <label htmlFor="nom">Choisir un match</label>
              <select
                size={5}
                multiple
                style={{
                  border: "solid 1px #ccc",
                }}
                onChange={(e) => {
                  dispatch({
                    type: SET_MATCHE_ID,
                    payload: e.target.value,
                  });
                }}
              >
                {matches.map((match) => (
                  <option
                    value={match.id}
                    key={match.id}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      margin: "5px",
                      border: "none",
                      width: "100%",
                    }}
                  >
                    {match.startDate} {match.opposingTeam.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input nom">
              <label htmlFor="nom">Dernier délai de la résérvation</label>
              <input
                type="date"
                id="nom"
                name="nom"
                placeholder="Dernier délai de la résérvation"
                onChange={(e) => {
                  dispatch({
                    type: SET_TICKET_DEADLINE,
                    payload: e.target.value,
                  });
                }}
              />
            </div>
            <div className="input nom">
              <label htmlFor="nom">Prix de ticket</label>
              <input
                type="number"
                id="nom"
                name="nom"
                placeholder="Prix de ticket"
                onChange={(e) => {
                  dispatch({
                    type: SET_TICKET_PRICE,
                    payload: e.target.value,
                  });
                }}
              />
            </div>
            <div className="input prix">
              <div className="input nom">
                <label htmlFor="nom">Nombre de tiquets Min</label>
                <input
                  type="number"
                  id="nom"
                  name="nom"
                  onChange={(e) => {
                    dispatch({
                      type: SET_MIN_TICKET_NUMBER,
                      payload: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="input nom">
                <label htmlFor="nom">Nombre de tiquets Max</label>
                <input
                  type="number"
                  id="nom"
                  name="nom"
                  onChange={(e) => {
                    dispatch({
                      type: SET_MAX_TICKET_NUMBER,
                      payload: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="input nom">
                <label htmlFor="nom">Nombre de tiquets total</label>
                <input
                  type="number"
                  id="nom"
                  name="nom"
                  onChange={(e) => {
                    dispatch({
                      type: SET_TICKET_NUMBER,
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
              {
                loading ? "Chargement..." : error ? "Erreur" : "Ajouter"
              }
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default AddTicketPage;
