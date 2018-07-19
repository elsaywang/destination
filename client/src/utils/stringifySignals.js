/* eslint no-useless-escape:0 */
import { isComparisonOperator, isKeyValuePairEmpty } from './searchValidation';
import { isEmpty } from './index';

const orDelimiter = ' OR ';
const andDelimiter = ' AND ';

const formatString = value => (isEmpty(value) ? String.raw`""` : value);
const formatOperator = operator => (operator === 'contains' ? ` ${operator} ` : operator);

export const stringifyKeyValuePair = ({ key = '', operator = '==', value = '' }) => {
    if (isKeyValuePairEmpty({ key, value })) {
        return '';
    }

    const normalizedKey = `\"${key}\"`;
    const formattedKey = formatString(normalizedKey);
    const normalizedValue = isComparisonOperator(operator) ? value : `\"${value}\"`;
    const formattedValue = formatString(normalizedValue);

    return `${formattedKey}${operator}${formattedValue}`;
};

export const formatKeyValuePair = ({ key = '', operator = '==', value = '' }) => {
    const normalizedKey = `\"${key}\"`;
    const formattedKey = formatString(normalizedKey);
    const normalizedValue = isComparisonOperator(value) ? value : `\"${value}\"`;
    const formattedValue = formatString(normalizedValue);

    return `${formattedKey}${formatOperator(operator)}${formattedValue}`;
};

export const stringifySignal = signal =>
    signal.keyValuePairs
        .filter(kvp => !isKeyValuePairEmpty(kvp))
        .map(stringifyKeyValuePair)
        .join(andDelimiter);

export const stringifySignals = signals => signals.map(stringifySignal).join(orDelimiter);

export const formatSignal = signal =>
    signal.keyValuePairs.map(formatKeyValuePair).join(andDelimiter);
