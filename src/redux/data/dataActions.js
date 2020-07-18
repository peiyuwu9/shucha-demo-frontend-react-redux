import {
  CLEAR_POST,
  LIKE_POST,
  LOADING_ALL_POSTS,
  LOADING_SINGLE_POST,
  DELETE_POST,
  SET_NEW_POST,
  SET_POST,
  SET_POSTS,
  SUBMIT_COMMENT,
  UNLIKE_POST,
} from "./dataTypes";
import { CLEAR_ERROR, LOADING_UI, SET_ERROR } from "../ui/uiTypes";
import { USER_LIKE_POST, USER_UNLIKE_POST } from "../user/userTypes";

import axios from "axios";

export const getAllPosts = () => (dispatch) => {
  dispatch({ type: LOADING_ALL_POSTS });
  axios
    .get("/posts")
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_POSTS,
        payload: [],
      });
    });
};

export const uploadSinglePost = (formData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/post", formData)
    .then((res) => {
      dispatch({
        type: SET_NEW_POST,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERROR });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      });
    });
};

export const getSinglePost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_SINGLE_POST });
  axios
    .get(`/post/${postId}`)
    .then((res) => {
      dispatch({
        type: SET_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const submitComment = (postId, commentBody) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/post/${postId}/comment`, commentBody)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERROR });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERROR,
        payload: err.response.data,
      });
    });
};

export const likePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_POST,
        payload: res.data,
      });
      dispatch({
        type: USER_LIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const unlikePost = (postId) => (dispatch) => {
  axios
    .get(`/post/${postId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data,
      });
      dispatch({
        type: USER_UNLIKE_POST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deletePost = (postId) => (dispatch) => {
  axios
    .delete(`/post/${postId}`)
    .then(() => {
      dispatch({
        type: DELETE_POST,
        payload: postId,
      });
    })
    .catch((err) => console.log(err));
};

export const clearPost = () => (dispatch) => {
  dispatch({ type: CLEAR_POST });
};
