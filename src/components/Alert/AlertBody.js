import './alert.scss'

import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const AlertBody = observer((props) => {
    const {alertStore} = useContext(Context)
    return (
        <form className="alert">
            <div className="header">
                <h3>{props.header}</h3>
                <div className="close" onClick={props.handleClose || (() => alertStore.closeAlert())}>[x]</div>
            </div>
            <div className="content">
                <p>{props.content}</p>
                <div className="delimiter"/>
            </div>
            {props.actions && (
                <div className="actions">
                    <button className="action-btn">{props.actions.ok.text}</button>
                    <button className="action-btn">{props.actions.cancel.text}</button>
                </div>
            )}
        </form>
    );
});

export default AlertBody;