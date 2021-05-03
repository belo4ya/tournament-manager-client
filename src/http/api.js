import {$authHost, $host} from "./index";

class ApiCall {
    constructor() {
        this.authHost = $authHost
        this.host = $host
    }

    async signIn(login, password) {
        return await this.host.post('/auth/signIn', {
            username: login,
            password: password,
        })
    }

    async signUp(login, password) {
        return await this.host.post('/auth/signUp', {
            username: login,
            password: password,
            role: 'ROLE_USER'
        })
    }

    async checkSession() {
        return await this.authHost.get('/auth')
    }

    async fetchPublicTournaments(page = 0, size = 5) {
        return this.host.get('/tournaments', {
            params: {
                projection: 'bracketType',
                sort: ['createdDate', 'desc'].join(','),
                page: page,
                size: size
            }
        }).then((response) => {
            const data = response.data
            const tournaments = data._embedded.tournaments.map((t) => ({
                id: t.id,
                date: t.createdDate,
                name: t.name,
                logo: t.logo,
                bracketType: t.bracketType,
                totalTeams: t.totalTeams,
            }))
            const page = data.page
            return {tournaments, page}
        })
    }
}

const apiCall = new ApiCall($authHost)
export default apiCall;