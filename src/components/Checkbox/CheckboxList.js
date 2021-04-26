import React from 'react';
import Checkbox from "./Checkbox";

const CheckboxList = (props) => {
    return (
        <div>
            {props.checkboxList.map((checkbox) =>
                <Checkbox
                    key={checkbox.id}
                    name={checkbox.name}
                    value={checkbox.value}
                    checked={checkbox.checked}
                    onChange={checkbox.onChange}
                />
            )}
        </div>
    );
};

export default CheckboxList;