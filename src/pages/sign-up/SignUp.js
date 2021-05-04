import React from 'react';
import Form from "../../components/Form/Form";
import Modal from "../../components/Modal/Modal"
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {PROFILE_ROUTE} from "../../utils/constants";
import useStore from "../../hooks/useStore";

const SignUp = () => {
    const history = useHistory()
    const {userStore, modalStore} = useStore()
    const [signIn, signUp] = [modalStore.modalPages.signIn, modalStore.modalPages.signUp]

    const handleClose = () => {
        signUp.close()
    }

    const handleChangeLoginInput = (event) => {
        signUp.login.setValue(event.target.value)
    }

    const handleChangePasswordInput = (event) => {
        signUp.password.setValue(event.target.value)
    }

    const handleChangeRePasswordInput = (event) => {
        signUp.rePassword.setValue(event.target.value)
    }

    const handleSignInButton = () => {
        handleClose()
        signIn.open()
    }

    const handleSignUpButton = () => {
        if (signUp.isValid()) {
            userStore.signUp(signUp.login.value, signUp.password.value).then(() => {
                if (userStore.isAuth) {
                    handleClose()
                    history.push(PROFILE_ROUTE)
                }
            })
        }
    }

    return (
        <Modal
            onRequestClose={handleClose}
            isOpen={signUp.isOpen}
        >
            <Form
                title="Регистрация"
                handleClose={handleClose}
                handleSubmit={handleSignUpButton}
                fields={[
                    {
                        label: "Логин",
                        inputStyle: signUp.login.isValid() ? 'input-secondary' : 'input-danger',
                        type: "text",
                        placeholder: "login",
                        id: "login",
                        value: signUp.login.value,
                        onChange: handleChangeLoginInput
                    },
                    {
                        label: "Пароль",
                        inputStyle: signUp.password.isValid() ? 'input-secondary' : 'input-danger',
                        type: "password",
                        placeholder: "password",
                        id: "password",
                        value: signUp.password.value,
                        onChange: handleChangePasswordInput
                    },
                    {
                        label: "Подтвердите пароль",
                        inputStyle: signUp.password.value === signUp.rePassword.value ? 'input-secondary' : 'input-danger',
                        type: "password",
                        placeholder: "confirm password",
                        id: "rePassword",
                        value: signUp.rePassword.value,
                        onChange: handleChangeRePasswordInput
                    },
                ]}
                forgotPassword={false}
                authText={{text: "Уже зарегистрированы?", action: "Вход", onClick: handleSignInButton}}
            />
        </Modal>
    );
};

export default observer(SignUp);