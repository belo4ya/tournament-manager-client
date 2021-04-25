import "./teams.scss"

import React from 'react';
import TeamCard from "../TeamCard/TeamCard";

const TeamsList = (props) => {
    return (
        <div className="teams-list">
            {props.teams.map((t) =>
                <TeamCard
                    key={t.id}
                    name={t.name}
                    logo={t.logo}
                    rating={t.rating}
                />
            )}
        </div>
    );
};

export default TeamsList;