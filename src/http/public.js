import {$host} from "./index";
import {alertError, alertMessage} from "../utils/utils";
import {SIGN_IN_ENDPOINT, SIGN_UP_ENDPOINT} from "../utils/endpoints";
import jwtDecode from "jwt-decode";
import {globalStorage} from "../index";

const fetchData = async (url, params) => {
    return await $host.get(url, {params: params})
        .then((response) => response.data)
        .catch((e) => alertError(e))
}

export const fetchTournamentsPage = async (page) => {
    const url = '/tournaments'
    const params = {
        projection: 'bracketType',
        sort: ['createdDate', 'desc'].join(','),
        page: page,
        size: 5
    }
    return await fetchData(url, params)
}

export const signIn = async (login, password) => {
    return await $host.post(SIGN_IN_ENDPOINT, {username: login, password: password})
        .then((response) => {
            return authorize(response.data.token)
        })
        .catch((e) => {
            if (e?.response?.status === 401) {
                alertMessage('Ошибка', 'Неверный логин или пароль')
                return false
            } else {
                alertError(e)
            }
        })
}

export const signUp = async (login, password) => {
    return await $host.post(SIGN_UP_ENDPOINT, {username: login, password: password, role: 'ROLE_USER'})
        .then((response) => {
            return authorize(response.data.token)
        })
        .catch(e => {
            if (e?.response?.status === 401) {
                alertMessage('Ошибка', 'Пользователь с таким логином уже существует')
                return false
            } else {
                alertError(e)
            }
        })
}

const authorize = (token) => {
    const userData = jwtDecode(token)
    localStorage.setItem('token', token)
    globalStorage.userStore.isAuth = true
    globalStorage.userStore.username = userData.sub
    globalStorage.userStore.roles = userData.roles
    return true
}