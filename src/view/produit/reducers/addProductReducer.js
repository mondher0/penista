import { ADD_VALUE, SET_VALUE, SET_QUANTITE, SAVE } from "./addProductActions";
export const addProductReducer = (state, action) => {
  if (action.type === SET_VALUE) {
    return {
      ...state,
      value: action.payload,
    };
  }
  if (action.type === SET_QUANTITE) {
    return {
      ...state,
      quantite: action.payload,
    };
  }

  if (action.type === ADD_VALUE) {
    return {
      ...state,
      value: action.payload.value,
      quantite: action.payload.quantite,
      isFinished: true,
      isSaved: false,
      values: [
        ...state.values,
        {
          value: action.payload.value,
          quantite: action.payload.quantite,
          isSaved: true,
        },
      ],
    };
  }
  if (action.type === SAVE) {
    return {
      ...state,
      isSaved: true,
      isFinished: false,
      isAddingAfterSaved :true
    };
  }
  return state;
};
