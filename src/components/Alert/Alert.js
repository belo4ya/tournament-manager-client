import "./alert.scss"

import React, {useState} from 'react';
import Modal from "react-modal";

const style = {
    overlay: {display: 'flex', alignItems: 'center', justifyContent: 'center'},
    content: {position: 'relative', inset: 0, padding: 0, borderRadius: '15px'}
}

const Alert = (props) => {
    const [isOpen, setIsOpen] = useState(true)

    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <Modal
            style={style}
            onRequestClose={handleClose}
            isOpen={isOpen}
        >
            <form className="alert">
                <div className="header">
                    <h3>Предупреждение</h3>
                    <div className="close" onClick={props.handleClose}>[x]</div>
                </div>
                <div className="content">
                    <p>Выдействительно хотите удалить данный турнир?</p>
                    <div className="delimiter"/>
                </div>
                <div className="actions">
                    <button className="action-btn">Удалить</button>
                    <button className="action-btn">Отмена</button>
                </div>
            </form>
        </Modal>
    );
};

export default Alert;