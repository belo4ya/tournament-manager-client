import "./tournament.scss"
import placeholder from "../../assets/logo_placeholder.svg"

import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import OnPageNavigation from "../../components/OnPageNavigation/OnPageNavigation";
import Bracket from "../../components/Bracket/Bracket"
import Button from "../../components/Button";
import TeamsTable from "../../components/teams/TeamsTable";
import {fetchOneTournament} from "../../http/authorized";

const Tournament = () => {
    const {id} = useParams()

    const rounds = [
        {
            title: '1/4',
            seeds: [
                {},
                {
                    id: 1,
                    teams: [
                        {id: 1, name: 'The Leons', score: 2},
                        {id: 2, name: 'Kitties', score: 6},
                    ],
                },
                {},
                {
                    id: 2,
                    teams: [
                        {id: 3, name: 'The Leons', score: 2},
                        {id: 4, name: 'Kitties', score: 6},
                    ],
                },
            ],
        },
        {
            title: '1/2',
            seeds: [
                {},
                {},
            ]
        },
        {
            title: 'Финал',
            seeds: [
                {},
            ]
        },
    ];

    useEffect(() => {
        fetchOneTournament(id).then((data) => {
            console.log(data)
        })
    }, [id])

    const teams = [
        {
            id: 1,
            name: 'Astralis',
            logo: 'https://img-cdn.hltv.org/teamlogo/9bgXHp-oh1oaXr7F0mTGmd.svg?ixlib=java-2.1.0&s=f567161ab183001be33948b98c4b2067',
            rating: 993,
        },
        {
            id: 1,
            name: 'Astralis',
            logo: 'https://img-cdn.hltv.org/teamlogo/9bgXHp-oh1oaXr7F0mTGmd.svg?ixlib=java-2.1.0&s=f567161ab183001be33948b98c4b2067',
            rating: 993,
        },
        {
            id: 1,
            name: 'Astralis',
            logo: 'https://img-cdn.hltv.org/teamlogo/9bgXHp-oh1oaXr7F0mTGmd.svg?ixlib=java-2.1.0&s=f567161ab183001be33948b98c4b2067',
            rating: 993,
        },
        {
            id: 1,
            name: 'Astralis',
            logo: 'https://img-cdn.hltv.org/teamlogo/9bgXHp-oh1oaXr7F0mTGmd.svg?ixlib=java-2.1.0&s=f567161ab183001be33948b98c4b2067',
            rating: 993,
        },
        {
            id: 1,
            name: 'Astralis',
            logo: 'https://img-cdn.hltv.org/teamlogo/9bgXHp-oh1oaXr7F0mTGmd.svg?ixlib=java-2.1.0&s=f567161ab183001be33948b98c4b2067',
            rating: 993,
        },
        {
            id: 1,
            name: 'Astralis',
            logo: 'https://img-cdn.hltv.org/teamlogo/9bgXHp-oh1oaXr7F0mTGmd.svg?ixlib=java-2.1.0&s=f567161ab183001be33948b98c4b2067',
            rating: 993,
        },
        {
            id: 1,
            name: 'Astralis',
            logo: 'https://img-cdn.hltv.org/teamlogo/9bgXHp-oh1oaXr7F0mTGmd.svg?ixlib=java-2.1.0&s=f567161ab183001be33948b98c4b2067',
            rating: 993,
        },
        {
            id: 1,
            name: 'Astralis',
            logo: 'https://img-cdn.hltv.org/teamlogo/9bgXHp-oh1oaXr7F0mTGmd.svg?ixlib=java-2.1.0&s=f567161ab183001be33948b98c4b2067',
            rating: 993,
        },
        {
            id: 1,
            name: 'Astralis',
            logo: 'https://img-cdn.hltv.org/teamlogo/9bgXHp-oh1oaXr7F0mTGmd.svg?ixlib=java-2.1.0&s=f567161ab183001be33948b98c4b2067',
            rating: 993,
        },
        {
            id: 1,
            name: 'Astralis',
            logo: 'https://img-cdn.hltv.org/teamlogo/9bgXHp-oh1oaXr7F0mTGmd.svg?ixlib=java-2.1.0&s=f567161ab183001be33948b98c4b2067',
            rating: 993,
        },
        {
            id: 1,
            name: 'Astralis',
            logo: 'https://img-cdn.hltv.org/teamlogo/9bgXHp-oh1oaXr7F0mTGmd.svg?ixlib=java-2.1.0&s=f567161ab183001be33948b98c4b2067',
            rating: 993,
        },
        {
            id: 1,
            name: 'Astralis',
            logo: 'https://img-cdn.hltv.org/teamlogo/9bgXHp-oh1oaXr7F0mTGmd.svg?ixlib=java-2.1.0&s=f567161ab183001be33948b98c4b2067',
            rating: 993,
        },
        {
            id: 1,
            name: 'Astralis',
            logo: 'https://img-cdn.hltv.org/teamlogo/9bgXHp-oh1oaXr7F0mTGmd.svg?ixlib=java-2.1.0&s=f567161ab183001be33948b98c4b2067',
            rating: 993,
        },
        {
            id: 1,
            name: 'Astralis',
            logo: 'https://img-cdn.hltv.org/teamlogo/9bgXHp-oh1oaXr7F0mTGmd.svg?ixlib=java-2.1.0&s=f567161ab183001be33948b98c4b2067',
            rating: 993,
        },
        {
            id: 1,
            name: 'Astralis',
            logo: 'https://img-cdn.hltv.org/teamlogo/9bgXHp-oh1oaXr7F0mTGmd.svg?ixlib=java-2.1.0&s=f567161ab183001be33948b98c4b2067',
            rating: 993,
        }
    ]

    return (
        <div>
            <div className="container">
                <OnPageNavigation/>
                <div className="header-section">
                    <img className="tournament-logo" src={placeholder} alt=""/>
                    <div className="tournament-actions-name">
                        <h2>DreamHack Masters Spring 2021</h2>
                        <div>
                            <Button class="red">Редактировать</Button>
                            <Button class="black">Удалить</Button>
                        </div>
                    </div>
                </div>
                <div className="bracket-section">
                    <h4>Сетка</h4>
                    <div className="section-content-container">
                        <Bracket rounds={rounds}/>
                    </div>
                </div>
                <div className="matches-section">
                </div>
                <div className="participants-section">
                    <h4>Участники</h4>
                    <div className="section-content-container">
                        <div className="table-section">
                            <TeamsTable
                                teams={teams}
                                currentPage={0}
                                // prevPage={prevPage}
                                // nextPage={nextPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tournament;