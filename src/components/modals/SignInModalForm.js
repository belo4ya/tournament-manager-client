import React, {useContext, useState} from 'react';
import Form from "../Form/Form";
import Modal from "react-modal";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {$host} from "../../http";
import {SIGN_IN_ENDPOINT} from "../../utils/endpoints";
import jwtDecode from "jwt-decode";


const style = {
    overlay: {display: 'flex', alignItems: 'center', justifyContent: 'center'},
    content: {position: 'relative', inset: 0, padding: 0, borderRadius: '15px'}
}


const signIn = async (login, password) => {
    return (await $host.post(SIGN_IN_ENDPOINT, {username: login, password: password})).data
}


const SignInModalForm = observer(() => {
    const {userStore} = useContext(Context)
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

    const handleSignInButton = (event) => {
        signIn(login, password)
            .then((data) => {
                const userData = jwtDecode(data.token)
                localStorage.setItem('token', data.token)
                userStore.isAuth = true
                userStore.username = userData.sub
                userStore.roles = userData.roles
                handleClose()
            })
            .catch((e) => {
                if (e.response && e.response.status === 401) {
                    alert('Неверный логин или пароль')
                } else {
                    alert(e)
                }
            })
    }
    const handleSignUpButton = (event) => {
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
                        type: "text",
                        placeholder: "login",
                        id: "login",
                        value: login,
                        onChange: handleChangeLoginInput
                    },
                    {
                        label: "Пароль",
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