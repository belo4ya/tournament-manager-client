import './navigation.scss'

import React, {useContext} from 'react';
import Button from "../Button";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {ABOUT_ROUTE, CREATOR_ROUTE, INDEX_ROUTE, TOURNAMENT_CREATION} from "../../utils/constants";

const Navigation = observer((props) => {
    const history = useHistory()
    const {userStore} = useContext(Context)
    const {signInModal} = useContext(Context)

    const handleCreateTournamentButton = () => {
        if (userStore.isAuth) {
            history.push(TOURNAMENT_CREATION)
        } else {
            signInModal.openModal()
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
});

export default Navigation;