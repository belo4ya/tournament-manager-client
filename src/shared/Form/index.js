import "./Form.scss";

import Input from "../Input";
import Button from "../Button";

export default function Form(props) {
  return (
    <form className="form">
      <div className="close">[x]</div>
      <h2>{props.title}</h2>
      {props.image && (
        <div className="image">
          <label htmlFor={props.image.id}>{props.image.label}</label>
          <div id={props.image.id} className="box">
            <p>
              Drag and drop
              <br />
              or <span>browse</span>
            </p>
          </div>
        </div>
      )}
      <div className="fields">
        {props.fields.map((field) => {
          return (
            <Input
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              id={field.id}
            />
          );
        })}
      </div>
      {props.forgotPassword && (
        <a href="#" className="forgotPassword">
          Забыли пароль?
        </a>
      )}
      <div className="actions">
        <Button class="rounded red" text={props.title} />
        {props.authText && (
          <span>
            {props.authText.text}
            <a href="#">{props.authText.action}</a>
          </span>
        )}
      </div>
    </form>
  );
}
