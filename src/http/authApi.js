import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";
import {AUTH_ENDPOINT, REGISTER_ENDPOINT, SIGNIN_ENDPOINT} from "../utils/endpoints";


export const registration = async (username, password) => {
    const {data} = await $host.post(REGISTER_ENDPOINT, {username, password, role: 'ROLE_ADMIN'});
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
}

export const login = async (username, password) => {
    const {data} = await $host.post(SIGNIN_ENDPOINT, {username, password});
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
}

export const check = async () => {
    const {data} = await $authHost.get(AUTH_ENDPOINT);
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token);
}
