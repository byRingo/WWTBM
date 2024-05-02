import styled from "styled-components";
import React from "react";

const AnswerButton = styled.button`
  display: block;
  background: black;
  color: white;
  border: 5px solid dodgerblue;
  border-radius: 200px/100px;
  width: 12rem;
  height: 3rem;

  &:hover {
    background: aqua;
    color: black;
  }
`;

interface AnswerProps {
  children: string;
  id: number;
  onClick: (e: React.ChangeEvent<HTMLButtonElement>) => void;
}

export default function Answer({ children, id, onClick }: AnswerProps) {
  return (
    <AnswerButton onClick={onClick} id={id}>
      {children}
    </AnswerButton>
  );
}
