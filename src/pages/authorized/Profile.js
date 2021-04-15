import React, {useContext} from 'react';
import {Card, Container, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useHistory} from "react-router-dom";
import {TEAM_ROUTE, TOURNAMENT_ROUTE} from "../../utils/routes";

const Profile = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    return (
        <Container className="d-lg-flex justify-content-center align-items-center">
            <div className="d-block">
                <Row className="d-flex">
                    <h1>Hello, {user.user.sub}!</h1>
                </Row>
                <Row className="d-flex">
                    <Card
                        onClick={() => history.push(TOURNAMENT_ROUTE)}
                        className="p-5"
                        style={{cursor: 'pointer'}}
                    >
                        My tournaments
                    </Card>
                </Row>
                <Row className="d-flex">
                    <Card
                        onClick={() => history.push(TEAM_ROUTE)}
                        className="p-5"
                        style={{cursor: 'pointer'}}
                    >
                        My teams
                    </Card>
                </Row>
            </div>
        </Container>
    );
});

export default Profile;