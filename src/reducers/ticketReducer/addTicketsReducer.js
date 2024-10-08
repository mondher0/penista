import {
  SET_TICKET_PRICE,
  SET_MATCHE_ID,
  SET_TICKET_NUMBER,
  SET_MAX_TICKET_NUMBER,
  SET_MIN_TICKET_NUMBER,
  SET_TICKET_DEADLINE,
  GET_MATCHE_DETAILS,
} from "./addTicketsActions";

export const addTicketReducer = (state, action) => {
  if (action.type === GET_MATCHE_DETAILS) {
    const { lastReservationDate } = action.payload;
    let date = new Date(lastReservationDate);
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Months are zero-based
    var day = date.getDate();
    var formattedDate =
      year +
      "-" +
      month.toString().padStart(2, "0") +
      "-" +
      day.toString().padStart(2, "0");
    return {
      ...state,
      price: action.payload.ticket_price,
      ticketNumber: action.payload.tickets,
      maxTicketNumber: action.payload.max_ticket,
      minTicketNumber: action.payload.min_ticket,
      ticketDeadline: formattedDate,
    };
  }
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
