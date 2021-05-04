import './index.css';

import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import App from './App';
import RootStore from "./store";

Modal.setAppElement('#root')

export const store = RootStore.create({})
export const StoreContext = createContext(store)

ReactDOM.render(
    <StoreContext.Provider value={store}>
        <App/>
    </StoreContext.Provider>,
    document.getElementById('root')
);
