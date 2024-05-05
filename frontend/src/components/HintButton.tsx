import styled from "styled-components";
import React from "react";

const Hint = styled.button<{ $active?: boolean }>`
  width: 7rem;
  height: 4.5rem;
  margin: 1rem;
  border-radius: 50px;
  color: white;
  background: #102958;
  border: ${(props) => (props.$active ? "4px solid green" : "1px solid black")};
`;

interface HintButtonProps {
  children: string;
  id: number;
  $active: boolean;
  onClick: (e: React.ChangeEvent<HTMLButtonElement>) => void;
}

export default function HintButton({
  children,
  id,
  onClick,
  $active,
}: HintButtonProps) {
  return (
    <Hint id={id} $active={$active} onClick={onClick}>
      {children}
    </Hint>
  );
}
