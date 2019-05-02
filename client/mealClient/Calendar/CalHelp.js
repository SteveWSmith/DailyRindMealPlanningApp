export const THIS_YEAR = +(new Date().getFullYear());
export const THIS_MONTH = +(new Date().getMonth() + 1);
export const WEEK_DAYS = {
    Sunday: 'Sun',
    Monday: 'Mon',
    Tuesday: 'Tues',
    Wednesday: 'Wed',
    Thursday: 'Thur',
    Friday: 'Fri',
    Saturday: 'Sat',
}

export const MONTHS = {
    January: 'January',
    Febuary: 'February',
    March: 'March',
    April: 'April',
    May: 'May',
    June: 'June',
    July: 'July',
    August: 'August',
    September: 'September',
    October: 'October',
    November: 'November',
    December: 'December',
}

export const CALENDAR_WEEKS = 6;

// Adds padding to a string input ment for a date
export const addPadding = (value, padding) => {
    return `${value}`.padStart(padding, '0');
}

/*
Get the current month days
params:
    month-> an integer between 1-12
    year-> a four digit value that repsents the year
*/
export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
    const month30 = [4, 6, 9, 11]
    const leap = year % 4 === 0 && year % 400 === 0
    return month === 2 ? leap ? 29 : 28 : month30.includes(month) ? 30 : 31
}

/*
Gets the first day (sun-sat) of a month given a month and year
params:
    month-> an integer between 1-12
    year-> a four digit value that repsents the year
*/
export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
    return +(new Date(`${year}-${addPadding(month, 2)}-01`).getDay()) + 1;
}

/*
Checks if a date is a valid date
params:
    date-> a date object
*/
export const isDate = date => {
    const isDate = Object.prototype.toString.call(date) === '[object Date]';
    const isValidDate = date && !Number.isNaN(date.valueOf());

    return isDate && isValidDate;
}

/*
checks if the month is the same month a the current
being used
params:
    date-> a date object
    basedate-> current date object
*/
export const isSameMonth = (date, basedate = new Date()) => {
    if (!(isDate(date) && isDate(basedate))) return false;;

    const basedateMonth = +(basedate.getMonth()) + 1;
    const basedateYear = (basedate.getFullYear());

    const dateMonth = +(date.getMonth()) + 1;
    const dateYear = date.getFullYear();

    return (+basedateMonth === +dateMonth) && (+basedateYear === +dateYear);
}

/*
checks if the day is the same day as the current
being used
params:
    date - > a date object
    basedate - > current date object
*/
export const isSameDay = (date, basedate = new Date()) => {
    if (!(isDate(date) && isDate(basedate))) return false;

    const basedateDate = basedate.getDate()
    const basedateMonth = +(basedate.getMonth()) + 1
    const basedateYear = basedate.getFullYear();

    const dateDate = date.getDate();
    const dateMonth = +(date.getMonth()) + 1;
    const dateYear = date.getFullYear()

    return (+basedateDate === +dateDate) && (+basedateMonth === +dateMonth) && (+basedateYear == +dateYear);
}

// Gets the current date as a string
export const getDateISO = (date = new Date) => {
    if (!isDate(date)) return null;

    return [date.getFullYear(), addPadding(date.getMonth() + 1, 2), addPadding(date.getDate(), 2)].join('-');
}

/**
 * Gets the previous month and returns it as an object
 * @param {A month value as an integer} month 
 * @param {A year value as a four digit integer} year 
 */
export const getPrevMonth = (month, year) => {
    const prevMonth = (month > 1) ? month - 1 : 12
    const prevMonthYear = (month > 1) ? year : year - 1
    return {
        month: prevMonth,
        year: prevMonthYear
    }
}

/**
 * Gets the next month and returns it as an object
 * @param {A month value as an integer} month 
 * @param {A year value as a four digit integer} year 
 */
export const getNextMonth = (month, year) => {
    const nextMonth = (month < 12) ? month + 1 : 1
    const nextMonthYear = (month < 12) ? year : year + 1

    return {
        month: nextMonth,
        year: nextMonthYear
    }
}

/**
 * Gets all the day objects (day, month, year) for 42 days worth of objects
 * @param {A month value as an integer between 1-12} month 
 * @param {A year value as a four digit integer} year 
 */
export const getMonthData = (month = THIS_MONTH, year = THIS_YEAR) => {
    const monthDay = getMonthDays(month, year);
    const monthFirstDay = getMonthFirstDay(month, year);

    const daysFromPrevMonth = monthFirstDay;
    const daysFromNextMonth = (CALENDAR_WEEKS * 7) - (daysFromPrevMonth + monthDay)

    const {
        month: prevMonth,
        year: prevMonthYear
    } = getPrevMonth(month, year)
    const {
        month: nextMonth,
        year: nextMonthYear
    } = getNextMonth(month, year)

    const prevMonthDays = getMonthDays(prevMonth, prevMonthYear);

    const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
        const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
        return {
            year: prevMonthYear,
            month: addPadding(prevMonth, 2),
            day: addPadding(day, 2)
        };
    });

    const thisMonthDates = [...new Array(monthDay)].map((n, index) => {
        const day = index + 1;
        return {
            year: year,
            month: addPadding(month, 2),
            day: addPadding(day, 2)
        };
    });

    const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
        const day = index + 1;
        return {
            year: nextMonthYear,
            month: addPadding(nextMonth, 2),
            day: addPadding(day, 2)
        };
    });

    return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
}