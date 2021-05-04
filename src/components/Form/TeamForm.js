import "./form.scss"

import React from 'react';
import Input from "../Input/Input";
import Button from "../Button";
import {observer} from "mobx-react-lite";
import {alertMessage} from "../../utils/utils";

const TeamForm = (props) => {
    return (
        <form className="form">
            <div className="close" onClick={props.handleClose}>[x]</div>
            <h3>{props.title}</h3>
            <div className="image">
                <label htmlFor={props.image.id}>{props.image.label}</label>
                <div id={props.image.id} className="box" onClick={(event) => {
                    event.preventDefault()
                    alertMessage('Предупреждение', 'Функционал в разработке')
                }}>
                    <p>
                        Drag and drop
                        <br/>
                        or <span>browse</span>
                    </p>
                </div>
            </div>
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
            <div className="actions actions-team">
                <Button class="modal-rounded red" onClick={props.handleSubmit}>{props.action}</Button>
            </div>
        </form>
    );
};

export default observer(TeamForm);