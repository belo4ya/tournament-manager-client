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
import RootStore from "./store";

Modal.setAppElement('#root')

const store = RootStore.create({})
export const StoreContext = createContext(store)

export const Context = createContext(null)
export const globalStorage = {
    userStore: new UserStore(),
    alertStore: new AlertStore(),
    signInModal: new ModalDialog(),
    signUpModal: new ModalDialog(),
    teamStore: new TeamStore(),
    tournamentStore: new TournamentStore()
}

ReactDOM.render(
    <Context.Provider value={globalStorage}>
        <StoreContext.Provider value={store}>
            <App/>
        </StoreContext.Provider>
    </Context.Provider>,
    document.getElementById('root')
);
