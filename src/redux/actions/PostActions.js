import {
  SET_LISTS,
  LOADING_DATA,
  LIKE_LIST,
  UNLIKE_LIST,
  DELETE_LIST,
  SET_ERRORS,
  POST_LIST,
  CLEAR_ERRORS,
  LOADING_FRONT,
  SET_LIST,
  STOP_LOADING_FRONT,
  SUBMIT_COMMENT
} from "../types";
import axios from "axios";

// Get List
export const getLists = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/screams")
    .then(res => {
      dispatch({
        type: SET_LISTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_LISTS,
        payload: []
      });
    });
};

export const searchLists = searchPlace => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .post("/scream/search", searchPlace)
    .then(res => {
      dispatch({
        type: SET_LISTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_LISTS,
        payload: []
      });
    });
};

export const getList = screamId => dispatch => {
  dispatch({ type: LOADING_FRONT });
  axios
    .get(`/scream/${screamId}`)
    .then(res => {
      dispatch({
        type: SET_LIST,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_FRONT });
    })
    .catch(err => console.log(err));
};

export const uploadPost = (screamId, formData) => dispatch => {
  dispatch({ type: LOADING_FRONT });
  axios
    .post(`/scream/${screamId}/image`, formData)
    .then(() => {
      dispatch(getLists());
    })
    .catch(err => console.log(err));
};

//投稿
export const postList = newScream => dispatch => {
  dispatch({ type: LOADING_FRONT });
  axios
    .post("/scream", newScream)
    .then(res => {
      dispatch({
        type: POST_LIST,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
// Like
export const likeList = screamId => dispatch => {
  axios
    .get(`/scream/${screamId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_LIST,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
// Unlike
export const unlikeList = screamId => dispatch => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_LIST,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//コメント送信
export const submitComment = (screamId, commentData) => dispatch => {
  axios
    .post(`/scream/${screamId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deleteList = screamId => dispatch => {
  axios
    .delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({ type: DELETE_LIST, payload: screamId });
    })
    .catch(err => console.log(err));
};

export const getUserData = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_LISTS,
        payload: res.data.screams
      });
    })
    .catch(() => {
      dispatch({
        type: SET_LISTS,
        payload: null
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
