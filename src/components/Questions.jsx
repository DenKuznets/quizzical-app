import "./Questions.css";
import { nanoid } from "nanoid";

export default function Questions(props) { 
  if (!props.gameState) return "LOADING";
  const questionCards = props.gameState.map((qObj, index) => {
    const answers = qObj[`answer${index}`];
    // создаем массив элементов <li>ответ</li>
    const answersListItems = answers.text.map((answer) => {
      return (
        <li
          key={nanoid()}
          className={ answers.classes }
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
