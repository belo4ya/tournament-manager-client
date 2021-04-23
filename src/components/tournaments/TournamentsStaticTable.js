import './tournaments.scss'

import React from 'react';
import TournamentItem from "./TournamentItem";

const TournamentsStaticTable = (props) => {
    return (
        <div>
            {props.tournaments.map(t =>
                    <TournamentItem
                        key={t.id}
                        image={t.image}
                        title={t.title}
                        subtitle={t.subtitle}
                        teams={t.teams}
                        date={t.date}
                    />
            )}
        </div>
    );
};

export default TournamentsStaticTable;