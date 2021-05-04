import './tournaments.scss'

import React from 'react';
import TournamentItem from "./TournamentItem";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";

const TournamentsStaticTable = (props) => {
    const history = useHistory()

    return (
        <div>
            {props.tournaments.map(t =>
                <TournamentItem
                    key={t.id}
                    logo={t.logo}
                    name={t.name}
                    bracketType={t.bracketType}
                    totalTeams={t.totalTeams}
                    date={t.date}
                    onClick={() => t.onClick?.(history)}
                />
            )}
        </div>
    );
};

export default observer(TournamentsStaticTable);