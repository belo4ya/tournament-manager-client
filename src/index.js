import './index.css';

import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import App from './App';
import UserStore from "./store/user-store";
import TournamentStore from "./store/tournament-store";
import TeamStore from "./store/team-store";
import ModalDialog from "./store/modal-dialog";
import AlertStore from "./store/alert-store";
import Alert from "./components/Alert/Alert";

Modal.setAppElement('#root')

export const Context = createContext(null)
export const alertStore = new AlertStore()

ReactDOM.render(
    <Context.Provider value={{
        userStore: new UserStore(),
        alertStore: alertStore,
        signInModal: new ModalDialog(),
        signUpModal: new ModalDialog(),
        teamStore: new TeamStore(),
        tournamentStore: new TournamentStore()
    }}>
        <Alert/>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);
