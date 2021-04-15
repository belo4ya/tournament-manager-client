import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {SIGNIN_ROUTE, MAIN_ROUTE, REGISTER_ROUTE, PROFILE_ROUTE} from "../../utils/routes";
import {login, registration} from "../../http/authApi";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation();
    const history = useHistory()
    const isLogin = location.pathname === SIGNIN_ROUTE;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            let newUser;
            if (isLogin) {
                newUser = await login(username, password);
            } else {
                newUser = await registration(username, password);
            }
            user.setUser(newUser)
            user.setIsAuth(true)
            history.push(PROFILE_ROUTE)
        } catch (e) {
            if (e.response.data.status === 401) {
                alert(isLogin ? `Неверный Логин или Пароль` : `Логин ${username} занят`)
            }
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш логин..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTER_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={SIGNIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button variant="outline-success" onClick={click}>
                            {isLogin ? 'Войти': 'Зарегистрироваться'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;