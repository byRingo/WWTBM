import styled from "styled-components";
import { ChangeEvent } from "react";

const Input = styled.input`
  display: block;
  padding: 1rem;
  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
`;

interface InputSectionProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputSection({ onChange }: InputSectionProps) {
  return <Input placeholder={"Введите ваше имя"} onChange={onChange}></Input>;
}
