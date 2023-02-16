import { useState } from "react";
import "./App.css";
import Intro from "./components/Intro";
import Questions from "./components/Questions";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <div className="App">
      <div className="container">{gameStarted ? <Questions /> : <Intro />}</div>
    </div>
  );
}

export default App;
