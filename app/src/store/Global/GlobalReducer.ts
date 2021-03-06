import { SET_ERROR, SET_ERRORS, CLEAR_ERRORS } from "./actions";

export default (state: any, action: any) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: [],
      };
    default:
      return state;
  }
};
