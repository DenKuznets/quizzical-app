import "./Button.css";

export default function Button(props) {
  return <button onClick={props.onClick} className={`btn ${props.className}`}>{props.text}</button>;
}
