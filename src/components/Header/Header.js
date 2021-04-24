import "./Header.scss";

import React, {useContext} from 'react';
import Logo from "../Logo";
import Navigation from "../Navigation";
import Button from "../Button";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const Header = observer(() => {
    const {userStore} = useContext(Context)
    const {signInModal} = useContext(Context)
    const {signUpModal} = useContext(Context)

    const handleSignIn = () => {
        signInModal.openModal()
    }
    const handleSignUp = () => {
        signUpModal.openModal()
    }
    const handleSignOut = () => {
        userStore.isAuth = false
    }
    const handleProfile = () => {
    }

    const leftBtn = userStore.isAuth ?
        {text: 'Профиль', onClick: handleProfile} :
        {text: 'Вход', onClick: handleSignIn}

    const rightBtn = userStore.isAuth ?
        {text: 'Выход', onClick: handleSignOut} :
        {text: 'Регистрация', onClick: handleSignUp}

    return (
        <header>
            <div className="container">
                <Logo class="black"/>
                <Navigation/>
                <div className="auth">
                    <Button onClick={leftBtn.onClick}>{leftBtn.text}</Button>
                    <Button class="rounded black" onClick={rightBtn.onClick}>{rightBtn.text}</Button>
                </div>
            </div>
        </header>
    );
});

export default Header;