import "./form.scss";

import React from 'react';
import Input from "../Input";
import Button from "../Button";

const Form = (props) => {
    return (
        <form className="form">
            <div className="close" onClick={props.handleClose}>[x]</div>
            <h3>{props.title}</h3>
            {props.image && (
                <div className="image">
                    <label htmlFor={props.image.id}>{props.image.label}</label>
                    <div id={props.image.id} className="box">
                        <p>
                            Drag and drop
                            <br/>
                            or <span>browse</span>
                        </p>
                    </div>
                </div>
            )}
            <div className="fields">
                {props.fields.map((field) => {
                    return (
                        <Input
                            key={field.id}
                            id={field.id}
                            label={field.label}
                            inputStyle={field.inputStyle}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={field.value}
                            onChange={field.onChange}
                        />
                    );
                })}
            </div>
            {props.forgotPassword && (
                <a
                    href="/#"
                    className="forgotPassword"
                    onClick={() => alert('Функционал в разработке')}
                >
                    Забыли пароль?
                </a>
            )}
            <div className="actions">
                <Button class="modal-rounded red" onClick={props.handleSubmit}>{props.title}</Button>
                {props.authText && (
                    <span>{props.authText.text}
                        <a href="/#" onClick={props.authText.onClick}>{props.authText.action}</a>
                    </span>
                )}
            </div>
        </form>
    );
};

export default Form;