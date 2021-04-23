import React from 'react';
import TournamentCard from "./TournamentCard";

const TournamentItem = (props) => {
    return (
        <div className="tournament-item">
            <TournamentCard
                key={props.id}
                image={props.image}
                title={props.title}
                subtitle={props.subtitle}
                teams={props.teams}
                date={props.date}
            />
        </div>
    );
};

export default TournamentItem;