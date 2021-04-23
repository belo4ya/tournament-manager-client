import "./Button.scss";

export default function Button(props) {
  return (
    <button className={["button", props.class].join(" ")} onClick={props.onClick}>{props.text}</button>
  );
}
