import React, {useContext, useState} from 'react';
import Form from "../Form/Form";
import Modal from "react-modal";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {PROFILE_ROUTE} from "../../utils/constants";
import {signIn} from "../../http/public";

const style = {
    overlay: {display: 'flex', alignItems: 'center', justifyContent: 'center'},
    content: {position: 'relative', inset: 0, padding: 0, borderRadius: '15px'}
}

const SignInModalForm = observer(() => {
    const history = useHistory()
    const {signInModal} = useContext(Context)
    const {signUpModal} = useContext(Context)
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleClose = () => {
        signInModal.closeModal()
        setLogin('')
        setPassword('')
    }

    const handleChangeLoginInput = (event) => {
        setLogin(event.target.value)
    }

    const handleChangePasswordInput = (event) => {
        setPassword(event.target.value)
    }

    const handleSignInButton = () => {
        if (isValidLogin(login) && isValidPassword(password)) {
            signIn(login, password).then((status) => {
                if (status) {
                    handleClose()
                    history.push(PROFILE_ROUTE)
                }
            })
        }
    }

    const handleSignUpButton = () => {
        handleClose()
        signUpModal.openModal()
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
                handleSubmit={handleSignInButton}
                fields={[
                    {
                        label: "Логин",
                        inputStyle: isValidLogin(login) ? 'input-secondary' : 'input-danger',
                        type: "text",
                        placeholder: "login",
                        id: "login",
                        value: login,
                        onChange: handleChangeLoginInput
                    },
                    {
                        label: "Пароль",
                        inputStyle: isValidPassword(password) ? 'input-secondary' : 'input-danger',
                        type: "password",
                        placeholder: "password",
                        id: "password",
                        value: password,
                        onChange: handleChangePasswordInput
                    },
                ]}
                forgotPassword={true}
                authText={{text: "Нужен аккаунт?", action: "Регистрация", onClick: handleSignUpButton}}
            />
        </Modal>
    );
});

export default SignInModalForm;


const isValidLogin = (login) => {
    return login.length > 3
}

const isValidPassword = (password) => {
    return password.length > 3
}