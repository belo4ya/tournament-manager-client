import "./profile.scss"

import React, {useEffect} from 'react';
import OnPageNavigation from "../../components/OnPageNavigation/OnPageNavigation";
import TournamentsStaticTable from "../../components/tournaments/TournamentsStaticTable";
import Button from "../../components/Button";
import TeamsRow from "../../components/teams/TeamsRow";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {
    PROFILE_TEAMS_ROUTE,
    PROFILE_TOURNAMENTS_ROUTE,
    TEAM_CREATION_ROUTE,
    TOURNAMENT_CREATION_ROUTE
} from "../../utils/constants";
import useStore from "../../hooks/useStore";

const Profile = () => {
    const history = useHistory()
    const {userStore} = useStore()

    useEffect(() => {
        userStore.load()
        userStore.user.previewTournamentStore.load()
        userStore.user.previewTeamStore.load()
    }, [userStore])

    return (
        <div className="container">
            <OnPageNavigation/>
            <div className="profile-section">
                <div className="profile-card">
                    <h4>Логин</h4>
                    <p>{userStore.user?.username}</p>
                    <h4>Дата регистрации</h4>
                    <p>{userStore.user?.createdDate}</p>
                </div>
            </div>

            <div className="tournaments-section">
                <div className="rect first-rect"/>
                <div className="my-tournaments">
                    <h2>Мои турниры</h2>
                    <div className="tournaments">
                        <TournamentsStaticTable tournaments={userStore.user.previewTournamentStore.tournaments}/>
                        <div className="buttons">
                            <Button class="black" onClick={() => history.push(PROFILE_TOURNAMENTS_ROUTE)}>Показать
                                все</Button>
                            <Button class="red" onClick={() => history.push(TOURNAMENT_CREATION_ROUTE)}>Создать
                                турнир</Button>
                        </div>
                    </div>
                </div>
                <div className="rect last-rect"/>
            </div>

            <div className="teams-section">
                <div className="my-teams">
                    <div className="my-teams__title">
                        <h2>Мои команды</h2>
                    </div>
                    <div className="my-teams__teams">
                        <TeamsRow teams={userStore.user.previewTeamStore.teams}/>
                        <div className="buttons">
                            <Button class="red" onClick={() => history.push(TEAM_CREATION_ROUTE)}>Создать
                                команду</Button>
                            <Button class="black" onClick={() => history.push(PROFILE_TEAMS_ROUTE)}>Показать
                                все</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(Profile);