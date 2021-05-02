import "./profile.scss"

import React, {useContext, useEffect, useState} from 'react';
import OnPageNavigation from "../../components/OnPageNavigation/OnPageNavigation";
import TournamentsStaticTable from "../../components/tournaments/TournamentsStaticTable";
import Button from "../../components/Button";
import TeamsRow from "../../components/teams/TeamsRow";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";
import {
    PROFILE_TEAMS_ROUTE,
    PROFILE_TOURNAMENTS_ROUTE,
    TEAM_CREATION_ROUTE,
    TOURNAMENT_CREATION_ROUTE
} from "../../utils/constants";
import {fetchProfileData, fetchProfileTeams, fetchProfileTournaments} from "../../http/authorized";

const Profile = observer(() => {
    const history = useHistory()
    const {userStore} = useContext(Context)
    const [tournaments, setTournaments] = useState([])
    const [teams, setTeams] = useState([])

    useEffect(() => {
        fetchProfileData().then((data) => {
            userStore.id = data?.id
            userStore.createdDate = data?.createdDate
            userStore.username = data?.username
        })
        fetchProfileTournaments().then((tournaments) => {
            setTournaments(tournaments.map((t) => {
                t.date = t.lastModifiedDate
                return t
            }))
        })
        fetchProfileTeams().then((teams) => {
            setTeams(teams)
        })
    }, [userStore])

    return (
        <div className="container">
            <OnPageNavigation/>
            <div className="profile-section">
                <div className="profile-card">
                    <h4>Логин</h4>
                    <p>{userStore.username}</p>
                    <h4>Дата регистрации</h4>
                    <p>{userStore.createdDate}</p>
                </div>
            </div>

            <div className="tournaments-section">
                <div className="rect first-rect"/>
                <div className="my-tournaments">
                    <h2>Мои турниры</h2>
                    <div className="tournaments">
                        <TournamentsStaticTable tournaments={tournaments}/>
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
                        <TeamsRow teams={teams}/>
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
});

export default Profile;