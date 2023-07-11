import {
  GET_PRODUCT_DETAILS,
  ADD_VALUE,
  SET_VALUE,
  SET_QUANTITE,
  SAVE,
  EDIT,
  DELETE,
  UPDATE_QUANTITE,
  UPDATE_VALUE,
  SET_NAME,
  SET_DESCRIPTION,
  SET_FREE_PRICE,
  SET_PREMIUM_PRICE,
  SET_PRO_PRICE,
  SET_OPTION,
  SET_MEDIA,
  SET_LAVAGE,
} from "./editProductActions";

export const editProductReducer = (state, action) => {
  if (action.type === GET_PRODUCT_DETAILS) {
    console.log(action.payload);
    // converting the object ton an array of objects
    const arr = Object.entries(action.payload.options).map(([key, value]) => ({
      value: key,
      quantite: value,
      isAddingAfterSaved: true,
      disabled: true,
      isAdded: true,
      id: Math.random(),
    }));

    return {
      ...state,
      name: action.payload.name,
      description: action.payload.description,
      free_price: action.payload.free_price,
      premium_price: action.payload.premium_price,
      pro_price: action.payload.pro_price,
      isAddingAfterSaved: true,
      values: arr,
    };
  }
  if (action.type === SET_NAME) {
    return {
      ...state,
      name: action.payload,
    };
  }
  if (action.type === SET_DESCRIPTION) {
    return {
      ...state,
      description: action.payload,
    };
  }
  if (action.type === SET_FREE_PRICE) {
    return {
      ...state,
      free_price: action.payload,
    };
  }
  if (action.type === SET_PREMIUM_PRICE) {
    return {
      ...state,
      premium_price: action.payload,
    };
  }
  if (action.type === SET_PRO_PRICE) {
    return {
      ...state,
      pro_price: action.payload,
    };
  }
  if (action.type === SET_OPTION) {
    return {
      ...state,
      optionName: action.payload,
    };
  }
  if (action.type === SET_MEDIA) {
    return {
      ...state,
      media: action.payload,
    };
  }
  if (action.type === SET_LAVAGE) {
    return {
      ...state,
      lavage: action.payload,
    };
  }

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
      values: [
        ...state.values,
        {
          value: action.payload.value,
          quantite: action.payload.quantite,
          id: Math.random(),
          disabled: true,
          isAdded: false,
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
          isAdded: true,
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
            isAdded: false,
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
};