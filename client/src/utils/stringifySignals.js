import { isNumeric } from './';

const orDelimiter = ' OR ';
const andDelimiter = ' AND ';

const stringifyKeyValuePair = keyValuePair =>
    `${keyValuePair.key}==${
        isNumeric(keyValuePair.value) ? keyValuePair.value : `"${keyValuePair.value}"`
    }`;
const stringifySignal = signal =>
    signal.keyValuePairs.map(stringifyKeyValuePair).join(andDelimiter);
export const stringifySignals = signals => signals.map(stringifySignal).join(orDelimiter);
