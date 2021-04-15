import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import TournamentStore from "./store/TournamentStore";
import TeamStore from "./store/TeamStore";

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        tournament: new TournamentStore(),
        team: new TeamStore(),
    }}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);
