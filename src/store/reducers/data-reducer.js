import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  DELETE_SCREAM,
  POST_SCREAM,
} from '../types';
import scream from '../../components/scream';

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      // eslint-disable-next-line no-case-declarations
      const unlikeIndex = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId,
      );
      // eslint-disable-next-line no-param-reassign
      state.screams[unlikeIndex] = action.payload;
      return {
        ...state,
      };
    case DELETE_SCREAM:
      // eslint-disable-next-line no-case-declarations
      const deleteIndex = state.screams.findIndex(scream => scream.screamId === action.payload);
      state.screams.splice(deleteIndex, 1);
      return {
        ...state,
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };

    default:
      return state;
  }
};
