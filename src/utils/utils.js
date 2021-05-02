import {globalStorage} from "../index";
import AlertBody from "../components/Alert/AlertBody";

export const alertWarning = (body) => {
    globalStorage.alertStore.showAlert(body)
}

export const alertError = (e) => {
    alertWarning(
        <AlertBody
            header="Ошибка"
            content={e.toString()}
        />
    )

}

export const alertMessage = (header, message) => {
    alertWarning(
        <AlertBody
            header={header}
            content={message}
        />
    )
}

export const toDate = (string) => {
    let [time, date] = string.split(' ')
    time = time.split(':')
    date = date.split('/')
    return new Date(date[2], date[1], date[0], time[0], time[1])
}

export const compare = (a, b, reverse = false) => {
    return reverse ? (a < b) - (b < a) : (b < a) - (a < b)
}