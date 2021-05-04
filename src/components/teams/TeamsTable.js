import "./teams.scss"

import React from 'react';
import TeamCard from "./TeamCard";
import PageSelector from "../PageSelector/PageSelector";
import Button from "../Button";
import {observer} from "mobx-react-lite";
import useStore from "../../hooks/useStore";


const TeamsTable = (props) => {
    const {modalStore} = useStore()
    const teamCreation = modalStore.modalPages.teamCreation

    const handleCreateTeamButton = () => {
        teamCreation.open()
    }

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
                <Button class="red" onClick={handleCreateTeamButton}>Создать команду</Button>
            </div>
        </div>
    );
};

export default observer(TeamsTable);