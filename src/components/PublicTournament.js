import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";

const PublicTournament = observer(() => {
    const {tournament} = useContext(Context);
    return (
        <Row className="d-flex">
            {tournament.tournaments.map((tournament) => {
                return (tournament.name);
            })}
        </Row>
    );
});

export default PublicTournament;