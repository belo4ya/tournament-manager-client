export const toDate = (string) => {
    let [time, date] = string.split(' ')
    time = time.split(':')
    date = date.split('/')
    return new Date(date[2], date[1], date[0], time[0], time[1])
}


export const compareDates = (a, b) => {
    const [aDate, bDate] = [toDate(a.lastModifiedDate), toDate(b.lastModifiedDate)]
    if (aDate > bDate) {
        return -1
    } else if (aDate < bDate) {
        return 1
    }
    return 0
}
