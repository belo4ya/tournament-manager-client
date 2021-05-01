import "./teams.scss"
import placeholder from "../../assets/logo_placeholder.svg"

import React from 'react';

const TeamCard = (props) => {
    return (
        <div className="team-card">
            <h6>{props.name}</h6>
            <img
                src={props.logo || placeholder}
                alt=""
                onError={(e) => {
                    e.target.onerror = null
                    e.target.src = placeholder
                }}
            />
            <p>#{props.rating}</p>
        </div>
    );
};

export default TeamCard;