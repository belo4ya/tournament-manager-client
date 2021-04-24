import "./input.scss";

import React from 'react';

const Input = (props) => {
    return (
        <div className="input">
            <label htmlFor={props.id}>{props.label}</label>
            <input
                className={props.inputStyle || "input-secondary"}
                type={props.type}
                id={props.id}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
};

export default Input;