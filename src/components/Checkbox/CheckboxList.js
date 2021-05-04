import React from 'react';
import Checkbox from "./Checkbox";
import {observer} from "mobx-react-lite";

const CheckboxList = (props) => {
    return (
        <div>
            {props.checkboxList.map((checkbox) =>
                <Checkbox
                    key={checkbox.id}
                    name={checkbox.name}
                    value={checkbox.value}
                    checked={checkbox.checked}
                    onChange={() => checkbox.handleClick()}
                />
            )}
        </div>
    );
};

export default observer(CheckboxList);