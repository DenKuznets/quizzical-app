import "./Questions.css";
import { nanoid } from "nanoid";

export default function Questions(props) { 
  if (!props.gameState) return "LOADING";
  const questionCards = props.gameState.map((qObj) => {
    // создаем массив элементов <li>ответ</li>
    const answersListItems = qObj.answers.map((answer) => {
      return (
        <li
          key={nanoid()}
          className={`question-card__answer 
            ${props.gameOver && answer.correct && "correct-answer"} 
            ${props.gameOver && !answer.correct && "wrong-answer"}
            ${
              props.gameOver &&
              answer.selected &&
              !answer.correct &&
              "wrong-user-answer"
            }
            ${answer.selected && "selected-answer"}`}
          onClick={props.selectAnswer}
        >
          {answer.text}
        </li>
      );
    });

    // создаем готовую карточку с вопросом и 4 ответами
    return (
      <div key={nanoid()} data-questionnumber={qObj.questionNumber} className="question-card">
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
