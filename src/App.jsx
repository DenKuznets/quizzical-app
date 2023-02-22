import { useEffect, useState } from "react";
import "./App.css";
import Intro from "./components/Intro";
import Questions from "./components/Questions";
import { localQuestions } from "./localQuestions";
import Button from "./components/Button";
import Result from "./components/Result";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [questions, setQuestions] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [fetchQuestions, setFetchQuestions] = useState(true);
  function shuffle(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  // =========================================api version==============================
  useEffect(() => {
    if (fetchQuestions) {
      fetch("https://opentdb.com/api.php?amount=5")
        .then((response) => response.json())
        .then((result) => {
          if (result.response_code === 0) {
            const state = result.results.map((qObj, index) => {
              const incorrectAnwersObjArray = qObj.incorrect_answers.map(
                (answer) => {
                  return {
                    text: answer,
                    selected: false,
                    correct: false,
                  };
                }
              );
              const correctAnwerObj = {
                text: qObj.correct_answer,
                selected: false,
                correct: true,
              };
              let allAnswers = shuffle([
                ...incorrectAnwersObjArray,
                correctAnwerObj,
              ]);
              // присвоить номера перемешанным ответам
              allAnswers = allAnswers.map((answer, index) => ({
                ...answer,
                answerNumber: index,
              }));
              return {
                question: qObj.question,
                questionNumber: index,
                answers: allAnswers,
              };
            });
            setQuestions(state);
            setFetchQuestions(false);
          } else throw new Error(`response_code = ${result.response_code}`);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

  }, [fetchQuestions]);
  // =====================================end of api version==============================

  // ==================================local version=================================
  // useEffect(() => {
  //   const state = localQuestions.map((qObj, index) => {
  //     const incorrectAnwersObjArray = qObj.incorrect_answers.map((answer) => {
  //       return {
  //         text: answer,
  //         selected: false,
  //         correct: false,
  //       };
  //     });
  //     const correctAnwerObj = {
  //       text: qObj.correct_answer,
  //       selected: false,
  //       correct: true,
  //     };
  //     let allAnswers = shuffle([...incorrectAnwersObjArray, correctAnwerObj]);
  //     // присвоить номера перемешанным ответам
  //     allAnswers = allAnswers.map((answer, index) => ({
  //       ...answer,
  //       answerNumber: index,
  //     }));

  //     return {
  //       question: qObj.question,
  //       questionNumber: index,
  //       answers: allAnswers,
  //     };
  //   });
  //   setQuestions(state);
  // }, []);
  // ========================end of local version=====================================

  function selectAnswer(e) {
    // внутри объекта с вопросами, находим нажатый ответ и меняем его selected на true а остальных ответов на false
    setQuestions((prev) =>
      prev.map((qObj) => ({
        ...qObj,
        answers: qObj.answers.map((answer) => {
          // менять selected нужно только внутри нажатой карточки с вопросом а не во всех
          if (
            e.target.closest("div").dataset.questionnumber ===
            qObj.questionNumber.toString()
          ) {
            return answer.answerNumber.toString() ===
              e.target.dataset.answernumber
              ? { ...answer, selected: true }
              : { ...answer, selected: false };
          } else {
            return { ...answer };
          }
        }),
      }))
    );
  }

  function checkAnswers() {
    setGameOver(true);
    let counter = 0;
    for (let question of questions) {
      for (let answer of question.answers) {
        if (answer.selected && answer.correct) counter++;
      }
    }
    setCorrectAnswers(counter);
  }

  function playAgain() {
    setGameOver(false);
    setFetchQuestions(true);
    // setQuestions((prev) =>
    //   prev.map((qObj) => ({
    //     ...qObj,
    //     answers: qObj.answers.map((answer) => ({ ...answer, selected: false })),
    //   }))
    // );
  }

  return (
    <div className="App">
      <div className="container">
        {showIntro ? (
          <Intro showIntro={() => setShowIntro(false)} />
        ) : (
          <>
            <Questions
              gameState={questions}
              gameOver={gameOver}
              selectAnswer={selectAnswer}
            />
            <div className="check-answers-container">
              {gameOver ? (
                <Result
                  playAgain={playAgain}
                  correct={correctAnswers}
                  questions={questions.length}
                />
              ) : (
                <Button
                  onClick={checkAnswers}
                  className="check-answers-btn"
                  text="Check answers"
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
