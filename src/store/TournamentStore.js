import {makeAutoObservable} from "mobx";

export default class TournamentStore {
    constructor() {
        this._tournaments = []
        makeAutoObservable(this)
    }

    get tournaments() {
        return this._tournaments
    }

    set tournaments(value) {
        this._tournaments = value
    }
}