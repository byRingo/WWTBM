import styled from "styled-components";
import MoneyElement from "./MoneyElement.tsx";

const Money = styled.ul`
  margin-left: auto;
  margin-right: 1rem;
  list-style: none;
  display: flex;
  flex-direction: column-reverse;
  gap: 0.5rem;
  font-size: 40px;
  align-items: flex-end;
`;

interface MoneyArrayProps {
  moneyArray: number[];
  round: number;
}

export default function MoneyArray({ moneyArray, round }: MoneyArrayProps) {
  return (
    <Money>
      {moneyArray.map((cur, id) => (
        <MoneyElement key={id} isActive={id === round}>
          {cur} ₽
        </MoneyElement>
      ))}
    </Money>
  );
}
