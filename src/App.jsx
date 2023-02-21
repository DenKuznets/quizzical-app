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
  // запоминаем расположение правильных ответов
  // const [correctAnswersPlacement] = useState(() => {
  //   const arr = [];
  //   for (let i = 0; i < 5; i++) {
  //     arr.push(Math.floor(Math.random() * 4));
  //   }
  //   // console.log("correct answers", arr);
  //   return arr;
  // });
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
    // из этого объекта делаем объект содержащий вопрос и 4 ответа (3 неправильных, 1 правильный) - он пойдет на маппинг в элемент questions.
    // правильные ответ помещается в случайное место c помощью shuffle:
    const answers = [];
    for (let i = 0; i < localQuestions.length; i++) {
      answers.push(
        shuffle([
          ...localQuestions[i].incorrect_answers,
          localQuestions[i].correct_answer,
        ])
      );
    }
    const state = localQuestions.map((qObj, index) => {
      return {
        question: qObj.question,
        [`answer${index}`]: {
          text: answers[index],
          classes: ["question-card__answer"],
        },
      };
    });
    console.log(state);
    setGameState(state);
  }, []);

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
