import {makeAutoObservable} from "mobx";

export default class TournamentStore {
    constructor() {
        this._tournaments = [
            {id: 1, name: 'BLAST', logo: 'blast.png', user: {}, teams: [], brackets: []},
            {id: 2, name: 'ESL', logo: 'esl.png', user: {}, teams: [], brackets: []}
        ]
        makeAutoObservable(this)
    }
    
    get tournaments() {
        return this._tournaments;
    }

    set tournaments(value) {
        this._tournaments = value;
    }
}