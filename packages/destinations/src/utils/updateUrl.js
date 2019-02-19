import _ from 'lodash';
import queryString from 'query-string';

export const updateUrl = (history, addedParams) => {
    const currentParams = queryString.parse(history.location.search);
    const newParams = _.merge({}, currentParams, addedParams);
    const nonEmptyParams = _.pickBy(newParams, val => val !== '');

    history.push(`?${queryString.stringify(nonEmptyParams)}`);
};
