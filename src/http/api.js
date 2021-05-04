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
}

const apiCall = new ApiCall($authHost)
export default apiCall;