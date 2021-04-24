import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";
import {AUTH_ENDPOINT, SIGN_IN_ENDPOINT, SIGN_UP_ENDPOINT} from "../utils/endpoints";


export const signUp = async (username, password) => {
    const {data} = await $host.post(SIGN_UP_ENDPOINT, {username, password, role: 'ROLE_ADMIN'});
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
}

export const signIn = async (username, password) => {
    const {data} = await $host.post(SIGN_IN_ENDPOINT, {username, password});
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
}

export const checkSession = async () => {
    const {data} = await $authHost.get(AUTH_ENDPOINT);
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
}
