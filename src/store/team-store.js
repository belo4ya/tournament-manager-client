import {makeAutoObservable} from "mobx";

export default class TeamStore {
    constructor() {
        this._teams = [
            {id: 1, name: 'Astralis', logo: 'astralis.png', rating: 740, user: {}, tournaments: []},
            {id: 2, name: 'Liquid', logo: 'liquid.png', rating: 650, user: {}, tournaments: []}
        ]
        makeAutoObservable(this)
    }

    get teams() {
        return this._teams;
    }

    set teams(value) {
        this._teams = value;
    }
}