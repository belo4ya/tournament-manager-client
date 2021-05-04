import "./header.scss";

import React from 'react';
import Logo from "../Logo";
import Navigation from "../Navigation/Navigation";
import Button from "../Button";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {INDEX_ROUTE, PROFILE_ROUTE} from "../../utils/constants";
import useStore from "../../hooks/useStore";

const Header = () => {
    const history = useHistory()
    const {userStore, modalStore} = useStore()
    const [signIn, signUp] = [modalStore.modalPages.signIn, modalStore.modalPages.signUp]

    const handleSignIn = () => {
        signIn.open()
    }
    const handleSignUp = () => {
        signUp.open()
    }
    const handleSignOut = () => {
        userStore.signOut()
        history.push(INDEX_ROUTE)
    }
    const handleProfile = () => {
        history.push(PROFILE_ROUTE)
    }

    const leftButton = userStore.isAuth ?
        {text: 'Профиль', onClick: handleProfile} :
        {text: 'Вход', onClick: handleSignIn}

    const rightButton = userStore.isAuth ?
        {text: 'Выход', onClick: handleSignOut} :
        {text: 'Регистрация', onClick: handleSignUp}

    return (
        <header>
            <div className="container">
                <Logo class="black"/>
                <Navigation/>
                <div className="auth">
                    <Button onClick={leftButton.onClick}>{leftButton.text}</Button>
                    <Button class="rounded black" onClick={rightButton.onClick}>{rightButton.text}</Button>
                </div>
            </div>
        </header>
    );
};

export default observer(Header);