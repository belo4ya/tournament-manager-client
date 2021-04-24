import './tournaments.scss'

import React from 'react';
import TournamentItem from "./TournamentItem";

const TournamentsStaticTable = (props) => {
    return (
        <div>
            {props.tournaments.map(t =>
                <TournamentItem
                    key={t.id}
                    logo={t.logo}
                    name={t.name}
                    bracketType={t.bracketType}
                    totalTeams={t.totalTeams}
                    date={t.createdDate}
                />
            )}
        </div>
    );
};

export default TournamentsStaticTable;