import {makeAutoObservable} from "mobx";

export default class TournamentStore {
    constructor() {
        this._tournaments = [
            {id: 1, name: 'tournament 1'},
            {id: 2, name: 'tournament 2'},
        ]
        makeAutoObservable(this);
    }

    get tournaments() {
        return this._tournaments;
    }

    set tournaments(value) {
        this._tournaments = value;
    }
}