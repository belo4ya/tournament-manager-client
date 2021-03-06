import "./Input.scss";

export default function Input(props) {
  return (
    <div className="input">
      <label htmlFor={props.id}>{props.label}</label>
      <input type={props.type} id={props.id} placeholder={props.placeholder} />
    </div>
  );
}
