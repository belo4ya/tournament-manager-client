import "./tournaments.scss";

import React from 'react';

const TournamentCard = (props) => {
    return (
        <div className="tournament-card">
            <div className="title-container">
                <img src="" alt="" />
                <div className="title">
                    <h4>{props.name}</h4>
                    <span className="subtitle">{props.bracketType}</span>
                </div>
            </div>
            <div className="teams">
                <h4>{props.totalTeams}</h4>
                <span className="subtitle">Teams</span>
            </div>
            <div className="date">{props.date}</div>
        </div>
    );
};

export default TournamentCard;