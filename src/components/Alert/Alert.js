import React from 'react';
import Modal from "react-modal";
import {observer} from "mobx-react-lite";
import useStore from "../../hooks/useStore";

const style = {
    overlay: {display: 'flex', alignItems: 'center', justifyContent: 'center'},
    content: {position: 'relative', inset: 0, padding: 0, borderRadius: '15px'}
}

const Alert = () => {
    const {modalStore} = useStore()

    const close = () => {
        modalStore.alert.close()
    }

    return (
        <Modal
            style={style}
            isOpen={modalStore.alert.isOpen}
            onRequestClose={close}
        >
            {modalStore.alert.body}
        </Modal>
    );
};

export default observer(Alert);