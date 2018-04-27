import { isG6CompliantNumber } from './searchValidation';
import { isEmpty } from './index';

const orDelimiter = ' OR ';
const andDelimiter = ' AND ';

const formatString = value => (isEmpty(value) ? String.raw`\"\"` : value);
const formatOperator = operator => (operator === 'contains' ? ` ${operator} ` : operator);

export const stringifyKeyValuePair = ({ key = '', operator = '==', value = '' }) => {
    const formattedKey = formatString(key);
    const normalizedValue = isG6CompliantNumber(value) ? value : `\"${value}\"`;
    const formattedValue = formatString(normalizedValue);

    return `${formattedKey}${operator}${formattedValue}`;
};

export const formatKeyValuePair = ({ key = '', operator = '==', value = '' }) => {
    const formattedKey = formatString(key);
    const normalizedValue = isG6CompliantNumber(value) ? value : `\"${value}\"`;
    const formattedValue = formatString(normalizedValue);

    return `${formattedKey}${formatOperator(operator)}${formattedValue}`;
};

export const stringifySignal = signal =>
    signal.keyValuePairs.map(stringifyKeyValuePair).join(andDelimiter);

export const stringifySignals = signals => signals.map(stringifySignal).join(orDelimiter);

export const formatSignal = signal =>
    signal.keyValuePairs.map(formatKeyValuePair).join(andDelimiter);
