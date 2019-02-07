import moment from 'moment';

export const datePattern = 'MMM DD,YYYY hh:mm a';

export const formatDate = ms => moment(ms).format(datePattern);

export const isExpired = ms => moment(ms).isBefore(moment());

export const expireIn = ms => isExpired(ms) ? 'Expired' : moment(ms).diff(moment(), "days")+` days`;
