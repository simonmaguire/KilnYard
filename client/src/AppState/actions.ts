import { ActiveUser } from "./reducer";

export enum ActionTypes {
  login,
  logout,
}

export type login = {
  type: ActionTypes.login;
  payload: ActiveUser;
};

export type logout = {
  type: ActionTypes.logout;
};

export type UserActions = login | logout;
