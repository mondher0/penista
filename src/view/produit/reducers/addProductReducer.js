import {
  ADD_VALUE,
  SET_VALUE,
  SET_QUANTITE,
  SAVE,
  EDIT,
  DELETE,
  UPDATE_QUANTITE,
  UPDATE_VALUE,
} from "./addProductActions";
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
      value: "",
      quantite: "",
      isFinished: true,
      isAdded: false,
      values: [
        ...state.values,
        {
          value: action.payload.value,
          quantite: action.payload.quantite,
          id: Math.random(),
          disabled: true,
        },
      ],
    };
  }
  if (action.type === SAVE) {
    return {
      ...state,
      value: "",
      quantite: "",
      isFinished: false,
      isAdded: true,
      values: state.values.map((value) => {
        return {
          ...value,
          isAddingAfterSaved: true,
          disabled: true,
        };
      }),
    };
  }
  if (action.type === DELETE) {
    return {
      ...state,
      values: state.values.filter((value) => value.value !== action.payload),
    };
  }
  if (action.type === EDIT) {
    return {
      ...state,
      isFinished: true,
      isAdded: false,
      values: state.values.map((value) => {
        if (value.value === action.payload) {
          return {
            ...value,
            isAddingAfterSaved: false,
            disabled: false,
          };
        }
        return value;
      }),
    };
  }
  if (action.type === UPDATE_VALUE) {
    console.log(state);
    return {
      ...state,
      values: state.values.map((value) => {
        if (value.id === action.payload.id) {
          return {
            ...value,
            value: action.payload.value,
          };
        }
        return value;
      }),
    };
  }
  if (action.type === UPDATE_QUANTITE) {
    console.log(state);
    return {
      ...state,
      values: state.values.map((value) => {
        if (value.id === action.payload.id) {
          return {
            ...value,
            quantite: action.payload.quantite,
          };
        }
        return value;
      }),
    };
  }

  return state;
};
