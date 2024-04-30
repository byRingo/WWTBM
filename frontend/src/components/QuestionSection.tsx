import styled from "styled-components";

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

const Answer = styled.button`
  display: block;
  background: black;
  color: white;
  border: 5px solid dodgerblue;
  border-radius: 200px/100px;
  width: 12rem;
  height: 3rem;

  &:hover {
    background: aqua;
  }
`;

// interface QuestionSectionProps {
//   question: string;
//   firstAnswer: string;
//   secondAnswer: string;
//   thirdAnswer: string;
//   fourthAnswer: string;
//   correctAnswer: string;
// }

export default function QuestionSection() {
  return (
    <>
      <QuestionWindow>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci autem
        deleniti enim est numquam odio odit officia officiis reiciendis
        voluptatum. Debitis ea eveniet impedit magnam non quo repudiandae sunt
        tenetur.
      </QuestionWindow>
      <AnswersSection>
        <Answer>1</Answer>
        <Answer>2</Answer>
        <Answer>3</Answer>
        <Answer>4</Answer>
      </AnswersSection>
    </>
  );
}
