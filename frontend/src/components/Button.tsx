import styled from "styled-components";

const ButtonComponent = styled.button`
  display: block;
  padding: 1rem;
  margin-top: 0.3rem;
  background: white;
  margin-right: auto;
  margin-left: auto;
`;

interface ButtonProps {
  children: string;
  onClick: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return <ButtonComponent onClick={onClick}>{children}</ButtonComponent>;
}
