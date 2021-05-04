import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer"
import {observer} from "mobx-react-lite";
import Alert from "./components/Alert/Alert";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import useStore from "./hooks/useStore";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";

const App = () => {
    const {userStore} = useStore()

    if (userStore.isChecking) {
        return <h1>LOADING</h1>
    }

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className="App">
                <Header/>
                <ScrollToTop/>
                <AppRouter/>
                <Footer/>
                <SignIn/>
                <SignUp/>
                <Alert/>
            </div>
        </BrowserRouter>
    );
};

export default observer(App);