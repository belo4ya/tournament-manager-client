import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import Modal from "react-modal";
import Form from "../Form";

const SignUpModalForm = observer(() => {
    const {signUpModal} = useContext(Context)
    const handleClose = () => {
        signUpModal.closeModal()
    }
    const modalStyle = {
        overlay: {display: 'flex', alignItems: 'center', justifyContent: 'center'},
        content: {position: 'relative', padding: 0, borderRadius: '15px'}
    }

    return (
        <Modal
            onRequestClose={handleClose}
            isOpen={signUpModal.isOpen}
            style={modalStyle}
        >
            <Form
                title="Регистрация"
                handleClose={handleClose}
                fields={[
                    {label: "Логин", type: "text", placeholder: "login", id: "login"},
                    {
                        label: "Пароль",
                        type: "password",
                        placeholder: "password",
                        id: "password",
                    },
                    {
                        label: "Подтвердите пароль",
                        type: "password",
                        placeholder: "confirm password",
                        id: "confirm-password",
                    },
                ]}
                forgotPassword={false}
                authText={{text: "Уже зарегистрированы?", action: "Вход"}}
            />
        </Modal>
    );
});

export default SignUpModalForm;