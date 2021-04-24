import './navigation.scss'

import React, {useContext} from 'react';
import Button from "../Button";
import {Context} from "../../index";

const Navigation = (props) => {
    const {userStore} = useContext(Context)
    const {signInModal} = useContext(Context)

    const handleCreateTournament = () => {
        if (userStore.isAuth) {
            console.log('Создание турнира')
        } else {
            signInModal.openModal()
        }
    }

    return (
        <nav className={["navigation", props.class].join(" ")}>
            <div className="nav-item">Главная</div>
            <div className="nav-item">О сервисе</div>
            <div className="nav-item">Об авторе</div>
            <Button class="white" onClick={handleCreateTournament}>Создать турнир</Button>
        </nav>
    );
};

export default Navigation;