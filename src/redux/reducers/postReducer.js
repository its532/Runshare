import {
  SET_LISTS,
  LIKE_LIST,
  UNLIKE_LIST,
  LOADING_DATA,
  DELETE_LIST,
  POST_LIST,
  SET_LIST,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  lists: [],
  list: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_LISTS:
      return {
        ...state,
        lists: action.payload,
        loading: false
      };

    case SET_LIST:
      return {
        ...state,
        list: action.payload
      };
    case LIKE_LIST:
    case UNLIKE_LIST:
      let index = state.lists.findIndex(
        list => list.screamId === action.payload.screamId
      );
      state.lists[index] = action.payload;
      if (state.list.screamId === action.payload.screamId) {
        state.list = action.payload;
      }
      return {
        ...state
      };
    case DELETE_LIST:
      let indexDelete = state.lists.findIndex(
        list => list.screamId === action.payload
      );
      state.lists.splice(indexDelete, 1);
      return {
        ...state
      };
    case POST_LIST:
      return {
        ...state,
        //新たなlist,今まで存在していたlist
        lists: [action.payload, ...state.lists]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        list: {
          ...state.list,
          comments: [action.payload, ...state.list.comments]
        }
      };
    default:
      return state;
  }
}
