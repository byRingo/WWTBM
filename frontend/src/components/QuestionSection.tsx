import styled from "styled-components";
import React from "react";
import { useUserContext } from "../UserContextProvider.tsx";
import { useNavigate } from "react-router-dom";
import { moneyArray } from "../pages/GamePage.tsx";
import Answer from "./Answer.tsx";
import axios from "axios";

const QuestionWindow = styled.div`
  display: block;
  background: black;
  border: 5px solid dodgerblue;
  margin-left: 35rem;
  margin-right: 30rem;
  border-radius: 200px/100px;
  font-size: 30px;
  height: 20rem;
  margin-top: 8rem;
  width: 30rem;
  padding: 5rem 5rem 0;
`;

const AnswersSection = styled.div`
  display: grid;
  position: absolute;
  top: 40rem;
  left: 41rem;
  grid-template-columns: 50% 3rem;
  grid-auto-rows: 2rem 2rem;
  gap: 6rem;
`;

interface QuestionSectionProps {
  question: string;
  firstAnswer: string;
  secondAnswer: string;
  thirdAnswer: string;
  fourthAnswer: string;
  rightAnswer: string;
}

export default function QuestionSection({
  question,
  firstAnswer,
  secondAnswer,
  thirdAnswer,
  fourthAnswer,
  rightAnswer,
}: QuestionSectionProps) {
  const navigate = useNavigate();
  const { userName, round, setRound } = useUserContext();

  const onClickQuestionHandler = (e: React.ChangeEvent<HTMLButtonElement>) => {
    if (e.target.id == rightAnswer) {
      setRound(round + 1);
    } else {
      axios
        .post("http://localhost:3000/api/v1/leaderboard", {
          user_name: userName,
          user_amount: round > 0 ? moneyArray[round - 1] : 0,
          used_hints_quantity: 0,
        })
        .then(() => {
          console.log("Success");
        });
      if (round === 0) {
        alert("Вы проиграли без выигрыша");
      } else {
        alert(`Ваш выигрыш составил ${moneyArray[round - 1]} рублей`);
      }
      setRound(0);
      navigate("/leaderboard");
    }
  };

  return (
    <>
      <QuestionWindow>{question}</QuestionWindow>
      <AnswersSection>
        <Answer onClick={onClickQuestionHandler} id={1}>
          {firstAnswer}
        </Answer>
        <Answer onClick={onClickQuestionHandler} id={2}>
          {secondAnswer}
        </Answer>
        <Answer onClick={onClickQuestionHandler} id={3}>
          {thirdAnswer}
        </Answer>
        <Answer onClick={onClickQuestionHandler} id={4}>
          {fourthAnswer}
        </Answer>
      </AnswersSection>
    </>
  );
}
