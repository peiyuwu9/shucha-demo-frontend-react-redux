import {
  LOADING_USER,
  LOGOUT_USER,
  MARK_NOTIFICATIONS_READ,
  SET_USER,
} from "./userTypes";
import { CLEAR_ERROR, LOADING_UI, SET_ERROR } from "../ui/uiTypes";

import axios from "axios";

const setTokenToStorageAndHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const signup = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then((res) => {
      setTokenToStorageAndHeader(res.data.idToken);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERROR });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      });
    });
};

export const login = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      setTokenToStorageAndHeader(res.data.idToken);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERROR });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      });
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: LOGOUT_USER });
};

export const markNotificationsRead = (notificationId) => (dispatch) => {
  axios
    .post("/user/notification", { notificationId })
    .then(
      dispatch({
        type: MARK_NOTIFICATIONS_READ,
        payload: notificationId,
      })
    )
    .catch((err) => console.log(err));
};
