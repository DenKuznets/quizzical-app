import "./Questions.css";
import Button from "./Button";
import Result from "./Result";
import { nanoid } from "nanoid";

export default function Questions(props) { 
  const questionCards = props.questions.map((qObj, index) => {
    const answers = [...qObj.incorrect_answers];
    // добавляем правильный ответ в запомненное место
    answers.splice(props.correctAnswersPlacement[index], 0, qObj.correct_answer);

    // создаем массив элементов <li>ответ</li>
    const answersListItems = answers.map((answer) => {
      return (
        <li
          key={nanoid()}
          className="question-card__answer"
          onClick={props.selectAnswer}
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
    </div>
  );
}
