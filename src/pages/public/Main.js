import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import PublicTournament from "../../components/PublicTournament";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {getAllTournaments} from "../../http/tournamentApi";

const Main = observer(() => {
    const {tournament} = useContext(Context)

    useEffect(() => {
        getAllTournaments().then(data => tournament.tournaments = data._embedded.tournaments)
    })

    return (
        <Container>
            <Row className="mt-2">
                <PublicTournament/>
            </Row>
        </Container>
    );
});

export default Main;