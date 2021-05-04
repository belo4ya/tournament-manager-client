import React from 'react';
import TournamentCard from "./TournamentCard";

const TournamentItem = (props) => {
    return (
        <div className="tournament-item">
            <TournamentCard
                id={props.id}
                logo={props.logo}
                name={props.name}
                bracketType={props.bracketType}
                totalTeams={props.totalTeams}
                date={props.date}
                onClick={props.onClick}
            />
        </div>
    );
};

export default TournamentItem;