import React from 'react';
import Checkbox from "./Checkbox";

const ChoiceBoxList = (props) => {
    return (
        <div className="choice-box-list">
            {Object.keys(props.choiceBoxList).map((key) =>
                <Checkbox
                    key={props.choiceBoxList[key].id}
                    name={key}
                    id={props.choiceBoxList[key].id}
                    value={props.choiceBoxList[key].value}
                    checked={props.choiceBoxList[key].checked}
                    onChange={props.onChange}
                />
            )}
        </div>
    );
};

export default ChoiceBoxList;