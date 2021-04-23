import './index.css';

import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import App from './App';
import UserStore from "./store/user-store";
import TournamentStore from "./store/tournament-store";
import TeamStore from "./store/team-store";
import ModalDialog from "./store/modal-dialog";

Modal.setAppElement('#root')
export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value={{
        userStore: new UserStore(),
        tournamentStore: new TournamentStore(),
        teamStore: new TeamStore(),
        signInModal: new ModalDialog(),
        signUpModal: new ModalDialog()
    }}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);
