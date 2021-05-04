import {flow, types} from "mobx-state-tree";
import apiCall from "../http/api";

const Tournament = types.model('Tournament', {
    id: types.identifierNumber,
    date: types.string,
    name: types.string,
    logo: types.maybeNull(types.string),
    bracketType: types.string,
    totalTeams: types.number,
})

const Page = types.model('Page', {
    size: types.number,
    totalElements: types.number,
    totalPages: types.number,
    number: types.number
})

const TournamentStore = types.model('TournamentStore', {
    tournaments: types.optional(types.array(Tournament), []),
    page: types.optional(Page, {
        size: 0,
        totalElements: 0,
        totalPages: 0,
        number: 0
    }),
    isLoading: false,
}).actions(self => {
    return {
        load: flow(function* () {
            self.isLoading = true
            try {
                const {tournaments, page} = yield apiCall.fetchPublicTournaments()
                self.tournaments = tournaments
                self.page = page
            } finally {
                self.isLoading = false
            }
        }),
        onNextPage: flow(function* () {
            const targetPage = self.page.number + 1
            if (targetPage < self.page.totalPages && !self.isLoading) {
                self.isLoading = true
                try {
                    const {tournaments, page} = yield apiCall.fetchPublicTournaments(targetPage)
                    self.tournaments = tournaments
                    self.page = page
                } finally {
                    self.isLoading = false
                }
            }
        }),
        onPrevPage: flow(function* () {
            const targetPage = self.page.number - 1
            if (targetPage >= 0 && !self.isLoading) {
                self.isLoading = true
                try {
                    const {tournaments, page} = yield apiCall.fetchPublicTournaments(targetPage)
                    self.tournaments = tournaments
                    self.page = page
                } finally {
                    self.isLoading = false
                }
            }
        }),
        afterCreate() {
            self.load()
        },
    }
})

export default TournamentStore;