import React, {useContext} from 'react';
import Form from "../Form";
import Modal from "react-modal";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const SignInModalForm = observer(() => {
    const {signInModal} = useContext(Context)
    const handleClose = () => {
        signInModal.closeModal()
    }
    const modalStyle = {
        overlay: {display: 'flex', alignItems: 'center', justifyContent: 'center'},
        content: {position: 'relative', padding: 0, borderRadius: '15px'}
    }

    return (
        <Modal
            onRequestClose={handleClose}
            isOpen={signInModal.isOpen}
            style={modalStyle}
        >
            <Form
                title="Вход"
                handleClose={handleClose}
                fields={[
                    {label: "Логин", type: "text", placeholder: "login", id: "login"},
                    {
                        label: "Пароль",
                        type: "password",
                        placeholder: "password",
                        id: "password",
                    },
                ]}
                forgotPassword={true}
                authText={{text: "Нужен аккаунт?", action: "Регистрация"}}
            />
        </Modal>
    );
});

export default SignInModalForm;