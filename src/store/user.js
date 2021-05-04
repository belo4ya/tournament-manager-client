import {flow, types} from "mobx-state-tree";
import apiCall from "../http/api";

const User = types.model('User', {
    id: types.maybe(types.number),
    createdDate: types.maybe(types.string),
    username: types.string,
    roles: types.array(types.string),
})

const UserStore = types.model('UserStore', {
    user: types.maybeNull(User),
    isAuth: types.maybe(types.boolean),
    isLoading: false,
    isChecking: false
}).actions(self => {
    return {
        load: flow(function* () {
            self.isLoading = true
            try {
                self.user = yield apiCall.fetchUserData()
            } finally {
                self.isLoading = false
            }
        }),
        signIn: flow(function* (login, password) {
            self.isLoading = true
            try {
                const {user, isAuth} = yield apiCall.signIn(login, password)
                self.user = user
                self.isAuth = isAuth
            } finally {
                self.isLoading = false
            }
        }),
        signUp: flow(function* (login, password) {
            self.isLoading = true
            try {
                const {user, isAuth} = yield apiCall.signUp(login, password)
                self.user = user
                self.isAuth = isAuth
            } finally {
                self.isLoading = false
            }
        }),
        checkSession: flow(function* () {
            self.isChecking = true
            try {
                self.isAuth = yield apiCall.checkSession()
            } finally {
                self.isChecking = false
            }
        }),
        signOut() {
            self.isAuth = false
            self.user = null
            localStorage.setItem('token', '')
        },
        afterCreate() {
            self.checkSession()
        },
    }
})

export default UserStore;