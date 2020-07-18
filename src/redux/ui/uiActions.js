import { CLEAR_ERROR } from "./uiTypes";

export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
