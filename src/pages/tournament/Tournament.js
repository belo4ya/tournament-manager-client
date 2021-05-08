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
                title: '1/8',
                seeds: [
                    {
                        id: 1,
                        teams: [
                            {
                                id: 1,
                                name: 'Gambit',
                                logo: 'https://img-cdn.hltv.org/teamlogo/pNV-lVdpvYZIkDwHdEXXg-.svg?ixlib=java-2.1.0&s=8b557b5b4d283208976340ef1bc44c76'
                            },
                            {
                                id: 2,
                                name: 'OG',
                                logo: 'https://img-cdn.hltv.org/teamlogo/7b6DouMNGWcqENDx1vw_Ot.png?ixlib=java-2.1.0&w=50&s=5ffc85bfbc0398d0a826590a790a08a6'
                            },
                        ]
                    },
                    {
                        id: 2,
                        teams: [
                            {
                                id: 1,
                                name: 'Heroic',
                                logo: 'https://img-cdn.hltv.org/teamlogo/Q6BGM_VQRz8Y9m3UgaqiUx.svg?ixlib=java-2.1.0&s=9424e99a6d77c8f154ea2d74175b3e17'
                            },
                            {
                                id: 2,
                                name: 'FunPlus Phoenix',
                                logo: 'https://img-cdn.hltv.org/teamlogo/Min7KyMY3tuB2xt-nPyM-O.svg?ixlib=java-2.1.0&s=b037f336aeb9b89b9b09d4a4671f9b61'
                            },
                        ]
                    },
                    {
                        id: 3,
                        teams: [
                            {
                                id: 1,
                                name: 'Astralis',
                                logo: 'https://img-cdn.hltv.org/teamlogo/9bgXHp-oh1oaXr7F0mTGmd.svg?ixlib=java-2.1.0&s=f567161ab183001be33948b98c4b2067'
                            },
                            {
                                id: 2,
                                name: 'mousesports',
                                logo: 'https://img-cdn.hltv.org/teamlogo/1YWxVoOcvOf3R9Z0-HWyeU.svg?ixlib=java-2.1.0&s=07f948624704c960960b962a9c0416c3'
                            },
                        ]
                    },
                    {
                        id: 4,
                        teams: [
                            {
                                id: 1,
                                name: 'Natus Vincere',
                                logo: 'https://img-cdn.hltv.org/teamlogo/kixzGZIb9IYAAv-1vGrGev.svg?ixlib=java-2.1.0&s=8f9986a391fcb1adfbfff021b824a937'
                            },
                            {
                                id: 2,
                                name: 'NIP',
                                logo: 'https://img-cdn.hltv.org/teamlogo/-ttGATBV_P_HcZazxNNtIb.png?ixlib=java-2.1.0&w=50&s=ba94f7812d1f47183a83f3f34ab959eb'
                            },
                        ]
                    },
                    {
                        id: 5,
                        teams: [
                            {
                                id: 1,
                                name: 'Virtus.pro',
                                logo: 'https://img-cdn.hltv.org/teamlogo/yZ6Bpuui1rW3jocXQ68XgZ.svg?ixlib=java-2.1.0&s=f39be1d3e7baf30a4e7f0b1216720875'
                            },
                            {
                                id: 2,
                                name: 'Vitality',
                                logo: 'https://img-cdn.hltv.org/teamlogo/GAlByJtDTnkgbb9p_71SUL.png?ixlib=java-2.1.0&w=50&s=2838cd78a5ebb5c9fea4c485908e9dbb'
                            },
                        ]
                    },
                    {
                        id: 6,
                        teams: [
                            {
                                id: 1,
                                name: 'BIG',
                                logo: 'https://img-cdn.hltv.org/teamlogo/OgMRQA35hopXA8kDwMFHIY.svg?ixlib=java-2.1.0&s=ec7bc44165c7acf4224a22a1338ab7d7'
                            },
                            {
                                id: 2,
                                name: 'Spirit',
                                logo: 'https://img-cdn.hltv.org/teamlogo/RbtyvoP_5E-pU-MWu9zy2V.svg?ixlib=java-2.1.0&s=ac4c6b3e927d5cb8a6c3158c871fa846'
                            },
                        ]
                    },
                    {
                        id: 7,
                        teams: [
                            {
                                id: 1,
                                name: 'FURIA',
                                logo: 'https://img-cdn.hltv.org/teamlogo/mvNQc4csFGtxXk5guAh8m1.svg?ixlib=java-2.1.0&s=11e5056829ad5d6c06c5961bbe76d20c'
                            },
                            {
                                id: 2,
                                name: 'Complexity',
                                logo: 'https://img-cdn.hltv.org/teamlogo/R0CzydpyX02BnkAYhy3I89.svg?ixlib=java-2.1.0&s=8c5833d6069ef924fdbb2e220fefea00'
                            },
                        ]
                    },
                    {
                        id: 8,
                        teams: [
                            {
                                id: 1,
                                name: 'G2',
                                logo: 'https://img-cdn.hltv.org/teamlogo/zFLwAELOD15BjJSDMMNBWQ.png?ixlib=java-2.1.0&w=50&s=affb583e6716d8ee904826992255cc4b'
                            },
                            {
                                id: 2,
                                name: 'Liquid',
                                logo: 'https://img-cdn.hltv.org/teamlogo/JMeLLbWKCIEJrmfPaqOz4O.svg?ixlib=java-2.1.0&s=c02caf90234d3a3ebac074c84ba1ea62'
                            },
                        ]
                    }
                ]
            },
            {
                title: '1/4',
                seeds: [
                    {},
                    {},
                    {},
                    {},
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
            }
            ,
            [id]
        )

        const teams = [
            {
                id: 1,
                name: 'Gambit',
                logo: 'https://img-cdn.hltv.org/teamlogo/pNV-lVdpvYZIkDwHdEXXg-.svg?ixlib=java-2.1.0&s=8b557b5b4d283208976340ef1bc44c76',
                rating: 993,
            },
            {
                id: 1,
                name: 'Heroic',
                logo: 'https://img-cdn.hltv.org/teamlogo/Q6BGM_VQRz8Y9m3UgaqiUx.svg?ixlib=java-2.1.0&s=9424e99a6d77c8f154ea2d74175b3e17',
                rating: 990,
            },
            {
                id: 1,
                name: 'Astralis',
                logo: 'https://img-cdn.hltv.org/teamlogo/9bgXHp-oh1oaXr7F0mTGmd.svg?ixlib=java-2.1.0&s=f567161ab183001be33948b98c4b2067',
                rating: 989,
            },
            {
                id: 1,
                name: 'Natus Vincere',
                logo: 'https://img-cdn.hltv.org/teamlogo/kixzGZIb9IYAAv-1vGrGev.svg?ixlib=java-2.1.0&s=8f9986a391fcb1adfbfff021b824a937',
                rating: 988,
            },
            {
                id: 1,
                name: 'Virtus.pro',
                logo: 'https://img-cdn.hltv.org/teamlogo/yZ6Bpuui1rW3jocXQ68XgZ.svg?ixlib=java-2.1.0&s=f39be1d3e7baf30a4e7f0b1216720875',
                rating: 983,
            },
            {
                id: 1,
                name: 'BIG',
                logo: 'https://img-cdn.hltv.org/teamlogo/OgMRQA35hopXA8kDwMFHIY.svg?ixlib=java-2.1.0&s=ec7bc44165c7acf4224a22a1338ab7d7',
                rating: 971,
            },
            {
                id: 1,
                name: 'FURIA',
                logo: 'https://img-cdn.hltv.org/teamlogo/mvNQc4csFGtxXk5guAh8m1.svg?ixlib=java-2.1.0&s=11e5056829ad5d6c06c5961bbe76d20c',
                rating: 920,
            },
            {
                id: 1,
                name: 'G2',
                logo: 'https://img-cdn.hltv.org/teamlogo/zFLwAELOD15BjJSDMMNBWQ.png?ixlib=java-2.1.0&w=50&s=affb583e6716d8ee904826992255cc4b',
                rating: 918,
            },
            {
                id: 1,
                name: 'OG',
                logo: 'https://img-cdn.hltv.org/teamlogo/7b6DouMNGWcqENDx1vw_Ot.png?ixlib=java-2.1.0&w=50&s=5ffc85bfbc0398d0a826590a790a08a6',
                rating: 917,
            },
            {
                id: 1,
                name: 'FunPlus Phoenix',
                logo: 'https://img-cdn.hltv.org/teamlogo/Min7KyMY3tuB2xt-nPyM-O.svg?ixlib=java-2.1.0&s=b037f336aeb9b89b9b09d4a4671f9b61',
                rating: 860,
            },
            {
                id: 1,
                name: 'mousesports',
                logo: 'https://img-cdn.hltv.org/teamlogo/1YWxVoOcvOf3R9Z0-HWyeU.svg?ixlib=java-2.1.0&s=07f948624704c960960b962a9c0416c3',
                rating: 832,
            },
            {
                id: 1,
                name: 'NIP',
                logo: 'https://img-cdn.hltv.org/teamlogo/-ttGATBV_P_HcZazxNNtIb.png?ixlib=java-2.1.0&w=50&s=ba94f7812d1f47183a83f3f34ab959eb',
                rating: 829,
            },
            {
                id: 1,
                name: 'Vitality',
                logo: 'https://img-cdn.hltv.org/teamlogo/GAlByJtDTnkgbb9p_71SUL.png?ixlib=java-2.1.0&w=50&s=2838cd78a5ebb5c9fea4c485908e9dbb',
                rating: 801,
            },
            {
                id: 1,
                name: 'Spirit',
                logo: 'https://img-cdn.hltv.org/teamlogo/RbtyvoP_5E-pU-MWu9zy2V.svg?ixlib=java-2.1.0&s=ac4c6b3e927d5cb8a6c3158c871fa846',
                rating: 782,
            },
            {
                id: 1,
                name: 'Complexity',
                logo: 'https://img-cdn.hltv.org/teamlogo/R0CzydpyX02BnkAYhy3I89.svg?ixlib=java-2.1.0&s=8c5833d6069ef924fdbb2e220fefea00',
                rating: 711,
            }
        ]

        useEffect(() => {
            document.title = 'DreamHack Masters Spring 2021'
        }, [])

        return (
            <div>
                <div className="container">
                    <OnPageNavigation/>
                    <div className="header-section">
                        <img className="tournament-logo" src={'https://img-cdn.hltv.org/eventlogo/OBYdYtX-x0vAyEMOgmtQ7P.png?ixlib=java-2.1.0&s=bc8ddffd243fbdc9f93b9114a28094d3' || placeholder} alt=""/>
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
    }
;

export default Tournament;