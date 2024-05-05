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
  hints: Hint[];
  setHints: (value: Hint[]) => (Hint | undefined)[];
};

export type Hint = {
  id: number;
  name: string;
  selected: boolean;
  available: boolean;
};

export const hintsArray = [
  {
    id: 1,
    name: "50 на 50",
    selected: false,
    available: true,
  },
  {
    id: 2,
    name: "Помощь зала",
    selected: false,
    available: true,
  },
  {
    id: 3,
    name: "Звонок другу",
    selected: false,
    available: true,
  },
  {
    id: 4,
    name: "Замена вопроса",
    selected: false,
    available: true,
  },
  {
    id: 5,
    name: "Второй шанс",
    selected: false,
    available: true,
  },
];

export const UserContextProvider = ({ children }: UserContextProvider) => {
  const [userName, setUserName] = useState<string>("");
  const [round, setRound] = useState<number>(0);
  const [hints, setHints] = useState<Hint[]>(hintsArray);

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        round,
        setRound,
        hints,
        setHints,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
