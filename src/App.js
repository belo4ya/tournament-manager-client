import "./App.css"

import React, {useContext, useEffect} from 'react';
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


const checkSession = async () => {
    return (await $authHost.get(AUTH_ENDPOINT)).data;
}


const App = observer(() => {
    const {userStore} = useContext(Context)

    useEffect(() => {
        checkSession()
            .then(() => {
                userStore.isAuth = true
            })
            .catch((e) => {
                if (e.response && e.response.status === 401) {
                    userStore.isAuth = false
                } else {
                    console.log(e)
                }
            })
    })

    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <SignInModalForm/>
                <SignUpModalForm/>
                <AppRouter/>
                <Footer/>
            </div>
        </BrowserRouter>
    );
});

export default App;