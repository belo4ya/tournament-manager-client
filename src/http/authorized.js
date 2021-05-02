import {$authHost} from "./index";
import {alertError, alertMessage} from "../utils/utils";

const fetchData = async (url, params) => {
    return await $authHost.get(url, {params: params})
        .then((response) => response.data)
        .catch(e => {
            if (e?.response.status === 401) {
                alertMessage(
                    'Предупреждение',
                    'Время сессии истекло. Пожалуйста обновите страницу и авторизуйтесь заново.'
                )
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

export const fetchProfileTeams = async () => {
    const url = '/teams/search/my'
    const params = {
        sort: ['lastModifiedDate', 'desc'].join(','),
        page: 0,
        size: 4
    }
    const data = await fetchData(url, params)
    return data?._embedded.teams || []
}

export const fetchTeams = async (page, teamName) => {
    const url = teamName ? `/teams/search/ilike?team=${teamName}` : '/teams/search/my'
    const params = {
        sort: ['rating', 'desc'].join(','),
        page: page,
        size: 15
    }
    const data = await fetchData(url, params)

    return data._embedded && data.page ? [data._embedded.teams, data.page] : [[], {number: 0, size: 0, totalElements: 0, totalPages: 0}]
}