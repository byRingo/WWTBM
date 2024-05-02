import styled from "styled-components";
import MoneyArray from "../components/MoneyArray.tsx";
import { useUserContext } from "../UserContextProvider.tsx";
import QuestionSection from "../components/QuestionSection.tsx";
import { useEffect, useState } from "react";
import axios from "axios";

const Main = styled.div`
  display: flex;
`;

export const moneyArray = [
  3000000, 1500000, 800000, 400000, 200000, 100000, 50000, 25000, 15000, 10000,
  5000, 3000, 2000, 1000, 500,
].reverse();

interface questionObject {
  text: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correct_answer: string;
}

export default function GamePage() {
  const { round } = useUserContext();
  const [question, setQuestion] = useState<questionObject>(
    {} as questionObject,
  );

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/question", {
        params: { level: round + 1 },
      })
      .then((r) => {
        setQuestion(r.data);
      });
  }, [round]);

  return (
    <>
      <Main>
        <QuestionSection
          question={question["text"]}
          firstAnswer={question["answer1"]}
          secondAnswer={question["answer2"]}
          thirdAnswer={question["answer3"]}
          fourthAnswer={question["answer4"]}
          rightAnswer={question["correct_answer"]}
        />
        <MoneyArray moneyArray={moneyArray} round={round}></MoneyArray>
      </Main>
    </>
  );
}
