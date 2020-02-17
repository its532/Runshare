import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_FRONT,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  NOTIFICATIONS_READ
} from "../types";
import axios from "axios";

const authorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const signupAction = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_FRONT });
  axios
    .post("/signup", newUserData)
    .then(res => {
      authorizationHeader(res.data.token);
      dispatch(getUser());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginAction = (userData, history) => dispatch => {
  dispatch({ type: LOADING_FRONT });
  //   axios
  //     .post("/login", userData)
  //     .then(res => {
  //       console.log(res.data);
  //       localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);

  //       this.setState({
  //         loading: false
  //       });
  //       this.props.history.push("/");
  //       // this.props.loginUser(userData, this.props.history);
  //     })
  //     .catch(err => {
  //       this.setState({
  //         errors: err.response.data,
  //         loading: false
  //       });
  //     });

  axios
    .post("/login", userData)
    .then(res => {
      authorizationHeader(res.data.token);
      dispatch(getUser());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutAction = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUser = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const uploadImage = formData => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUser());
    })
    .catch(err => console.log(err));
};

export const editUser = userDetails => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUser());
    })
    .catch(err => console.log(err));
};

export const NotificationsRead = notificationIds => dispatch => {
  axios
    .post("/notifications", notificationIds)
    .then(res => {
      dispatch({
        type: NOTIFICATIONS_READ
      });
    })
    .catch(err => console.log(err));
};
