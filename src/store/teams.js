import {types} from "mobx-state-tree";

const Team = types.model('Team', {
    id: types.identifier,
    createdDate: types.string,
    lastModifiedDate: types.string,
    name: types.string,
    logo: types.string,
    rating: types.number,
})

const TeamStore = types.model('TeamStore', {
    teams: types.array(Team)
})

export default TeamStore;