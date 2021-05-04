import {types} from "mobx-state-tree";
import React from "react";

const SignIn = types.model('SignIn', {
    isOpen: false,
}).actions(self => {
    return {
        open() {
            self.isOpen = true
        },
        close() {
            self.isOpen = false
        }
    }
})

const ModalPagesStore = types.model('ModalPagesStore', {
    signIn: SignIn,
})

const Alert = types.model('Alert', {
    isOpen: false,
    body: types.maybeNull(React.Component)
}).actions(self => {
    return {
        open(body) {
            self.body = body
            self.isOpen = true
        },
        close() {
            self.isOpen = false
            self.body = null
        }
    }
})

const ModalStore = types.model('ModalStore', {
    alert: Alert,
    modalPages: ModalPagesStore,
})

export default ModalStore;