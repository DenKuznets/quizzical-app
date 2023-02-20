import { useState } from "react";
import "./Questions.css";
import Button from "./Button";
import Result from "./Result";
import { nanoid } from "nanoid";

export default function Questions(props) {
  const [gameOver, setGameOver] = useState(() => false);
  // запоминаем расположение правильных ответов
  const [correctAnswersPlacement] = useState(() => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(Math.floor(Math.random() * 4));
    }
    console.log('correct answers',arr);
    return arr;
  });

  function selectAnswer(e) {
    const sel = "selected-answer";
    for (let li of e.target.closest("ul").children) {
      if (e.target === li) {
        e.target.classList.add(sel);
      }
      if (li !== e.target && li.classList.contains(sel)) {
        li.classList.remove(sel);
      }
    }
  }

  function checkAnswers() {
    setGameOver(true);
    let answersLists = document.querySelectorAll(".question-card__answers");
    for (let j = 0; j < answersLists.length; j++) {
      const list = answersLists[j];
      for (let i = 0; i < list.children.length; i++) {
        // всем правильным ответам даем класс "правильный ответ"
        if (i === correctAnswersPlacement[j]) {
          list.children[i].classList.add("right-answer");
          // всем остальным ответам даем класс либо "неправильный ответ" либо "пользовательский неправильный ответ"
        } else if (list.children[i].classList.contains('selected-answer')) {
          list.children[i].classList.add("wrong-user-answer");
        } else {
          list.children[i].classList.add("wrong-answer");
        }
      }
    }
  }

  const questionCards = props.questions.map((qObj, index) => {
    const answers = [...qObj.incorrect_answers];
    // добавляем правильный ответ в запомненное место
    answers.splice(correctAnswersPlacement[index], 0, qObj.correct_answer);

    // создаем массив элементов <li>ответ</li>
    const answersListItems = answers.map((answer) => {
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
          <Button
            onClick={checkAnswers}
            className="check-answers-btn"
            text="Check answers"
          />
        )}
      </div>
    </div>
  );
}
