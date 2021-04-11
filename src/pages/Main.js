import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import PublicTournament from "../components/PublicTournament";

const Main = () => {
    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <PublicTournament />
                </Col>
            </Row>
        </Container>
    );
};

export default Main;