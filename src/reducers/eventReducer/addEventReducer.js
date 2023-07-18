import {
  SET_START_DATE,
  SET_END_DATE,
  SET_PLACES,
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
} from "./addEventActions";
export const addEventReducer = (state, action) => {
  if (action.type === SET_TITLE) {
    return {
      ...state,
      title: action.payload,
    };
  }
  if (action.type === SET_TYPE) {
    return {
      ...state,
      type: action.payload,
    };
  }
  if (action.type === SET_DESCRIPTION) {
    return {
      ...state,
      description: action.payload,
    };
  }
  if (action.type === SET_IMAGE) {
    return {
      ...state,
      uploaded_images: action.payload,
    };
  }
  if (action.type === SET_MAX_TICKETS) {
    return {
      ...state,
      max_ticket: action.payload,
    };
  }
  if (action.type === SET_MIN_TICKETS) {
    return {
      ...state,
      min_ticket: action.payload,
    };
  }
  if (action.type === SET_PRO_PRICE) {
    return {
      ...state,
      pro_price: action.payload,
    };
  }
  if (action.type === SET_PREMIUM_PRICE) {
    return {
      ...state,
      premium_price: action.payload,
    };
  }
  if (action.type === SET_FREE_PRICE) {
    return {
      ...state,
      free_price: action.payload,
    };
  }
  if (action.type === SET_MAPS_LINK) {
    return {
      ...state,
      maps_link: action.payload,
    };
  }
  if (action.type === SET_ADDRESS) {
    return {
      ...state,
      address: action.payload,
    };
  }
  if (action.type === SET_RES_TYPE) {
    return {
      ...state,
      res_type: action.payload,
    };
  }
  if (action.type === SET_DATE_START) {
    return {
      ...state,
      date_start: action.payload,
    };
  }
  if (action.type === SET_DATE_END) {
    return {
      ...state,
      date_end: action.payload,
    };
  }

  if (action.type === SET_START_DATE) {
    return {
      ...state,
      date_start: action.payload,
    };
  }
  if (action.type === SET_END_DATE) {
    return {
      ...state,
      date_end: action.payload,
    };
  }
  if (action.type === SET_PLACES) {
    return {
      ...state,
      places: action.payload,
    };
  }
  if (action.type === SET_OPTION_NAME) {
    return {
      ...state,
      optionName: action.payload,
    };
  }
  if (action.type === SET_OPTION_VALUE) {
    return {
      ...state,
      value: action.payload,
    };
  }
  if (action.type === SET_VALUES) {
    return {
      ...state,
      values: [...state.values, state.value],
    };
  }

  if (
    action.type === SET_DATES &&
    state.date_start !== "" &&
    state.date_end !== "" &&
    state.places !== ""
  ) {
    return {
      ...state,
      dates: [
        ...state.dates,
        {
          date_start: state.date_start,
          date_end: state.date_end,
          place: parseInt(state.places),
        },
      ],
    };
  }
  return state;
};
