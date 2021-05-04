import {types} from "mobx-state-tree";

const SimpleCredit = types.model('SimpleCredit', {
    value: '',
}).views(self => {
    return {
        isValid() {
            return self.value.length > 3
        }
    }
}).actions(self => {
    return {
        setValue(value) {
            if (value.length < 64) {
                self.value = value
            }
        }
    }
})

const SignUp = types.model('SignUp', {
    isOpen: false,
    login: types.optional(SimpleCredit, {}),
    password: types.optional(SimpleCredit, {}),
    rePassword: types.optional(SimpleCredit, {}),
}).views(self => {
    return {
        isValid() {
            return self.login.isValid() && self.password.isValid() && self.rePassword.value === self.password.value
        }
    }
}).actions(self => {
    return {
        open() {
            self.isOpen = true
        },
        close() {
            self.isOpen = false
            self.login.setValue('')
            self.password.setValue('')
            self.rePassword.setValue('')
        }
    }
})

const SignIn = types.model('SignIn', {
    isOpen: false,
    login: types.optional(SimpleCredit, {}),
    password: types.optional(SimpleCredit, {}),
}).views(self => {
    return {
        isValid() {
            return self.login.isValid() && self.password.isValid()
        }
    }
}).actions(self => {
    return {
        open() {
            self.isOpen = true
        },
        close() {
            self.isOpen = false
            self.login.setValue('')
            self.password.setValue('')
        }
    }
})

const ModalPagesStore = types.model('ModalPagesStore', {
    signIn: types.optional(SignIn, {}),
    signUp: types.optional(SignUp, {})
})

const Alert = types.model('Alert', {
    isOpen: false,
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
    alert: types.optional(Alert, {}),
    modalPages: types.optional(ModalPagesStore, {}),
})

export default ModalStore;