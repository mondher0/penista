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
} from "./addOffreActions";

export const editOffreReducer = (state, action) => {
  if (action.type === GET_offre_DETAILS) {
    const { expirationDate } = action.payload;
    const date = new Date(expirationDate);
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Months are zero-based
    var day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    // Format the date as desired (e.g., "YYYY-MM-DD")
    var formattedDate =
      year +
      "-" +
      month.toString().padStart(2, "0") +
      "-" +
      day.toString().padStart(2, "0");
    return {
      ...state,
      type: action.payload.promoType,
      title: action.payload.title,
      percentage: action.payload.percentage,
      promoCode: action.payload.promo_code,
      expirationDate: formattedDate,
      image: action.payload.image,
      expirationHour: hour,
      expirationMinute: minute,
    };
  }
  if (action.type === SET_OFFRE_TYPE) {
    return {
      ...state,
      type: action.payload,
    };
  }
  if (action.type === SET_OFFRE_TITLE) {
    return {
      ...state,
      title: action.payload,
    };
  }
  if (action.type === SET_OFFRE_IMAGE) {
    return {
      ...state,
      image: action.payload,
    };
  }
  if (action.type === SET_OFFRE_PERCENTAGE) {
    return {
      ...state,
      percentage: action.payload,
    };
  }
  if (action.type === SET_OFFRE_PROMO_CODE) {
    return {
      ...state,
      promoCode: action.payload,
    };
  }
  if (action.type === SET_OFFRE_EXPIRATION_DATE) {
    return {
      ...state,
      expirationDate: action.payload,
    };
  }
  if (action.type === SET_OFFRE_HOUR) {
    return {
      ...state,
      expirationHour: action.payload,
    };
  }
  if (action.type === SET_OFFRE_MINUTE) {
    return {
      ...state,
      expirationMinute: action.payload,
    };
  }
  return state;
};
