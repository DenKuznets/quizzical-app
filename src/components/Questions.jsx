import { useState } from "react";
import "./Questions.css";
import Button from "./Button";
import Result from "./Result";

export default function Questions() {
  const [gameOver, setGameOver] = useState(true);
  return (
    <div className="questions">
      <div className="questions-container">
        <div className="question-card">
          <h1 className="question-card__question">
            How would one say goodbye in Spanish?
          </h1>
          <ul className="question-card__answers">
            <li className="question-card__answer selected-answer">answer 1</li>
            <li className="question-card__answer"> 2</li>
            <li className="question-card__answer">answerdadasdas 3</li>
            <li className="question-card__answer">answer 4</li>
          </ul>
        </div>
        <div className="question-card">
          <h1 className="question-card__question">
            How would one say goodbye in Spanish? How would one say goodbye in
            Spanish?
          </h1>
          <ul className="question-card__answers">
            <li className="question-card__answer right-answer">answer 1</li>
            <li className="question-card__answer wrong-user-answer"> 2</li>
            <li className="question-card__answer wrong-answer">answerdadasdas 3</li>
            <li className="question-card__answer">answer 4</li>
          </ul>
        </div>
      </div>
      <div className="check-answers-container">
        {gameOver ? <Result correct="3" /> : <Button className='check-answers-btn' text="Check answers" />}
      </div>
    </div>
  );
}
