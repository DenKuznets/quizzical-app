import { useState } from "react";
import "./Questions.css";
import Button from "./Button";
import Result from "./Result";
import { nanoid } from "nanoid";

export default function Questions(props) {
  const [gameOver, setGameOver] = useState(false);

  function selectAnswer(e) { 
    for (let li of e.target.closest("ul").children) {
      if (e.target === li) e.target.classList.add("selected-answer");
      else li.classList.remove("selected-answer");
    }
  }

  function checkAnswers() {
    console.log('check answers');
  }

  // функция перемешивающая массив ответов, что бы правильный ответ всегда был на случайной позиции
  function shuffle(array) {
    let newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  const questionCards = props.questions.map((qObj) => {
    // перемешиваем ответы
    const answersArray = shuffle([...qObj.incorrect_answers, qObj.correct_answer]);
    // создаем массив элементов <li>ответ</li>
    const answersListItems = answersArray.map((answer) => {
      return (
        <li
          key={nanoid()}
          className="question-card__answer"
          onClick={selectAnswer}
        >
          {answer}
        </li>
      );
    });

    // создаем готовую карточку с вопросом и 4 ответами
    return (
      <div key={nanoid()} className="question-card">
        <h1 className="question-card__question">{qObj.question}</h1>
        <ul className="question-card__answers">{answersListItems}</ul>
      </div>
    );
  });

  // создаем готовое игровое поле с вопросами и ответами
  return (
    <div className="questions">
      <div className="questions-container">{questionCards}</div>
      <div className="check-answers-container">
        {gameOver ? (
          <Result correct="3" />
        ) : (
          <Button onClick={checkAnswers} className="check-answers-btn" text="Check answers" />
        )}
      </div>
    </div>
  );
}
