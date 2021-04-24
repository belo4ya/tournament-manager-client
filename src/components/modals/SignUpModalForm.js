import React, {useContext} from 'react';
import Form from "../Form/Form";
import Modal from "react-modal";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const SignUpModalForm = observer(() => {
    const {signUpModal} = useContext(Context)
    const handleClose = () => {
        signUpModal.closeModal()
    }
    const style = {
        overlay: {display: 'flex', alignItems: 'center', justifyContent: 'center'},
        content: {position: 'relative', inset: 0, padding: 0, borderRadius: '15px'}
    }

    return (
        <Modal
            style={style}
            onRequestClose={handleClose}
            isOpen={signUpModal.isOpen}
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