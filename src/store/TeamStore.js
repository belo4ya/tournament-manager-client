import {makeAutoObservable} from "mobx";

export default class TeamStore {
    constructor() {
        this._teams = []
        makeAutoObservable(this)
    }

    get teams() {
        return this._teams;
    }

    set teams(value) {
        this._teams = value;
    }
}