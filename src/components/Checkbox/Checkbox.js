import "./checkbox.scss"

import React from 'react';

const Checkbox = (props) => {
    return (
        <div
            className="checkbox"
            onMouseDown={(event) => {
                event.preventDefault()
            }}
            onDoubleClick={(event) => {
                event.preventDefault()
            }}
        >
            <input
                type="checkbox"
                id={props.id}
                name={props.name}
                value={props.value}
                checked={props.checked}
                onChange={props.onChange}
            />
            <label
                htmlFor={props.id}
                className="text-2"
            >
                {props.value}
            </label>
        </div>
    );
};

export default Checkbox;