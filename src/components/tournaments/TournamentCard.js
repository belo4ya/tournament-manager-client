import "./tournaments.scss";

import React from 'react';

const TournamentCard = (props) => {
    return (
        <div className="tournament-card">
            <div className="title-container">
                <img src="" alt="" />
                <div className="title">
                    <h4>{props.title}</h4>
                    <span className="subtitle">{props.subtitle}</span>
                </div>
            </div>
            <div className="teams">
                <h4>{props.teams}</h4>
                <span className="subtitle">Teams</span>
            </div>
            <div className="date">{props.date}</div>
        </div>
    );
};

export default TournamentCard;