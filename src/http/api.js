import {$authHost, $host} from "./index";
import {alertError, alertMessage} from "../utils/utils";
import {store} from "../index";
import jwtDecode from "jwt-decode";

class ApiCall {
    constructor() {
        this.authHost = $authHost
        this.host = $host
    }

    async _makeRequest(request) {
        return request()
            .then((response) => {
                console.log(response.data)
                return response.data
            })
            .catch((e) => {
                if (e?.response?.status === 401) {
                    alertMessage('Предупреждение', 'Время сессии истекло. Пожалуйста, авторизуйтесь снова.')
                    store.userStore.signOut()
                } else {
                    alertError(e)
                }
            })
    }

    async signIn(login, password) {
        return this.host.post('/auth/signIn', {
            username: login,
            password: password,
        }).then((response) => {
            const userData = jwtDecode(response.data.token)
            localStorage.setItem('token', response.data.token)
            return {user: {username: userData.sub, roles: userData.roles}, isAuth: true}
        }).catch((e) => {
            if (e?.response?.status === 401) {
                alertMessage('Ошибка', 'Неверный логин или пароль')
            } else {
                alertError(e)
            }
            return {user: null, isAuth: false}
        })
    }

    async signUp(login, password) {
        return this.host.post('/auth/signUp', {
            username: login,
            password: password,
            role: 'ROLE_USER'
        }).then((response) => {
            const userData = jwtDecode(response.data.token)
            localStorage.setItem('token', response.data.token)
            return {user: {username: userData.sub, roles: userData.roles}, isAuth: true}
        }).catch((e) => {
            if (e?.response?.status === 401) {
                alertMessage('Ошибка', 'Пользователь с таким логином уже существует')
            } else {
                alertError(e)
            }
            return {user: null, isAuth: false}
        })
    }

    async checkSession() {
        return this.authHost.get('/auth')
            .then(() => {
                return true
            })
            .catch((e) => {
                if (e?.response?.status === 401) {
                    return false
                } else {
                    alertError(e)
                }
            })
    }

    async fetchPublicTournaments(page = 0, size = 5) {
        const url = '/tournaments'
        const config = {
            params: {
                projection: 'bracketType',
                sort: ['createdDate', 'desc'].join(','),
                page: page,
                size: size
            }
        }
        return this._makeRequest(() => this.host.get(url, config))
            .then((data) => {
                const tournaments = data._embedded.tournaments.map((t) => ({
                    id: t.id,
                    date: t.createdDate,
                    name: t.name,
                    logo: t.logo,
                    bracketType: t.bracketType,
                    totalTeams: t.totalTeams,
                }))
                return {tournaments, page: data.page}
            })
    }

    async fetchUserData() {
        const url = '/users/search/my'
        return this._makeRequest(() => this.authHost.get(url))
            .then((data) => ({
                id: data.id,
                createdDate: data.createdDate,
                username: data.username,
            }))
    }

    async fetchUserTournaments() {
        const url = '/tournaments/search/my'
        const params = {
            projection: 'bracketType',
            sort: ['lastModifiedDate', 'desc'].join(','),
            page: 0,
            size: 4
        }
        return this._makeRequest(() => this.authHost.get(url, {params}))
            .then((data) => {
                return data._embedded.tournaments.map((t) => ({
                    id: t.id,
                    date: t.lastModifiedDate,
                    name: t.name,
                    logo: t.logo,
                    bracketType: t.bracketType,
                    totalTeams: t.totalTeams,
                }))
            })
    }

    async fetchUserTeams() {
        const url = '/teams/search/my'
        const params = {
            sort: ['lastModifiedDate', 'desc'].join(','),
            page: 0,
            size: 4
        }
        return this._makeRequest(() => this.authHost.get(url, {params}))
            .then((data) => {
                return data._embedded.teams.map((t) => ({
                    id: t.id,
                    createdDate: t.createdDate,
                    lastModifiedDate: t.lastModifiedDate,
                    name: t.name,
                    logo: t.logo,
                    rating: t.rating,
                }))
            })
    }

    async fetchUserFilteredTournaments(page, size, filters) {
        const url = filters ? '/tournaments/search/filters' : '/tournaments/search/my'
        const params = {
            projection: 'bracketType',
            sort: ['createdDate', 'desc'].join(','),
            page: page,
            size: size
        }
        if (filters) {
            params.name = filters.name
            params.types = filters.types?.join(',')
            params.start = filters.range?.start
            params.end = filters.range?.end
        }
        return this._makeRequest(() => this.authHost.get(url, {params}))
            .then((data) => {
                const tournaments = data._embedded.tournaments.map((t) => ({
                    id: t.id,
                    date: t.createdDate,
                    name: t.name,
                    logo: t.logo,
                    bracketType: t.bracketType,
                    totalTeams: t.totalTeams,
                }))
                return {tournaments, page: data.page}
            })
    }

    async fetchTournamentTypes() {
        const url = '/bracketTypes'
        const params = {
            sort: ['createdDate', 'asc'].join(','),
        }
        return this._makeRequest(() => this.authHost.get(url, {params}))
            .then((data) => {
                return data?._embedded.bracketTypes.map((t) => ({
                    id: t.id,
                    name: t.type,
                    value: t.type,
                    checked: false
                }))
            })
    }

    async fetchUserFilteredTeams(page, size, filters) {
        const params = {
            sort: ['rating', 'desc'].join(','),
            page: page,
            size: 15,
        }
        let url
        if (filters.teamName) {
            url = '/teams/search/ilike'
            params.team = filters.teamName
        } else {
            url = '/teams/search/my'
        }
        return this._makeRequest(() => this.authHost.get(url, {params}))
            .then((data) => {
                const teams = data._embedded.teams.map((t) => ({
                    id: t.id,
                    createdDate: t.createdDate,
                    lastModifiedDate: t.lastModifiedDate,
                    name: t.name,
                    logo: t.logo,
                    rating: t.rating,
                }))
                return {teams, page: data.page}
            })
    }

}

const apiCall = new ApiCall($authHost)
export default apiCall;