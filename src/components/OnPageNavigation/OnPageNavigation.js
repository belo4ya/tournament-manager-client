import "./on-page-navigation.scss"

import React from 'react';
import Button from "../Button";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {
    PROFILE_ROUTE,
    PROFILE_TEAMS_ROUTE,
    PROFILE_TOURNAMENTS_ROUTE,
    TEAM_CREATION_ROUTE,
    TOURNAMENT_CREATION_ROUTE
} from "../../utils/constants";

const OnPageNavigation = observer(() => {
    const history = useHistory()

    const handleCreateTournamentButton = (event) => {
        event.preventDefault()
        history.push(TOURNAMENT_CREATION_ROUTE)
    }
    const handleCreateTeamButton = (event) => {
        event.preventDefault()
        history.push(TEAM_CREATION_ROUTE)
    }

    return (
        <div className="onPageNavigation">
            <nav className="links">
                <div className="nav-item" onClick={() => history.push(PROFILE_ROUTE)}>Профиль</div>
                <div className="nav-item" onClick={() => history.push(PROFILE_TOURNAMENTS_ROUTE)}>Турниры</div>
                <div className="nav-item" onClick={() => history.push(PROFILE_TEAMS_ROUTE)}>Команды</div>
            </nav>
            <div className="buttons">
                <Button class="black" onClick={handleCreateTournamentButton}>Создать турнир</Button>
                <Button class="red rounded" onClick={handleCreateTeamButton}>Создать команду</Button>
            </div>
        </div>
    );
});

export default OnPageNavigation;