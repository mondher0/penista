import {
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
  SET_DELEVERY_DESCRIPTION,
} from "./addProductActions";
export const addProductReducer = (state, action) => {
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
      product_images: [...state.product_images, action.payload],
    };
  }
  if (action.type === SET_DELEVERY_DESCRIPTION) {
    return {
      ...state,
      deliveryDesc: action.payload,
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
