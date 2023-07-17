import {
  SET_TICKET_PRICE,
  SET_MATCHE_ID,
  SET_TICKET_NUMBER,
  SET_MAX_TICKET_NUMBER,
  SET_MIN_TICKET_NUMBER,
  SET_TICKET_DEADLINE,
} from "./addTicketsActions";

export const addTicketReducer = (state, action) => {
  if (action.type === SET_TICKET_PRICE) {
    return { ...state, price: action.payload };
  }
  if (action.type === SET_MATCHE_ID) {
    return { ...state, matchId: action.payload };
  }
  if (action.type === SET_TICKET_NUMBER) {
    return { ...state, ticketNumber: action.payload };
  }
  if (action.type === SET_MAX_TICKET_NUMBER) {
    return { ...state, maxTicketNumber: action.payload };
  }
  if (action.type === SET_MIN_TICKET_NUMBER) {
    return { ...state, minTicketNumber: action.payload };
  }
  if (action.type === SET_TICKET_DEADLINE) {
    return { ...state, ticketDeadline: action.payload };
  }
  return state;
};
