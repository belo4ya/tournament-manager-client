import {types} from "mobx-state-tree";
import UserStore from "./user";
import TournamentStore from "./tournaments";

const RootStore = types.model('RootStore', {
    userStore: types.optional(UserStore, {}),
    tournamentStore: types.optional(TournamentStore, {}),
})

export default RootStore;