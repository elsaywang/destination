import { isEmpty } from './index';

export const isG6CompliantNumber = value =>
    !(/[^-.0-9]/.test(value) || /.+[-]+$/.test(value) || /\..*\.+$/.test(value));

export const isComparisonOperator = operator =>
    operator === '>' || operator === '>=' || operator === '<' || operator === '<=';

const stripQuotes = value => (/^".*"$/.test(value) ? value.substr(1, value.length - 2) : value);

const trimHtmlEntityQuotes = value =>
    /^&#x22;.*&#x22;$/.test(value) ? value.replace(/^&#x22;/, '').replace(/&#x22;$/, '') : value;

const getNormalizedValue = value => trimHtmlEntityQuotes(stripQuotes(value));

export const isValueValid = ({ operator, value }) => {
    const normalizedValue = getNormalizedValue(value);

    return (
        (isComparisonOperator(operator) &&
            !isEmpty(normalizedValue) &&
            isG6CompliantNumber(normalizedValue)) ||
        (operator === '==' || operator === 'contains')
    );
};

export const isKeyEmptyWithValue = ({ key, value }) => isEmpty(key) && !isEmpty(value);

export const isAnyKeyEmptyWithValue = keyValuePairs => keyValuePairs.some(isKeyEmptyWithValue);

export const isKeyValuePairEmpty = ({ key, value }) => isEmpty(key) && isEmpty(value);

export const areAllValuesValid = keyValuePairs => keyValuePairs.every(isValueValid);

export const isFormValid = ({ keyValuePairs }) =>
    areAllValuesValid(keyValuePairs) && !isAnyKeyEmptyWithValue(keyValuePairs);
