import './Result.css'
import Button from './Button'

export default function Result(props) {
  return (
    <div className='result'>
      <h1 className='result__text'>You scored { props.correct } / {props.questions} correct answers</h1>
      <Button onClick={props.playAgain} className="result__btn" text="Play again" />
    </div>
  )
}