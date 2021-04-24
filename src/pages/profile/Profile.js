import "./profile.scss"

import React from 'react';
import OnPageNavigation from "../../components/OnPageNavigation";
import TournamentsStaticTable from "../../components/tournaments/TournamentsStaticTable";
import Button from "../../components/Button";
import TeamsList from "../../components/teams/TeamsList";

const Profile = () => {
    const username = 'belo4ya'
    const date = '14/14/2021 15:14'
    const tournaments = [
        {
            id: 1,
            logo: '',
            name: 'tournament 1',
            bracketType: 'Single Elimination',
            totalTeams: 16,
            createdDate: '23:11 16/04/2021',
        },
        {
            id: 2,
            logo: '',
            name: 'tournament 2',
            bracketType: 'Single Elimination',
            totalTeams: 16,
            createdDate: '23:11 16/04/2021',
        },
        {
            id: 3,
            logo: '',
            name: 'tournament 3',
            bracketType: 'Single Elimination',
            totalTeams: 16,
            createdDate: '23:11 16/04/2021',
        },
        {
            id: 4,
            logo: '',
            name: 'tournament 4',
            bracketType: 'Single Elimination',
            totalTeams: 16,
            createdDate: '23:11 16/04/2021',
        },
    ]
    const teams = [
        {
            id: 1,
            title: 'Liquid',
        },
        {
            id: 2,
            title: 'Liquid',
        },
        {
            id: 3,
            title: 'Liquid',
        },
        {
            id: 4,
            title: 'Liquid',
        },
    ]

    return (
        <div className="container">
            <OnPageNavigation/>
            <div className="profile-section">
                <div className="profile-card">
                    <h4>Логин</h4>
                    <p>{username}</p>
                    <h4>Дата регистрации</h4>
                    <p>{date}</p>
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
};

export default Profile;