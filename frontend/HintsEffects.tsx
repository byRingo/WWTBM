import axios from "axios";
import { questionObject } from "./src/pages/GamePage.tsx";

export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function FiftyFifty(
  round: number,
  setQuestion: (value: questionObject) => questionObject,
  question: questionObject,
) {
  let randomAnswer1 = randomIntFromInterval(1, 5);
  while (randomAnswer1 === 5 || randomAnswer1 === +question.correct_answer) {
    randomAnswer1 = randomIntFromInterval(1, 5);
  }

  let randomAnswer2 = randomIntFromInterval(1, 5);
  while (
    randomAnswer2 === 5 ||
    randomAnswer1 === randomAnswer2 ||
    randomAnswer2 === +question.correct_answer
  ) {
    randomAnswer2 = randomIntFromInterval(1, 5);
  }
  let arr = [randomAnswer1, randomAnswer2];
  arr.map((ind) => {
    (
      document.getElementById(`question${ind}`) as HTMLButtonElement
    ).style.display = "none";
  });
}

export function AudienceHelp() {
  document.getElementById("chart")!.style.display = "block";
}

export function FriendCall(
  round: number,
  setQuestion: (value: questionObject) => questionObject,
  question: questionObject,
  setIsModalActive: (value: boolean) => boolean,
) {
  document.getElementById("modal")!.innerHTML =
    '<div><p>Введите номер телефона вашего друга</p><label for="text">Номер телефона</label><input id="text" name="text" value="Номер телефона" type="text"><button id="but">Отправить</button><div id="countdown"></div></div>';
  document.getElementById("but")!.onclick = () => {
    if (
      document.getElementById("text")!.value.length == 11 &&
      +document.getElementById("text")!.value
    ) {
      alert(
        `Ваш друг подсказал вам, что правильный ответ это ${question[`answer${question.correct_answer}`]}`,
      );
    }
  };
  let timeLeft = 30;
  let downloadTimer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(downloadTimer);
      setIsModalActive(false);
    } else {
      document.getElementById("countdown")!.innerHTML =
        " Осталось секунд: " + timeLeft;
    }
    timeLeft -= 1;
  }, 1000);
  setIsModalActive(true);
}

export function QuestionReplace(
  round: number,
  setQuestion: (value: questionObject) => questionObject,
) {
  axios
    .get("http://localhost:3000/api/v1/question", {
      params: { level: round + 1 },
    })
    .then((r) => {
      setQuestion(r.data);
    });
}

export function SecondChance(
  round: number,
  setQuestion: (value: questionObject) => questionObject,
  question: questionObject,
  setIsModalActive: (value: boolean) => boolean,
  setIsSecondChanceActive: (value: boolean) => boolean,
) {
  setIsSecondChanceActive(true);
}
