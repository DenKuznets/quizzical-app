import "./Questions.css";

export default function Questions() {
  return (
    <div className="questions">
      <div className="question-card">
        <h1 className="question-card__question">
          How would one say goodbye in Spanish?
        </h1>
        <ul className="question-card__answers">
          <li className="question-card__answer">answer 1</li>
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
          <li className="question-card__answer">answer 1</li>
          <li className="question-card__answer"> 2</li>
          <li className="question-card__answer">answerdadasdas 3</li>
          <li className="question-card__answer">answer 4</li>
        </ul>
      </div>
    </div>
  );
}
