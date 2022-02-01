const monthsDictionary = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
}

const getMonthName = (month = 1) => {
    return monthsDictionary[month];
}

const getYearShort = (year) => {
    if(year){
        return year.slice(2,year.length)
    } else {
        return 22
    }
}

export {
    getMonthName,
    getYearShort
}