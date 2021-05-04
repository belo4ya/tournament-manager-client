import './index.css';

import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import App from './App';
import ModalDialog from "./store/modal-dialog";
import RootStore from "./store";

Modal.setAppElement('#root')

export const store = RootStore.create({})
export const StoreContext = createContext(store)

export const Context = createContext(null)
export const globalStorage = {
    signInModal: new ModalDialog(),
    signUpModal: new ModalDialog(),
}

ReactDOM.render(
    <Context.Provider value={globalStorage}>
        <StoreContext.Provider value={store}>
            <App/>
        </StoreContext.Provider>
    </Context.Provider>,
    document.getElementById('root')
);
