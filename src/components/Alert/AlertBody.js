import './alert.scss'

import React from 'react';
import {observer} from "mobx-react-lite";
import useStore from "../../hooks/useStore";

const AlertBody = (props) => {
    const {modalStore} = useStore()

    return (
        <form className="alert">
            <div className="header">
                <h3>{props.header}</h3>
                <div className="close" onClick={props.handleClose || (() => modalStore.alert.close())}>[x]</div>
            </div>
            <div className="content">
                <p>{props.content}</p>
                <div className="delimiter"/>
            </div>
            {props.actions && (
                <div className="actions">
                    <button
                        className="action-btn"
                        onClick={(event) => {
                            event.preventDefault()
                            props.onClick(event)
                        }}
                    >
                        {props.actions.ok.text}
                    </button>
                    <button
                        className="action-btn"
                        onClick={(event) => {
                            event.preventDefault()
                            props.onClick(event)
                        }}
                    >
                        {props.actions.cancel.text}
                    </button>
                </div>
            )}
        </form>
    );
};

export default observer(AlertBody);