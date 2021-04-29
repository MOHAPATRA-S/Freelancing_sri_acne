import * as types from "../actions/types";

const userName = (state = "", action) => {
  switch (action.type) {
    case types.SET_USER_NAME:
      return action.userName;
    default:
      return state;
  }
};

export default userName;
