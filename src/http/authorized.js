import {$authHost} from "./index";
import {alertError, alertMessage} from "../utils/utils";
import {globalStorage} from "../index";

const fetchData = async (url, params) => {
    return await $authHost.get(url, {params: params})
        .then((response) => response.data)
        .catch(e => {
            if (e?.response?.status === 401) {
                alertMessage(
                    'Предупреждение',
                    'Время сессии истекло. Пожалуйста, авторизуйтесь снова.'
                )
                globalStorage.userStore.isAuth = false
            } else {
                alertError(e)
            }
        })
}

export const fetchProfileData = async () => {
    const url = '/users/search/my'
    return await fetchData(url)
}

export const fetchProfileTournaments = async () => {
    const url = '/tournaments/search/my'
    const params = {
        projection: 'bracketType',
        sort: ['lastModifiedDate', 'desc'].join(','),
        page: 0,
        size: 4
    }
    const data = await fetchData(url, params)
    return data?._embedded.tournaments || []
}

export const fetchProfileTeams = async (page, size) => {
    const url = '/teams/search/my'
    const params = {
        sort: ['lastModifiedDate', 'desc'].join(','),
        page: 0,
        size: 4
    }
    const data = await fetchData(url, params)
    return data?._embedded.teams || []
}

export const fetchTournaments = async (page, size, filters) => {
    const params = {
        projection: 'bracketType',
        sort: ['createdDate', 'desc'].join(','),
        page: page,
        size: size
    }
    let url;

    if (filters && (filters.name || filters.types || filters.range?.start || filters.range?.end)) {
        url = '/tournaments/search/filters'
        params.name = filters?.name || null
        params.types = filters?.types?.join(',') || null
        params.start = filters?.range?.start || null
        params.end = filters?.range?.end || null
    } else {
        url = '/tournaments/search/my'
    }

    const data = await fetchData(url, params)
    return data?._embedded && data?.page ? [data._embedded.tournaments, data.page] : [[], {
        number: 0,
        size: 0,
        totalElements: 0,
        totalPages: 0
    }]
}

export const fetchTournamentTypes = async () => {
    const url = '/bracketTypes'
    const params = {
        sort: ['createdDate', 'asc'].join(','),
    }
    const data = await fetchData(url, params)
    return data?._embedded?.bracketTypes || []
}

export const fetchTeams = async (page, teamName) => {
    const params = {
        sort: ['rating', 'desc'].join(','),
        page: page,
        size: 15,
    }
    const url = teamName ? '/teams/search/ilike' : '/teams/search/my'
    if (teamName) {
        params.team = teamName
    }

    const data = await fetchData(url, params)
    return data?._embedded && data?.page ? [data._embedded.teams, data.page] : [[], {
        number: 0,
        size: 0,
        totalElements: 0,
        totalPages: 0
    }]
}

export const fetchAllTeams = async () => {
    const url = '/teams/search/my'
    const params = {
        sort: ['rating', 'desc'].join(','),
        page: 0,
        size: 50
    }

    let data = await fetchData(url, params)

    const totalPages = data?.page.totalPages || 0
    const teams: Array = data?._embedded.teams
    for (let i = 1; i < totalPages; i++) {
        data = await fetchData(url, {...params, page: i})
        teams.push(...data?._embedded.teams)
    }

    return teams
}

export const createTournament = async (data) => {
    const url = '/tournaments/withBracket'
    return await $authHost.post(url, data)
        .then((response) => response.data.id)
        .catch(e => {
            if (e?.response?.status === 401) {
                alertMessage(
                    'Предупреждение',
                    'Время сессии истекло. Пожалуйста, авторизуйтесь снова.'
                )
                globalStorage.userStore.isAuth = false
            } else if (e?.response?.status === 400) {
                alertMessage('Ошибка', 'Турнир с таким названием уже существует')
            } else {
                alertError(e)
            }
        })
}

export const fetchOneTournament = async (id) => {
    const url = '/tournaments/' + id
    return await fetchData(url)
}