import "./Questions.css";
import { nanoid } from "nanoid";

export default function Questions(props) { 
  if (!props.gameState) return "LOADING";
  const questionCards = props.gameState.map((qObj) => {
    // создаем массив элементов <li>ответ</li>
    const answersListItems = qObj.answers.map((answer) => {
      let classes = "question-card__answer";
      if (props.gameOver) {
        classes += answer.correct ? " correct-answer " : " wrong-answer ";
        if(answer.selected & !answer.correct) classes += " wrong-user-answer ";
      } else if (answer.selected) {
        classes += " selected-answer";
      }
        return (
          <li
            key={nanoid()}
            className={classes}
            onClick={props.selectAnswer}
          >
            {answer.text}
          </li>
        );
    });

    // создаем готовую карточку с вопросом и ответами
    return (
      <div key={nanoid()} data-questionnumber={qObj.questionNumber} className="question-card">
        <h1 className="question-card__question">{qObj.question}</h1>
        <ul className="question-card__answers">{answersListItems}</ul>
      </div>
    );
  });

  // создаем готовое игровое поле с карточками
  return (
    <div className="questions">
      <div className="questions-container">{questionCards}</div>      
    </div>
  );
}
