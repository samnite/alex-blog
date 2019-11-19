import { CLEAR_PROJECT, GET_PROJECT, SET_ALERT, SET_MAIN_PAGE } from '../types';

const initialState = {
  project: null,
  alert: null,
  isMain: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
        alert: null,
      };
    case SET_MAIN_PAGE:
      return {
        ...state,
        isMain: action.payload,
      };
    case SET_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    case CLEAR_PROJECT:
      return {
        ...state,
        project: null,
      };

    default:
      return state;
  }
};
