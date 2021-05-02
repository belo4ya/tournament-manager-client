import './button.scss'

import React from 'react';

const Button = (props) => {
    return (
        <button
            className={["button", props.class].join(" ")}
            onClick={(event) => {
                event.preventDefault()
                props.onClick(event)
            }}
        >
            {props.children}
        </button>
    );
};

export default Button;