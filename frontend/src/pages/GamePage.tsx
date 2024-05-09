import styled from "styled-components";
import MoneyArray from "../components/MoneyArray.tsx";
import { useUserContext } from "../UserContextProvider.tsx";
import QuestionSection from "../components/QuestionSection.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import HintButton from "../components/HintButton.tsx";
import { HintsButtonSection } from "./OpeningPage.tsx";
import Modal from "../components/Modal.tsx";
import { VictoryPie, VictorySharedEvents } from "victory";

const Main = styled.div`
  display: flex;
`;

export const moneyArray = [
  3000000, 1500000, 800000, 400000, 200000, 100000, 50000, 25000, 15000, 10000,
  5000, 3000, 2000, 1000, 500,
].reverse();

export interface questionObject {
  text: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correct_answer: string;
}

const Section = styled(HintsButtonSection)`
  margin-top: 15rem;
`;

const createChartData = (question: questionObject) => {
  let data = [];
  for (let i = 0; i < 4; i++) {
    if (+question.correct_answer == i + 1) {
      data.push({ x: question[`answer${i + 1}`], y: i + 10 });
    } else {
      data.push({ x: question[`answer${i + 1}`], y: i + 2 });
    }
  }
  return data;
};

const setButtonDisplay = () => {
  (document.getElementById(`question1`) as HTMLButtonElement).style.display =
    "block";
  (document.getElementById(`question2`) as HTMLButtonElement).style.display =
    "block";
  (document.getElementById(`question3`) as HTMLButtonElement).style.display =
    "block";
  (document.getElementById(`question4`) as HTMLButtonElement).style.display =
    "block";
  document.getElementById("chart")!.style.display = "none";
};

const ChartSection = styled.svg`
  width: 500px;
  padding: -200px;
  height: 500px;
  position: absolute;
  left: 1250px;
  border-radius: 20px;
  background-color: cornflowerblue;
  z-index: -1;
`;

export default function GamePage() {
  const { round, hints } = useUserContext();
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [isHintUsed, setIsHintUsed] = useState<boolean>(false);
  const [question, setQuestion] = useState<questionObject>(
    {} as questionObject,
  );
  const [isSecondChanceActive, setIsSecondChanceActive] =
    useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/question", {
        params: { level: round + 1 },
      })
      .then((r) => {
        setIsHintUsed(false);
        setQuestion(r.data);
        setButtonDisplay();
      })
      .catch((err) => console.log(err));
  }, [round]);

  return (
    <>
      <ChartSection viewBox="0 0 1200 350" display={"block"} id={"chart"}>
        <VictorySharedEvents
          events={[
            {
              childName: ["pie"],
              target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [
                    {
                      childName: ["pie"],
                      mutation: (props) => {
                        return {
                          style: Object.assign({}, props.style, {
                            fill: "tomato",
                          }),
                        };
                      },
                    },
                  ];
                },
                onMouseOut: () => {
                  return [
                    {
                      childName: ["pie"],
                      mutation: () => {
                        return null;
                      },
                    },
                  ];
                },
              },
            },
          ]}
        >
          <g transform={"translate(0, -75)"}>
            <VictoryPie
              name="pie"
              width={1200}
              height={800}
              standalone={false}
              style={{
                labels: { fontSize: 50, padding: 10 },
              }}
              data={createChartData(question)}
            />
          </g>
        </VictorySharedEvents>
      </ChartSection>
      <Modal
        isActive={isModalActive}
        id={"modal"}
        setIsActive={setIsModalActive}
      >
        {""}
      </Modal>
      <Main>
        <Section>
          {hints.map((cur) => {
            if (cur.selected) {
              return (
                <HintButton
                  key={cur.id}
                  id={cur.id}
                  $active={cur.selected}
                  onClick={() => {
                    if (!isHintUsed) {
                      cur.effect(
                        round,
                        setQuestion,
                        question,
                        setIsModalActive,
                        setIsSecondChanceActive,
                      );
                      cur.selected = false;
                      cur.available = false;
                      setIsHintUsed(true);
                    } else {
                      if (document.getElementById("modal")) {
                        document.getElementById("modal")!.textContent =
                          "В одном раунде можно использовать только одну подсказку";
                        setIsModalActive(true);
                      }
                    }
                  }}
                >
                  {cur.name}
                </HintButton>
              );
            }
          })}
        </Section>
        <QuestionSection
          question={question["text"]}
          firstAnswer={question["answer1"]}
          secondAnswer={question["answer2"]}
          thirdAnswer={question["answer3"]}
          fourthAnswer={question["answer4"]}
          rightAnswer={question["correct_answer"]}
          isSecondChanceActive={isSecondChanceActive}
          setIsSecondChanceActive={setIsSecondChanceActive}
        />
        <MoneyArray moneyArray={moneyArray} round={round}></MoneyArray>
      </Main>
    </>
  );
}
