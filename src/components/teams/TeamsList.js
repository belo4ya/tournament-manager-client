import "./teams.scss"

import React from 'react';
import TeamCard from "../TeamCard";

const TeamsList = (props) => {
    return (
        <div className="teams-list">
            {props.teams.map((t) =>
                <TeamCard
                    key={t.id}
                    id={t.id}
                    title={t.title}
                />
            )}
        </div>
    );
};

export default TeamsList;