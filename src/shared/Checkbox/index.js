import "./Checkbox.scss";

export default function Checkbox(props) {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        name={props.name}
        id={props.name}
        value={props.value}
      />
      <label htmlFor={props.name} className="text-2">
        {props.value}
      </label>
    </div>
  );
}
