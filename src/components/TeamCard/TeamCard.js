import "./team-card.scss"

import React from 'react';

const TeamCard = (props) => {
    return (
        <div className="team-card">
            <h6>{props.name}</h6>
            <img src={props.logo} alt=""/>
            <p>#{props.rating}</p>
        </div>
    );
};

export default TeamCard;