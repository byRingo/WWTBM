import styled, { css } from "styled-components";

const Element = styled.li<{ isActive?: boolean }>`
  border-radius: 5px;
  ${(props) =>
    props.isActive &&
    css`
      color: gold;
    `}
`;

interface MoneyElementProps {
  children: number;
  isActive: boolean;
}

export default function MoneyElement({
  children,
  isActive,
}: MoneyElementProps) {
  return <Element isActive={isActive}>{children}</Element>;
}
