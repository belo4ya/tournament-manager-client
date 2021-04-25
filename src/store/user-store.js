import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._id = null
        this._createdDate = null
        this._username = null
        this._roles = null
        this._isAuth = null
        makeAutoObservable(this)
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get createdDate() {
        return this._createdDate;
    }

    set createdDate(value) {
        this._createdDate = value;
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