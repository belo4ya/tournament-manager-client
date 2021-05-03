import {flow, types} from "mobx-state-tree";
import apiCall from "../http/api";

const User = types.model('User', {
    id: types.identifierNumber,
    createdDate: types.string,
    username: types.string,
    roles: types.array(types.string),
})

const UserStore = types.model('UserStore', {
    user: types.maybe(User),
    isAuth: types.maybe(types.boolean),
}).actions(self => {
    return {
        signIn: flow(function* () {
            self.user = yield apiCall.signIn()
            self.isAuth = true
        }),
        signUp: flow(function* () {
            self.user = yield apiCall.signUp()
            self.isAuth = true
        }),
        checkSession: flow(function* () {
            self.isAuth = yield apiCall.checkSession()
        })
    }
})

export default UserStore;