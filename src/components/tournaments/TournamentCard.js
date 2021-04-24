import "./tournaments.scss";

import React from 'react';

const TournamentCard = (props) => {
    return (
        <div className="tournament-card">
            <div className="title-container">
                <img src={props.logo} alt="" />
                <div>
                    <h5>{props.name}</h5>
                    <span className="subtitle">{props.bracketType}</span>
                </div>
            </div>
            <div className="teams">
                <h5>{props.totalTeams}</h5>
                <span className="subtitle">Teams</span>
            </div>
            <div className="date">{props.date}</div>
        </div>
    );
};

export default TournamentCard;