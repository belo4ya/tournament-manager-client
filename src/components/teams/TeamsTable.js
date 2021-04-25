import "./teams.scss"

import React from 'react';
import TeamCard from "./TeamCard";
import PageSelector from "../PageSelector/PageSelector";
import Button from "../Button";


const TeamsTable = (props) => {
    return (
        <div className="teams-table">
            <div className="content">
                {props.teams.map((t) =>
                    <TeamCard
                        key={t.id}
                        name={t.name}
                        logo={t.logo}
                        rating={t.rating}
                    />
                )}
            </div>
            <div className="actions">
                <PageSelector
                    page={props.currentPage + 1}
                    onPrevPage={props.prevPage}
                    onNextPage={props.nextPage}
                />
                <Button class="red">Создать команду</Button>
            </div>
        </div>
    );
};

export default TeamsTable;