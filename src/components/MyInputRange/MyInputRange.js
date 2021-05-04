import "./my-input-range.scss"

import React from 'react';
import InputRange from "react-input-range";
import {observer} from "mobx-react-lite";


const MyInputRange = (props) => {
    return (
        <div className="react-input-range">
            <InputRange
                maxValue={props.maxValue}
                minValue={props.minValue}
                step={props.step}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
};

export default observer(MyInputRange);