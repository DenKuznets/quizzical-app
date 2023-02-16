import { useState } from 'react'
import './App.css'
import Intro from './components/Intro'
import Questions from './components/Questions'

function App() {

  return (
    <div className="App">
      <Intro />
      <Questions />
    </div>
  )
}

export default App
