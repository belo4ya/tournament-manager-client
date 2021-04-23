import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._username = 'user'
        this._roles = ['ROLE_USER']
        this._isAuth = true
        makeAutoObservable(this)
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get roles() {
        return this._roles;
    }

    set roles(value) {
        this._roles = value;
    }

    get isAuth() {
        return this._isAuth;
    }

    set isAuth(value) {
        this._isAuth = value;
    }
}