import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import InputSection from "../components/InputSection.tsx";
import { Hint, useUserContext } from "../UserContextProvider.tsx";
import Button from "../components/Button.tsx";
import HintButton from "../components/HintButton.tsx";

const LogoImg = styled.img`
  display: block;
  width: 50rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3rem;
  border-radius: 5px;
`;

const HintsButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -30rem;
  margin-left: 4rem;
  width: 9rem;
`;

export default function OpeningPage() {
  const navigate = useNavigate();
  const { userName, setUserName, hints } = useUserContext();
  const [pickedHints, setPickedHints] = useState<Hint[]>([]);
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const validateSubmit = () => {
    let pickedHintQuantity = hints.reduce(
      (acc, currentValue) => (currentValue.selected ? ++acc : acc),
      0,
    );
    if (userName.length <= 0) {
      alert("Введите ваше имя");
    } else if (pickedHintQuantity > 3) {
      alert("Вы выбрали слишком большое количество подсказок");
    } else {
      navigate("/game");
    }
  };
  const handleButtonClick = () => {
    validateSubmit();
  };

  const handleHintClick = (e: React.ChangeEvent<HTMLButtonElement>) => {
    let hintToAdd = hints.find((item) => item.id == +e.target.id);
    hintToAdd ? (hintToAdd.selected = !hintToAdd.selected) : "";
    let pickedHintQuantity = hints.reduce(
      (acc, currentValue) => (currentValue.selected ? ++acc : acc),
      0,
    );
    if (pickedHintQuantity > 3) {
      pickedHints[0].selected = false;
      pickedHints.shift();
    }
    if (hintToAdd) {
      setPickedHints((prevState) => [...prevState, hintToAdd]);
    }
  };

  return (
    <>
      <LogoImg src="src/assets/logo.jpg" alt="Логотип" />
      <InputSection onChange={onInputChange} />
      <Button onClick={handleButtonClick}>Начать игру</Button>
      <HintsButtonSection>
        {hints.map((cur) => {
          return (
            <HintButton
              key={cur.id}
              id={cur.id}
              $active={cur.selected}
              onClick={handleHintClick}
            >
              {cur.name}
            </HintButton>
          );
        })}
      </HintsButtonSection>
    </>
  );
}
