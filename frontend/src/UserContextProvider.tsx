import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext({});

export function useUserContext() {
  return useContext(UserContext) as Provider;
}

interface UserContextProvider {
  children: React.ReactNode;
}

type Provider = {
  round: number;
  setRound: (value: number) => number;
  setUserName: (value: string) => string;
  userName: string;
};
export const UserContextProvider = ({ children }: UserContextProvider) => {
  const [userName, setUserName] = useState<string>("");
  const [round, setRound] = useState<number>(0);

  return (
    <UserContext.Provider value={{ userName, setUserName, round, setRound }}>
      {children}
    </UserContext.Provider>
  );
};
