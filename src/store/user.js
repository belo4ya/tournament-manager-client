import {flow, getParent, types} from "mobx-state-tree";
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

const Search = types.model('Search', {
    value: '',
    isApplied: false,
}).actions(self => {
    return {
        setValue(value) {
            self.isApplied = false
            self.value = value
        },
        apply() {
            self.isApplied = true
        }
    }
})

const Checkbox = types.model('Checkbox', {
    id: types.number,
    value: types.string,
    name: types.string,
    checked: false
}).actions(self => {
    return {
        handleClick() {
            getParent(self, 2).cancel()
            self.checked = !self.checked
        }
    }
})

const Range = types.model('Range', {
    min: 0,
    max: 128
}).actions(self => {
    return {
        setValue({min, max}) {
            getParent(self, 1).cancel()
            self.min = min
            self.max = max
        }
    }
})

const Filter = types.model('Filter', {
    checkboxList: types.array(Checkbox),
    range: types.maybe(Range),
    isApplied: false,
    isLoading: false,
}).actions(self => {
    return {
        load: flow(function* () {
            self.checkboxList = []
            self.range = {min: 0, max: 128}
            self.isLoading = true
            try {
                self.checkboxList = yield apiCall.fetchTournamentTypes()
                yield getParent(self, 1).load()
            } finally {
                self.isLoading = false
            }
        }),
        apply() {
            self.isApplied = true
        },
        cancel() {
            self.isApplied = false
        },
        afterCreate() {
            self.load()
        }
    }
})

const PageableTeamStore = types.model('PageableTeamStore', {
    teams: types.array(Team),
    page: types.maybe(Page),
    search: types.maybe(Search),
    isLoading: false,
}).actions(self => {
    return {
        load: flow(function* (targetPage = 0) {
            self.teams = []
            self.isLoading = true
            try {
                const filters = {teamName: self.search.isApplied ? self.search.value : ''}
                const {teams, page} = yield apiCall.fetchUserFilteredTeams(targetPage, 5, filters)
                self.teams = teams
                self.page = page
            } finally {
                self.isLoading = false
            }
        }),
        onNextPage: flow(function* () {
            const targetPage = self.page.number + 1
            if (targetPage < self.page.totalPages && !self.isLoading) {
                yield self.load(targetPage)
            }
        }),
        onPrevPage: flow(function* () {
            const targetPage = self.page.number - 1
            if (targetPage >= 0 && !self.isLoading) {
                yield self.load(targetPage)
            }
        }),
        afterCreate() {
            self.page = {
                size: 0,
                totalElements: 0,
                totalPages: 0,
                number: 0
            }
            self.search = Search.create({})
        }
    }
})

const PageableTournamentStore = types.model('PageableTournamentStore', {
    tournaments: types.array(Tournament),
    page: types.maybe(Page),
    search: types.maybe(Search),
    filter: types.optional(Filter, {
        checkboxList: [],
        range: {min: 0, max: 128},
        isApplied: false,
        isLoading: false,
    }),
    isLoading: false,
}).actions(self => {
    return {
        load: flow(function* (targetPage = 0) {
            self.tournaments = []
            self.isLoading = true
            try {
                const filters = {
                    name: self.search.isApplied ? self.search.value : '',
                }
                if (self.filter.isApplied) {
                    filters.types = self.filter.checkboxList.filter((el) => el.checked).map((el) => el.value)
                    filters.range = {start: self.filter.range.min, end: self.filter.range.max}
                }
                const {tournaments, page} = yield apiCall.fetchUserFilteredTournaments(targetPage, 5, filters)
                self.tournaments = tournaments
                self.page = page
            } finally {
                self.isLoading = false
            }
        }),
        onNextPage: flow(function* () {
            const targetPage = self.page.number + 1
            if (targetPage < self.page.totalPages && !self.isLoading) {
                yield self.load(targetPage)
            }
        }),
        onPrevPage: flow(function* () {
            const targetPage = self.page.number - 1
            if (targetPage >= 0 && !self.isLoading) {
                yield self.load(targetPage)
            }
        }),
        afterCreate() {
            self.page = {
                size: 0,
                totalElements: 0,
                totalPages: 0,
                number: 0
            }
            self.search = Search.create({})
        }
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