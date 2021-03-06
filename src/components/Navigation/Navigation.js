import './navigation.scss'

import React from 'react';
import Button from "../Button";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {ABOUT_ROUTE, CREATOR_ROUTE, INDEX_ROUTE, TOURNAMENT_CREATION_ROUTE} from "../../utils/constants";
import useStore from "../../hooks/useStore";

const Navigation = (props) => {
    const history = useHistory()
    const {userStore, modalStore} = useStore()

    const handleCreateTournamentButton = () => {
        if (userStore.isAuth) {
            history.push(TOURNAMENT_CREATION_ROUTE)
        } else {
            modalStore.modalPages.signIn.open()
        }
    }

    return (
        <nav className={["navigation", props.class].join(" ")}>
            <div className="nav-item" onClick={() => history.push(INDEX_ROUTE)}>Главная</div>
            <div className="nav-item" onClick={() => history.push(ABOUT_ROUTE)}>О сервисе</div>
            <div className="nav-item" onClick={() => history.push(CREATOR_ROUTE)}>Об авторе</div>
            <Button class="white" onClick={handleCreateTournamentButton}>Создать турнир</Button>
        </nav>
    );
};

export default observer(Navigation);