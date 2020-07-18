import { CLEAR_ERROR, LOADING_UI, SET_ERROR } from "./uiTypes";

const initialState = {
  loading: false,
  error: {},
};

const uiReducers = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ERROR:
      return {
        ...initialState,
      };

    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };

    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default uiReducers;
