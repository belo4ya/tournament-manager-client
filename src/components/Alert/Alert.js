import React, {useContext} from 'react';
import Modal from "react-modal";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const style = {
    overlay: {display: 'flex', alignItems: 'center', justifyContent: 'center'},
    content: {position: 'relative', inset: 0, padding: 0, borderRadius: '15px'}
}

const Alert = observer(() => {
    const {alertStore} = useContext(Context)

    return (
        <Modal
            style={style}
            isOpen={alertStore.isOpen}
            onRequestClose={() => alertStore.closeAlert()}
        >
            {alertStore.body}
        </Modal>
    );
});

export default Alert;