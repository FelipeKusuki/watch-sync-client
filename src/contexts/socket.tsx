import React, { createContext, ReactChild, useContext } from "react";
import environment from "../environments/prod.env";

import io from "socket.io-client";

const socket = io(environment.url);

const defaultValue = socket;
const SocketContext = createContext(defaultValue);

interface Props {
  children: ReactChild | ReactChild[];
}
export const SocketProvider = ({ children }: Props) => {
  return (
    <SocketContext.Provider value={defaultValue}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
