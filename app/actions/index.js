import * as types from "./types";
export function setUserName(userName) {
  return {
    type: types.SET_USER_NAME,
    userName,
  };
}
