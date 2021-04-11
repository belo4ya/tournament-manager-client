import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import TournamentStore from "./store/TournamentStore";

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        tournament: new TournamentStore(),
    }}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
);
