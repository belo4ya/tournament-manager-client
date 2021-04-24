import React, {useContext, useState} from 'react';
import Form from "../Form/Form";
import Modal from "react-modal";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {$host} from "../../http";
import {SIGN_UP_ENDPOINT} from "../../utils/endpoints";
import jwtDecode from "jwt-decode";


const style = {
    overlay: {display: 'flex', alignItems: 'center', justifyContent: 'center'},
    content: {position: 'relative', inset: 0, padding: 0, borderRadius: '15px'}
}


const signUp = async (login, password) => {
    return (await $host.post(SIGN_UP_ENDPOINT, {username: login, password: password, role: 'ROLE_USER'})).data
}


const SignUpModalForm = observer(() => {
    const {userStore} = useContext(Context)
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
        handleClose()
        signInModal.openModal()
    }

    const handleSignUpButton = (event) => {
        signUp(login, password)
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
                    alert('Пользователь с таким логином уже существует')
                } else {
                    alert(e)
                }
            })
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
                    {
                        label: "Подтвердите пароль",
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
});

export default SignUpModalForm;