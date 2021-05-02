import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer"
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {$authHost} from "./http";
import {AUTH_ENDPOINT} from "./utils/endpoints";
import SignInModalForm from "./components/modals/SignInModalForm";
import SignUpModalForm from "./components/modals/SignUpModalForm";
import {alertError} from "./utils/utils";
import Alert from "./components/Alert/Alert";

const checkSession = async () => {
    return await $authHost.get(AUTH_ENDPOINT).then((response) => response.data);
}

const App = observer(() => {
    const {userStore} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkSession()
            .then(() => {
                userStore.isAuth = true
            })
            .catch((e) => {
                if (e.response && e.response.status === 401) {
                    userStore.isAuth = false
                } else {
                    alertError(e)
                }
            })
            .finally(() => setLoading(false))
    }, [userStore])

    if (loading) {
        return <h1>LOADING</h1>
    }

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className="App">
                <Header/>
                <SignInModalForm/>
                <SignUpModalForm/>
                <AppRouter/>
                <Footer/>
                <Alert/>
            </div>
        </BrowserRouter>
    );
});

export default App;