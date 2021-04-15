import React, {useContext, useEffect, useState} from 'react';
import ProfileTournament from "../../components/ProfileTournament";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {getAllTournaments, getTournamentsByUsername} from "../../http/tournamentApi";
import PublicTournament from "../../components/PublicTournament";
import {Container, Row} from "react-bootstrap";

const Tournaments = observer(() => {
    const {user} = useContext(Context);
    const {tournament} = useContext(Context);

    useEffect(() => {
        getTournamentsByUsername(user.user.sub).then(data => tournament.tournaments = data._embedded.tournaments)
    })

    return (
        <Container>
            <Row className="d-mt-2">
                <PublicTournament/>
            </Row>
        </Container>
    );
});

export default Tournaments;