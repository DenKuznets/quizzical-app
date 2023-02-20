import { useEffect, useState } from "react";
import "./App.css";
import Intro from "./components/Intro";
import Questions from "./components/Questions";
import { localQuestions } from "./localQuestions";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [questions, setQuestions] = useState(() => []);
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
    setQuestions(localQuestions);
  }, []);

  function startGame() {
    setGameStarted(true);
  }

  return (
    <div className="App">
      <div className="container">
        {gameStarted ? <Questions questions={questions} /> : <Intro startGame={startGame} />}
      </div>
    </div>
  );
}

export default App;
