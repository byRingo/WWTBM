import styled from "styled-components";
import MoneyArray from "../components/MoneyArray.tsx";
import { useUserContext } from "../UserContextProvider.tsx";
import QuestionSection from "../components/QuestionSection.tsx";

const Main = styled.div`
  display: flex;
`;

const moneyArray = [
  3000000, 1500000, 800000, 400000, 200000, 100000, 50000, 25000, 15000, 10000,
  5000, 3000, 2000, 1000, 500,
].reverse();

export default function GamePage() {
  const { round } = useUserContext();
  return (
    <>
      <Main>
        <QuestionSection />
        <MoneyArray moneyArray={moneyArray} round={round}></MoneyArray>
      </Main>
    </>
  );
}
