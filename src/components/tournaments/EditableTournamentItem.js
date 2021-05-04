import "./tournaments.scss"

import React from 'react';
import TournamentCard from "./TournamentCard";
import pencil from "../../assets/icn_pencil.svg";
import cross from "../../assets/icn_cross.svg";


const EditableTournamentItem = (props) => {
    return (
        <div onClick={props.onEdit} className="tournament">
            <TournamentCard
                id={props.id}
                name={props.name}
                logo={props.logo}
                bracketType={props.bracketType}
                totalTeams={props.totalTeams}
                date={props.date}
            />
            <div className="actions">
                <img
                    onClick={props.onEdit}
                    src={pencil}
                    alt="Изменить"
                />
                <img
                    onClick={props.onDelete}
                    src={cross}
                    alt="Удалить"
                />
            </div>
        </div>
    );
};

export default EditableTournamentItem;