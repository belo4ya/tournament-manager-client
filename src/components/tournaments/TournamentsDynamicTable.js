import './tournaments.scss'

import React from 'react';
import TournamentCard from "./TournamentCard";
import pencil from "../../assets/icn_pencil.svg";
import cross from "../../assets/icn_cross.svg";
import PageSelector from "../PageSelector/PageSelector";
import Button from "../Button";

const TournamentsDynamicTable = (props) => {
    return (
        <div className="tournaments-table">
            <div className="head">
                <div className="kludge"/>
                <div className="head-item">
                    Название
                    <div className="filter-arrow">▼</div>
                </div>
                <div className="head-item">
                    Команды
                    <div className="filter-arrow">▼</div>
                </div>
                <div className="head-item filter up">
                    Дата изменения
                    <div className="filter-arrow">▼</div>
                </div>
                <div className="kludge"/>
                <div className="head-item bold">Действие</div>
            </div>
            <div className="content">
                {props.tournaments.map((t) => {
                    return (
                        <div key={t.id} className="tournament">
                            <TournamentCard
                                id={t.id}
                                name={t.name}
                                logo={t.logo}
                                bracketType={t.bracketType}
                                totalTeams={t.totalTeams}
                                date={t.date}
                            />
                            <div className="actions">
                                <img src={pencil} alt="Изменить"/>
                                <img src={cross} alt="Удалить"/>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="actions">
                <PageSelector
                    page={props.page + 1}
                    onPrevPage={props.prevPage}
                    onNextPage={props.nextPage}
                />
                <Button class="red">Создать турнир</Button>
            </div>
        </div>
    );
};

export default TournamentsDynamicTable;