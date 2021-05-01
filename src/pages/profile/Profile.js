import "./profile.scss"

import React, {useContext, useEffect, useState} from 'react';
import OnPageNavigation from "../../components/OnPageNavigation/OnPageNavigation";
import TournamentsStaticTable from "../../components/tournaments/TournamentsStaticTable";
import Button from "../../components/Button";
import TeamsRow from "../../components/teams/TeamsRow";
import {$authHost} from "../../http";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {alertError} from "../../utils/utils";


const getProfile = async () => {
    return await $authHost.get('/users/search/my')
        .then((response) => response.data)
        .catch((e) => alertError(e))
}

const getTournaments = async () => {
    return await $authHost.get('/tournaments/search/my', {
        params: {
            projection: 'bracketType',
            sort: ['lastModifiedDate', 'desc'].join(','),
            page: 0,
            size: 4
        }
    })
        .then((response) => response.data)
        .catch((e) => alertError(e))
}

const getTeams = async () => {
    return await $authHost.get('/teams/search/my', {
        params: {
            sort: ['lastModifiedDate', 'desc'].join(','),
            page: 0,
            size: 4
        }
    })
        .then((response) => response.data)
        .catch((e) => alertError(e))
}

const Profile = observer(() => {
    const {userStore} = useContext(Context)
    const [tournaments, setTournaments] = useState([])
    const [teams, setTeams] = useState([])

    useEffect(() => {
        getProfile().then((data) => {
            userStore.id = data.id
            userStore.createdDate = data.createdDate
            userStore.username = data.username
        })
        getTournaments().then((data) => {
            const tournaments = data._embedded.tournaments.map((t) => {
                t.date = t.lastModifiedDate
                return t
            })
            setTournaments(tournaments)
        })
        getTeams().then((data) => {
            setTeams(data._embedded.teams)
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
                            <Button class="black">Показать все</Button>
                            <Button class="red">Создать турнир</Button>
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
                            <Button class="red">Создать команду</Button>
                            <Button class="black">Показать все</Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
});

export default Profile;