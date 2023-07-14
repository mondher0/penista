import {
  SET_OFFRE_TYPE,
  SET_OFFRE_TITLE,
  SET_OFFRE_IMAGE,
  SET_OFFRE_PERCENTAGE,
  SET_OFFRE_PROMO_CODE,
  SET_OFFRE_EXPIRATION_DATE,
  SET_OFFRE_HOUR,
  SET_OFFRE_MINUTE,
} from "./addOffreActions";

export const addOffreReducer = (state, action) => {
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
