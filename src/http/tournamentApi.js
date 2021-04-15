import {$authHost, $host} from "./index";
import {TOURNAMENT_ENDPOINT} from "../utils/endpoints";

export const getAllTournaments = async () => {
    const {data} = await $host.get(TOURNAMENT_ENDPOINT)
    console.log(data)
    return data
}

export const getTournamentsByUsername = async (username) => {
    const {data} = await $authHost.get(TOURNAMENT_ENDPOINT + '/search/users?username=' + username)
    console.log(data)
    return data
}

export const createTournament = async (name) => {
    const {data} = await $authHost.post(TOURNAMENT_ENDPOINT, {name})
    console.log(data)
    return data
}
