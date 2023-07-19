/* eslint-disable react-hooks/exhaustive-deps */
import NavBar from "../shared/navBar/NavBar";
import "../produit/AddProductPage.css";
import { useEffect, useReducer } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { baseUrl } from "../../utils/constants";
import { addTicketReducer } from "../../reducers/ticketReducer/addTicketsReducer";
import {
  GET_MATCHE_DETAILS,
  SET_MAX_TICKET_NUMBER,
  SET_MIN_TICKET_NUMBER,
  SET_TICKET_DEADLINE,
  SET_TICKET_NUMBER,
  SET_TICKET_PRICE,
} from "../../reducers/ticketReducer/addTicketsActions";
import { useParams } from "react-router-dom";
const intitalState = {
  price: "",
  matchId: "",
  ticketNumber: "",
  maxTicketNumber: "",
  minTicketNumber: "",
  ticketDeadline: "",
};
const EditSingleTicket = () => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(addTicketReducer, intitalState);

  // get single match
  const getSingleMatch = async () => {
    try {
      const response = await axiosInstance.get(`${baseUrl}match/${id}/`);
      console.log(response);
      dispatch({
        type: GET_MATCHE_DETAILS,
        payload: response.data.data,
      });
      console.log(state);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleMatch();
  }, []);

  // handle submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(state);
      const data = {
        matchId: id,
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <NavBar title="Tickets" />
      <div className="container">
        <p>Modifier les tiquets de match {id}</p>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input nom">
              <label htmlFor="nom">Dernier délai de la résérvation</label>
              <input
                type="date"
                id="nom"
                name="nom"
                placeholder="Dernier délai de la résérvation"
                value={state.ticketDeadline}
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
                value={state.price}
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
                  value={state.minTicketNumber}
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
                  value={state.maxTicketNumber}
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
                  value={state.ticketNumber}
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
              Modifier
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default EditSingleTicket;
