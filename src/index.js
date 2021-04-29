import './index.css';

import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import App from './App';
import UserStore from "./store/user-store";
import TournamentStore from "./store/tournament-store";
import TeamStore from "./store/team-store";
import ModalDialog from "./store/modal-dialog";
// import {createBrowserHistory} from "history";

// export const history = createBrowserHistory({
//     basename: process.env.PUBLIC_URL
// })
export const Context = createContext(null);

Modal.setAppElement('#root')
ReactDOM.render(
    <Context.Provider value={{
        userStore: new UserStore(),
        signInModal: new ModalDialog(),
        signUpModal: new ModalDialog(),
        teamStore: new TeamStore(),
        tournamentStore: new TournamentStore()
    }}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);
