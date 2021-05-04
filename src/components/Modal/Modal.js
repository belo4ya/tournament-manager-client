import React from 'react';
import ModalReact from 'react-modal'
import {observer} from "mobx-react-lite";

const style = {
    overlay: {display: 'flex', alignItems: 'center', justifyContent: 'center'},
    content: {position: 'relative', inset: 0, padding: 0, borderRadius: '15px'}
}

const Modal = ({onRequestClose, isOpen, children}) => {
    return (
        <ModalReact
            style={style}
            onRequestClose={onRequestClose}
            isOpen={isOpen}
        >
            {children}
        </ModalReact>
    );
};

export default observer(Modal);