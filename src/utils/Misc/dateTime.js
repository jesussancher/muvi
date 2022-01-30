const monthsDictionary = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
}

const getMonthName = (month) => {
    return monthsDictionary[month];
}

const getYearShort = (year) => {
    return year.slice(2,year.length)
}

export {
    getMonthName,
    getYearShort
}