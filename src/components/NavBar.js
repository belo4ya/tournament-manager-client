import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Nav, Navbar, NavLink} from "react-bootstrap";
import {SIGNIN_ROUTE, MAIN_ROUTE} from "../utils/routes";
import {observer} from "mobx-react-lite";
import {useHistory} from "react-router-dom";

const NavBar = observer(() => {
        const {user} = useContext(Context);
        const history = useHistory()

        const logOut = () => {
            user.setUser({})
            user.setIsAuth(false)
            localStorage.setItem('token', '')
            history.push(MAIN_ROUTE)
        }

        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavLink to={MAIN_ROUTE}>Список турниров</NavLink>
                    {
                        user.isAuth ?
                            <Nav className="ml-auto">
                                <Button
                                    onClick={() => logOut()}
                                >
                                    Выйти
                                </Button>
                            </Nav>
                            :
                            <Nav className="ml-auto">
                                <Button
                                    onClick={() => {
                                        history.push(SIGNIN_ROUTE)
                                    }}
                                >
                                    Авторизация
                                </Button>
                            </Nav>
                    }
                </Container>
            </Navbar>
        );
    }
);

export default NavBar;