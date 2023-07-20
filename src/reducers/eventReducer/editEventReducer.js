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
  GET_EVENT_DETAILS,
  EDIT_START_DATE,
  EDIT_END_DATE,
  EDIT_PLACES,
  EDIT_OPTION_VALUES,
  SET_TICKETS,
  FOR_USER,
} from "./addEventActions";
export const editEventReducer = (state, action) => {
  if (action.type === GET_EVENT_DETAILS) {
    return {
      ...state,
      title: action.payload.response?.title,
      type: action.payload.response?.type,
      description: action.payload.response?.description,
      uploaded_images: action.payload.response?.images[0]?.image,
      max_ticket: action.payload.response?.max_ticket,
      min_ticket: action.payload.response?.min_ticket,
      pro_price: action.payload.response?.pro_price,
      premium_price: action.payload.response?.premium_price,
      free_price: action.payload.response?.free_price,
      maps_link: action.payload.response?.maps_link,
      address: action.payload.response?.address,
      res_type: action.payload.response?.res_type,
      dates: action.payload.response?.dates ? action.payload.response?.dates : [],
      optionName: action.payload.response?.options?.name,
      values: action.payload.response?.options?.values,
      tickets: action.payload.response?.tickets,
      forUser: action.payload.response?.forUsers,
    };
  }
  if (action.type === EDIT_START_DATE) {
    return {
      ...state,
      dates: state.dates.map((date, index) =>
        index === action.payload.index
          ? { ...date, date_start: action.payload.date }
          : date
      ),
    };
  }
  if (action.type === EDIT_END_DATE) {
    return {
      ...state,
      dates: state.dates.map((date, index) =>
        index === action.payload.index
          ? { ...date, date_end: action.payload.date }
          : date
      ),
    };
  }
  if (action.type === EDIT_PLACES) {
    return {
      ...state,
      dates: state.dates.map((date, index) =>
        index === action.payload.index
          ? { ...date, place: action.payload.place }
          : date
      ),
    };
  }
  if (action.type === EDIT_OPTION_VALUES) {
    state.values[action.payload.index] = action.payload.value;
    return {
      ...state,
      values: state.values,
    };
  }

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
      place: action.payload,
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
  if (action.type === SET_TICKETS) {
    return {
      ...state,
      tickets: action.payload,
    };
  }

  if (action.type === FOR_USER) {
    return {
      ...state,
      forUser: action.payload,
    };
  }

  if (
    action.type === SET_DATES &&
    state.date_start !== "" &&
    state.date_end !== "" &&
    state.place !== ""
  ) {
    return {
      ...state,
      dates: [
        ...state.dates,
        {
          date_start: state.date_start,
          date_end: state.date_end,
          place: parseInt(state.place),
        },
      ],
    };
  }
  return state;
};
