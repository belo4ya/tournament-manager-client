import "./App.css"

import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import Footer from "./components/Footer"


const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <AppRouter/>
                <Footer/>
            </div>
        </BrowserRouter>
    );
};

export default App;