import React, { createContext, useReducer, useEffect } from "react";
import { isUserAuth } from "../API";
import { ActionTypes } from "../AppState/actions";

import { activeUserReducer } from "./reducer";

export const userContext = createContext<any>({});

type Props = {
  children: any;
};

export const ActiveUserProvider: React.FC<Props> = ({ children }) => {
  const initialState = {
    id: undefined,
    username: undefined,
  };

  const [state, dispatch] = useReducer(activeUserReducer, initialState);

  const checkUser = async () => {
    isUserAuth().then((res) =>
      dispatch({
        type: ActionTypes.login,
        payload: { id: res.data.userId, username: res.data.username },
      })
    );
    // .catch((error) => console.log(error));
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
};
