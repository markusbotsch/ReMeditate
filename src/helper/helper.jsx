// load and return data from localStorage, defaultValue if not existant
export function loadLocalData(keyName, defaultValue) {
    const savedData = JSON.parse(localStorage.getItem(keyName));
    return savedData || defaultValue;
}

// get date dd/m/yyyy from date-value
export function getFullDate(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

// compare saved date to highlight with calendar
export function isSameDate(hDate, date) {
    return hDate === getFullDate(date);
}

