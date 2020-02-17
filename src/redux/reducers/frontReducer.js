import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_FRONT,
  STOP_LOADING_FRONT
} from "../types";

const initialState = {
  loading: false,
  errors: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null
      };
    case LOADING_FRONT:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING_FRONT:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
