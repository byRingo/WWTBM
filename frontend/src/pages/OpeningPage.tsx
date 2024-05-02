import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import InputSection from "../components/InputSection.tsx";
import { useUserContext } from "../UserContextProvider.tsx";
import Button from "../components/Button.tsx";

const LogoImg = styled.img`
  display: block;
  width: 50rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3rem;
  border-radius: 5px;
`;

export default function OpeningPage() {
  const navigate = useNavigate();
  const { userName, setUserName } = useUserContext();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const validateSubmit = () => {
    if (userName.length > 0) {
      navigate("/game");
    } else {
      alert("Введите ваше имя");
    }
  };
  const handleButtonClick = () => {
    validateSubmit();
  };

  return (
    <>
      <LogoImg src="src/assets/maxresdefault.jpg" alt="Логотип" />
      <InputSection onChange={onInputChange} />
      <Button onClick={handleButtonClick}>Начать игру</Button>
    </>
  );
}
