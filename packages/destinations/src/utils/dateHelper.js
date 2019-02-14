import moment from 'moment';

export const datePattern = 'MMM DD, YYYY hh:mm A';


export const formatDate = ms => moment.utc(ms).format(datePattern);

export const isExpired = ms => moment.utc(ms).isBefore(moment.utc());

export const expireIn = ms =>
    isExpired(ms) ? 'Expired' : `${moment.utc(ms).diff(moment.utc(), 'days')} days`;
