import "./profile.scss"

import React, {useContext, useEffect, useState} from 'react';
import OnPageNavigation from "../../components/OnPageNavigation";
import TournamentsStaticTable from "../../components/tournaments/TournamentsStaticTable";
import Button from "../../components/Button";
import TeamsList from "../../components/teams/TeamsList";
import {$authHost} from "../../http";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {MY_USER_ENDPOINT} from "../../utils/endpoints";
import {compareDates, toDate} from "../../utils/date";


const Profile = observer(() => {
    const {userStore} = useContext(Context)
    const [tournaments, setTournaments] = useState([])
    const [teams, setTeams] = useState([])

    useEffect(() => {
        $authHost.get(MY_USER_ENDPOINT)
            .then((response) => {
                const userData = response.data._embedded.users[0]
                userStore.id = userData.id
                userStore.createdDate = userData.createdDate
                userStore.username = userData.username

                $authHost.get(`/users/${userStore.id}/tournaments`)
                    .then((response) => {
                        const tournaments = response.data._embedded.tournaments.slice(0, 4)
                        setTournaments(tournaments.sort(compareDates).map((t) => {
                            t.date = t.lastModifiedDate
                            return t
                        }))
                    })
                    .catch((e) => {
                        alert(e)
                    })

                $authHost.get(`/users/${userStore.id}/teams`)
                    .then((response) => {
                        const teams = response.data._embedded.teams.slice(0, 4)
                        console.log(teams)
                        setTeams(teams.sort(compareDates))
                    })
                    .catch((e) => {
                        alert(e)
                    })
            })
            .catch((e) => {
                alert(e)
            })
    }, [])

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
                        <TeamsList teams={teams}/>
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