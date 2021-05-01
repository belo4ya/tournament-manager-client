import "./tournaments.scss";
import placeholder from '../../assets/logo_placeholder.svg'

import React from 'react';

const TournamentCard = (props) => {
    return (
        <div className="tournament-card">
            <div className="title-container">
                <img
                    src={props.logo || placeholder}
                    alt=""
                    onError={(e) => {
                        e.target.onerror = null
                        e.target.src = placeholder
                    }}
                />
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