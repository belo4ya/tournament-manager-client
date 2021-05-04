import {flow, types} from "mobx-state-tree";
import apiCall from "../http/api";

const Bracket = types.model('Bracket', {
    id: types.identifierNumber,
})

const Team = types.model('Team', {
    id: types.identifierNumber,
    createdDate: types.string,
    lastModifiedDate: types.string,
    name: types.string,
    logo: types.string,
    rating: types.number,
})

const Tournament = types.model('Tournament', {
    id: types.identifierNumber,
    date: types.string,
    name: types.string,
    logo: types.maybeNull(types.string),
    bracketType: types.string,
    totalTeams: types.number,
    teams: types.array(Team),
    bracket: types.array(Bracket),
})

const Page = types.model('Page', {
    size: types.number,
    totalElements: types.number,
    totalPages: types.number,
    number: types.number,
})

const PageableTeamStore = types.model('PageableTeamStore', {
    teams: types.array(Team),
    page: types.optional(Page, {
        size: 0,
        totalElements: 0,
        totalPages: 0,
        number: 0
    }),
    isLoading: false,
})

const PageableTournamentStore = types.model('PageableTournamentStore', {
    tournaments: types.array(Tournament),
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
        })
    }
})

const PreviewTeamStore = types.model('PreviewTeamStore', {
    teams: types.array(Team),
    isLoading: false,
}).actions(self => {
    return {
        load: flow(function* () {
            self.teams = []
            self.isLoading = true
            try {
                self.teams = yield apiCall.fetchUserTeams()
            } finally {
                self.isLoading = false
            }
        }),
    }
})

const PreviewTournamentStore = types.model('PreviewTournamentStore', {
    tournaments: types.array(Tournament),
    isLoading: false,
}).actions(self => {
    return {
        load: flow(function* () {
            self.tournaments = []
            self.isLoading = true
            try {
                self.tournaments = yield apiCall.fetchUserTournaments()
            } finally {
                self.isLoading = false
            }
        }),
    }
})

const User = types.model('User', {
    id: types.maybe(types.number),
    createdDate: types.maybe(types.string),
    username: types.maybe(types.string),
    roles: types.array(types.string),
    previewTournamentStore: PreviewTournamentStore,
    previewTeamStore: PreviewTeamStore,
    pageableTournamentStore: PageableTournamentStore,
    pageableTeamStore: PageableTeamStore,
})

const UserStore = types.model('UserStore', {
    user: types.maybe(User),
    isAuth: types.maybe(types.boolean),
    isLoading: false,
    isChecking: false
}).actions(self => {
    return {
        load: flow(function* () {
            self.isLoading = true
            try {
                self.updateUserData(yield apiCall.fetchUserData())
            } finally {
                self.isLoading = false
            }
        }),
        signIn: flow(function* (login, password) {
            self.isLoading = true
            try {
                const {user, isAuth} = yield apiCall.signIn(login, password)
                self.updateUserData(user)
                self.isAuth = isAuth
            } finally {
                self.isLoading = false
            }
        }),
        signUp: flow(function* (login, password) {
            self.isLoading = true
            try {
                const {user, isAuth} = yield apiCall.signUp(login, password)
                self.updateUserData(user)
                self.isAuth = isAuth
            } finally {
                self.isLoading = false
            }
        }),
        checkSession: flow(function* () {
            self.isChecking = true
            try {
                self.isAuth = yield apiCall.checkSession()
            } finally {
                self.isChecking = false
            }
        }),
        signOut() {
            self.isAuth = false
            self.updateUserData({})
            localStorage.setItem('token', '')
        },
        updateUserData(userData) {
            self.user.id = userData.id
            self.user.createdDate = userData.createdDate
            self.user.username = userData.username
            self.user.roles = userData.roles
        },
        afterCreate() {
            self.checkSession()
            self.user = {
                previewTournamentStore: PreviewTournamentStore.create({}),
                previewTeamStore: PreviewTeamStore.create({}),
                pageableTournamentStore: PageableTournamentStore.create({}),
                pageableTeamStore: PageableTeamStore.create({})
            }
        },
    }
})

export default UserStore;