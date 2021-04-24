import React, {useContext} from 'react';
import Form from "../Form/Form";
import Modal from "react-modal";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const SignInModalForm = observer(() => {
    const {signInModal} = useContext(Context)
    const handleClose = () => {
        signInModal.closeModal()
    }
    const style = {
        overlay: {display: 'flex', alignItems: 'center', justifyContent: 'center'},
        content: {position: 'relative', inset: 0, padding: 0, borderRadius: '15px'}
    }

    return (
        <Modal
            style={style}
            onRequestClose={handleClose}
            isOpen={signInModal.isOpen}
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