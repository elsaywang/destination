import moment from 'moment';

export const datePattern = 'MMM DD, YYYY hh:mm A';

//standardize to UTC
export const standardizedTime = (ms = undefined) => moment(ms).utc();

export const formatDate = ms => standardizedTime(ms).format(datePattern);

export const isExpired = ms => standardizedTime(ms).isBefore(standardizedTime());

export const expireIn = ms =>
    isExpired(ms) ? 'Expired' : `${standardizedTime(ms).diff(standardizedTime(), 'days')} days`;
