import "./App.css";
import "react-input-range/lib/css/index.css";

import Header from "./shared/Header";
import TournamentCard from "./shared/TournamentCard";
import PageSelector from "./shared/PageSelector";
import Form from "./shared/Form";
import Footer from "./shared/Footer";
import OnPageNavigation from "./shared/OnPageNavigation";
import TeamCard from "./shared/TeamCard";
import TournamentsTable from "./shared/TournamentsTable";
import Checkbox from "./shared/Checkbox";
import ParticipantsList from "./shared/ParticipantsList";
import InputRange from "react-input-range";

import React from 'react';

const App_ = () => {
    return (
        <div className="App">
            <Header/>
            <TournamentCard
                title="BLAST Premier Spring Showdown 2021"
                subtitle="Single Elimination"
                teams="16"
                date="23:11 16/04/2021"
            />
            <PageSelector page="1"/>
            <Form
                title="Вход"
                fields={[
                    {label: "Логин", type: "text", placeholder: "login", id: "login"},
                    {
                        label: "Пароль",
                        type: "password",
                        placeholder: "password",
                        id: "password",
                    },
                ]}
                forgotPassword={true}
                authText={{text: "Нужен аккаунт?", action: "Регистрация"}}
            />
            <Form
                title="Регистрация"
                fields={[
                    {label: "Логин", type: "text", placeholder: "login", id: "login"},
                    {
                        label: "Пароль",
                        type: "password",
                        placeholder: "password",
                        id: "password",
                    },
                    {
                        label: "Подтвердите пароль",
                        type: "password",
                        placeholder: "confirm password",
                        id: "confirm-password",
                    },
                ]}
                forgotPassword={false}
                authText={{text: "Уже зарегистрированы?", action: "Вход"}}
            />
            <Form
                title="СОЗДАНИЕ КОМАНДЫ"
                fields={[
                    {
                        label: "Название",
                        type: "text",
                        placeholder: "favorite team",
                        id: "title",
                    },
                    {
                        label: "Очки рейтинга",
                        type: "text",
                        placeholder: "1551",
                        id: "rating",
                    },
                ]}
                forgotPassword={false}
                image={{label: "Логотип", id: "logo"}}
            />
            <OnPageNavigation/>
            <TeamCard title="Astralis" id="420"/>
            <TournamentsTable
                tournaments={[
                    {
                        title: "BLAST Premier Spring Showdown 2021",
                        subtitle: "Single Elimination",
                        teams: "16",
                        date: "23:11 16/04/2021",
                    },
                    {
                        title: "BLAST Premier Spring Showdown 2021",
                        subtitle: "Single Elimination",
                        teams: "16",
                        date: "23:11 16/04/2021",
                    },
                    {
                        title: "BLAST Premier Spring Showdown 2021",
                        subtitle: "Single Elimination",
                        teams: "16",
                        date: "23:11 16/04/2021",
                    },
                ]}
            />
            <Checkbox name="single-elimination" value="Single Elimination"/>
            <ParticipantsList
                teams={[
                    {
                        title: "Astralis",
                        id: "420",
                    },
                    {
                        title: "Astralis",
                        id: "420",
                    },
                    {
                        title: "Astralis",
                        id: "420",
                    },
                ]}
            />
            <div className="react-input-range">
                {/* Читай документацию: https://github.com/davidchin/react-input-range */}
                <InputRange maxValue={20} minValue={0}/>
            </div>
            <Footer/>
        </div>
    );
};

export default App_;
