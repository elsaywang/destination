const orDelimiter = ',';
const andDelimiter = ';';

// TODO: export this and use it in SignalsTable
const isNumeric = val => Number(parseFloat(val)) === val;

export const fetchTraits = sids => {
    // fetch(`/api/traits/${sids}`
    return fetch('/api/traits/');
};

// TODO: Extract and test some of these functions separately
export const encodeKeyValuePairs = signals => {
    const formatKeyValuePair = keyValuePair =>
        `${keyValuePair.key}=${
            isNumeric(keyValuePair.value) ? keyValuePair.value : `"${keyValuePair.value}"`
        }`;
    const formatSignal = signal => signal.keyValuePairs.map(formatKeyValuePair).join(andDelimiter);
    const formatSignals = signals => signals.map(formatSignal).join(orDelimiter);

    // Use encodeURIComponent because the key-value pairs are formatted like
    // `key=value` and the equals signs need to get encoded.
    return encodeURIComponent(formatSignals(signals));
};

export * from './signalSelection.utils.js';
