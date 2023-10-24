import { ActionTypes, UserActions } from "./actions";

export type ActiveUser = {
  id: String | undefined;
  username: String | undefined;
};

export const activeUserReducer = (state: ActiveUser, action: UserActions) => {
  switch (action.type) {
    case ActionTypes.login:
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
      };
    case ActionTypes.logout:
      return {
        ...state,
        id: undefined,
        username: undefined,
      };
    default:
      return state;
  }
};
