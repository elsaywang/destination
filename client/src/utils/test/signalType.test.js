import { getSignalTypeLabelMessage, getSearchResultsMessageBySignalTypeLabel } from '../signalType';
import { signalTypeOptions, getSignalTypeLabel } from '../../constants/signalTypeOptions';

describe('signalType Util', () => {
    let validSignalTypes;
    beforeAll(() => {
        validSignalTypes = signalTypeOptions
            .filter(({ value }) => value !== 'ALL')
            .map(({ value }) => value);
    });

    describe('test on `getSignalTypeLabelMessage` func', () => {
        it('should return `in All Signals` message when signal type is `ALL`', () => {
            expect(getSignalTypeLabelMessage('ALL')).toBe('in All Signals');
        });

        it('should return `in ${getSignalTypeLabel(signalType)}` message when signalType is valid and not `ALL`', () => {
            validSignalTypes.map(signalType =>
                expect(getSignalTypeLabelMessage(signalType)).toBe(
                    `in ${getSignalTypeLabel(signalType)}`,
                ),
            );
        });
    });

    describe('test on `getSearchResultsMessageBySignalTypeLabel` func', () => {
        it('should return `for ${searchName} ${getSignalTypeLabelMessage(type)}` when both searchName and type exist', () => {
            const searchName = 'Test1';
            validSignalTypes.map(type =>
                expect(getSearchResultsMessageBySignalTypeLabel(searchName, type)).toBe(
                    `for ${searchName} ${getSignalTypeLabelMessage(type)}`,
                ),
            );
        });

        it('should return `for ${searchName} in All` when only searchName exists', () => {
            const searchName = 'Test1';
            const type = null;
            expect(getSearchResultsMessageBySignalTypeLabel(searchName, type)).toBe(
                `for ${searchName} in All Signals`,
            );
        });

        it('should return `in ${getSignalTypeLabel(signalType)}` when only signal type exists and not `ALL`', () => {
            const searchName = '';
            validSignalTypes.map(type =>
                expect(getSearchResultsMessageBySignalTypeLabel(searchName, type)).toBe(
                    `in ${getSignalTypeLabel(type)}`,
                ),
            );
        });

        it('should return `in All Signals` when only signal type exists and is `ALL`', () => {
            const searchName = '';
            const type = 'ALL';
            expect(getSearchResultsMessageBySignalTypeLabel(searchName, type)).toBe(
                `in All Signals`,
            );
        });
    });
});
