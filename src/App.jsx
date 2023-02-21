import { useEffect, useState } from "react";
import "./App.css";
import Intro from "./components/Intro";
import Questions from "./components/Questions";
import { localQuestions } from "./localQuestions";
import Button from "./components/Button";
import Result from "./components/Result";

function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameState, setGameState] = useState("");
  function shuffle(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }
  // useEffect(() => {
  //   fetch("https://opentdb.com/api.php?amount=5")
  //     .then((response) => response.json())
  //     .then((result) => {
  //       // console.log(result);
  //       // result.response_code = 1;
  //       if (result.response_code === 0) setQuestions(result.results);
  //       else throw new Error(`response_code = ${result.response_code}`);
  //     })
  //     .catch(err => {
  //       console.log(err.message);
  //     });
  // }, []);
  useEffect(() => {    
    // получили объект из апи

    // создаем массив объектов ответов
    
    const state = localQuestions.map(qObj => {
      const incorrectAnwersObjArray = qObj.incorrect_answers.map(answer => {
        return {
          text: answer,
          chosen: false,
          correct: false,
        }
      });
      const correctAnwerObj = {
        text: qObj.correct_answer,
        chosen: false,
        correct: true,
      };
      const allAnswers = shuffle([...incorrectAnwersObjArray, correctAnwerObj]);
      return {
        question: qObj.question,
        answers: allAnswers,
      };
    });
    // console.log(state);
    setGameState(state);
  }, []);

  function selectAnswer(e) {
    const sel = "selected-answer";
    console.log(e.target.innerHTML);
    setGameState(prev => {
      const newGameState = prev.map((qObj, index) => {
        for (let answer of qObj.answers) {
          console.log(answer);
          if (e.target.innerHTML === answer) {
            
          }
        }
      })
    })
  }

  function checkAnswers() {
    // setGameOver(true);
    // let answersLists = document.querySelectorAll(".question-card__answers");
    // for (let j = 0; j < answersLists.length; j++) {
    //   const list = answersLists[j];
    //   for (let i = 0; i < list.children.length; i++) {
    //     // всем правильным ответам даем класс "правильный ответ"
    //     if (i === correctAnswersPlacement[j]) {
    //       list.children[i].classList.add("right-answer");
    //       // всем остальным ответам даем класс либо "неправильный ответ" либо "пользовательский неправильный ответ"
    //     } else if (list.children[i].classList.contains("selected-answer")) {
    //       list.children[i].classList.add("wrong-user-answer");
    //     } else {
    //       list.children[i].classList.add("wrong-answer");
    //     }
    //   }
    // }
  }

  return (
    <div className="App">
      <div className="container">
        {showIntro ? (
          <Intro showIntro={() => setShowIntro(false)} />
        ) : (
          <>
            <Questions
              gameState={gameState}
              selectAnswer={selectAnswer}
            />
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
          </>
        )}
      </div>
    </div>
  );
}

export default App;
