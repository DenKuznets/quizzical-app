import './Intro.css'
import Button from './Button'

export default function Intro(props) {
  return (
    <div className="intro">
      <h1 className="intro__title">Quizzical</h1>
      <p className='intro__description'>Free online trivia game</p>
      <Button onClick={props.startGame} className='intro__btn' text="Start quiz"/>
    </div>
  )
}
