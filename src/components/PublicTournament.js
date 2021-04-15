import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const PublicTournament = observer(() => {
    const {tournament} = useContext(Context);
    return (
        <Row className="d-flex">
            {tournament.tournaments.map(t =>
                <Card
                    style={{cursor: 'pointer'}}
                    key={t.id}
                    className="p-3"
                >
                    {t.name}
                </Card>
            )}
        </Row>
    );
});

export default PublicTournament;