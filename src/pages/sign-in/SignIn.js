import React from 'react';
import Form from "../../components/Form/Form";
import Modal from "../../components/Modal/Modal"
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import useStore from "../../hooks/useStore";
import {PROFILE_ROUTE} from "../../utils/constants";

const SignIn = () => {
    const history = useHistory()
    const {userStore, modalStore} = useStore()
    const [signIn, signUp] = [modalStore.modalPages.signIn, modalStore.modalPages.signUp]

    const handleClose = () => {
        signIn.close()
    }

    const handleChangeLoginInput = (event) => {
        signIn.login.setValue(event.target.value)
    }

    const handleChangePasswordInput = (event) => {
        signIn.password.setValue(event.target.value)
    }

    const handleSignInButton = () => {
        if (signIn.isValid()) {
            userStore.signIn(signIn.login.value, signIn.password.value).then(() => {
                if (userStore.isAuth) {
                    handleClose()
                    history.push(PROFILE_ROUTE)
                }
            })
        }
    }

    const handleSignUpButton = () => {
        handleClose()
        signUp.open()
    }

    return (
        <Modal
            onRequestClose={handleClose}
            isOpen={signIn.isOpen}
        >
            <Form
                title="Вход"
                handleClose={handleClose}
                handleSubmit={handleSignInButton}
                fields={[
                    {
                        label: "Логин",
                        inputStyle: signIn.login.isValid() ? 'input-secondary' : 'input-danger',
                        type: "text",
                        placeholder: "login",
                        id: "login",
                        value: signIn.login.value,
                        onChange: handleChangeLoginInput
                    },
                    {
                        label: "Пароль",
                        inputStyle: signIn.password.isValid() ? 'input-secondary' : 'input-danger',
                        type: "password",
                        placeholder: "password",
                        id: "password",
                        value: signIn.password.value,
                        onChange: handleChangePasswordInput
                    },
                ]}
                forgotPassword={true}
                authText={{text: "Нужен аккаунт?", action: "Регистрация", onClick: handleSignUpButton}}
            />
        </Modal>
    );
};

export default observer(SignIn);