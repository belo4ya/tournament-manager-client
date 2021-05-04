import React, {useContext, useState} from 'react';
import Form from "../Form/Form";
import Modal from "react-modal";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {PROFILE_ROUTE} from "../../utils/constants";
import {signUp} from "../../http/public";

const style = {
    overlay: {display: 'flex', alignItems: 'center', justifyContent: 'center'},
    content: {position: 'relative', inset: 0, padding: 0, borderRadius: '15px'}
}

const SignUpModalForm = () => {
    const history = useHistory()
    const {signInModal} = useContext(Context)
    const {signUpModal} = useContext(Context)
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const handleClose = () => {
        signUpModal.closeModal()
        setLogin('')
        setPassword('')
        setRePassword('')
    }

    const handleChangeLoginInput = (event) => {
        setLogin(event.target.value)
    }

    const handleChangePasswordInput = (event) => {
        setPassword(event.target.value)
    }

    const handleChangeRePasswordInput = (event) => {
        setRePassword(event.target.value)
    }

    const handleSignInButton = (event) => {
        event.preventDefault()
        handleClose()
        signInModal.openModal()
    }

    const handleSignUpButton = (event) => {
        event.preventDefault()
        if (isValidLogin(login) && isValidPassword(password) && isValidRePassword(password, rePassword)) {
            signUp(login, password).then((status) => {
                if (status) {
                    handleClose()
                    history.push(PROFILE_ROUTE)
                }
            })
        }
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
                handleSubmit={handleSignUpButton}
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
                    {
                        label: "Подтвердите пароль",
                        inputStyle: isValidRePassword(password, rePassword) ? 'input-secondary' : 'input-danger',
                        type: "password",
                        placeholder: "confirm password",
                        id: "rePassword",
                        value: rePassword,
                        onChange: handleChangeRePasswordInput
                    },
                ]}
                forgotPassword={false}
                authText={{text: "Уже зарегистрированы?", action: "Вход", onClick: handleSignInButton}}
            />
        </Modal>
    );
};

export default observer(SignUpModalForm);


const isValidLogin = (login) => {
    return login.length > 3
}

const isValidPassword = (password) => {
    return password.length > 3
}

const isValidRePassword = (password, rePassword) => {
    return password === rePassword
}