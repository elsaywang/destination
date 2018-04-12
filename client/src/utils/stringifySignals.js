import { isG6CompliantNumber } from './searchValidation';

const orDelimiter = ' OR ';
const andDelimiter = ' AND ';

const stringifyKeyValuePair = keyValuePair =>
    `${keyValuePair.key}==${
        isG6CompliantNumber(keyValuePair.value) ? keyValuePair.value : `"${keyValuePair.value}"`
    }`;
const stringifySignal = signal =>
    signal.keyValuePairs.map(stringifyKeyValuePair).join(andDelimiter);

export const stringifySignals = signals => signals.map(stringifySignal).join(orDelimiter);
