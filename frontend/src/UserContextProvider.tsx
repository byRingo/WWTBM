import React, { createContext, useContext, useState } from "react";
import {
  AudienceHelp,
  FiftyFifty,
  FriendCall,
  QuestionReplace,
  SecondChance,
} from "../HintsEffects.tsx";

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
  effect: Function;
  selected: boolean;
  available: boolean;
};

export const hintsArray = [
  {
    id: 1,
    name: "50 на 50",
    effect: FiftyFifty,
    selected: false,
    available: true,
  },
  {
    id: 2,
    name: "Помощь зала",
    effect: AudienceHelp,
    selected: false,
    available: true,
  },
  {
    id: 3,
    name: "Звонок другу",
    effect: FriendCall,
    selected: false,
    available: true,
  },
  {
    id: 4,
    name: "Замена вопроса",
    effect: QuestionReplace,
    selected: false,
    available: true,
  },
  {
    id: 5,
    name: "Второй шанс",
    effect: SecondChance,
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
