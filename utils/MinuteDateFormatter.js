import moment from 'moment';

/**
 * Any date with intervals in the hours/minutes can be sent to this function for formatting
 * @param {date} date a JavaScript date object to be formatted
 * @param {Object} format the format we'd like to use for the time part
 */
export default function(date, format) {
    const momented = moment(date);
    const isMidnight = momented.hour() === 0 && momented.minute() === 0;
    return momented.format(format) + (isMidnight ? `\n${momented.format('\nDD/MM')}` : '');
}