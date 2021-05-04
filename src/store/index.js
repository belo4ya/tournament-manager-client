import {types} from "mobx-state-tree";
import UserStore from "./user";
import TournamentStore from "./tournaments";
import ModalStore from "./modals";

const RootStore = types.model('RootStore', {
    modalStore: types.optional(ModalStore, {}),
    userStore: types.optional(UserStore, {}),
    tournamentStore: types.optional(TournamentStore, {}),
})

export default RootStore;