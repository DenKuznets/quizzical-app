import './Result.css'
import Button from './Button'

export default function Result(props) {
  return (
    <div className='result'>
      <h1 className='result__text'>You scored { props.correct }/5 correct answers</h1>
      <Button className="result__btn" text="Play again" />
    </div>
  )
}