import './button.scss'

import React from 'react';

const Button = (props) => {
    return (
        <button
            className={["button", props.class].join(" ")}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default Button;