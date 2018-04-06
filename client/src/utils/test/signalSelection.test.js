import {
    equalize,
    formatSelectionMessageBySignalCategory,
    formatSelectedSignalsSelectionMessage,
    getTotalOnboardedRecords,
    getTotalRealTimeRecords,
    renderSelectedSignalsMessage,
    hasWarning,
} from '../signalSelection.js';

describe('signalSelection Utils', () => {
    describe('test on "equalize" function to generate signular or plural based on total number', () => {
        it('should return signular string when total number is not greater than 1', () => {
            const sets = [
                { number: 1, name: 'signal' },
                { number: 1, name: 'trait' },
                { number: 0, name: 'result' },
                { number: 0, name: 'trait' },
            ];
            sets.map(({ number, name }) => expect(equalize(number, name)).toEqual(name));
        });
        it('should return plural string when total number is greater than 1', () => {
            const sets = [
                { number: 3, name: 'signal' },
                { number: 3, name: 'trait' },
                { number: 6, name: 'result' },
                { number: 10, name: 'signal' },
            ];
            sets.map(({ number, name }) => expect(equalize(number, name)).toEqual(`${name}s`));
        });
    });

    describe('test on "formatSelectedSignalsSelectionMessage" function to get the correct selection message based on input', () => {
        it('should render message "1 Onboarded signal " ', () => {
            expect(formatSelectionMessageBySignalCategory(1, 'Onboarded', 'signal')).toEqual(
                `1 Onboarded signal`,
            );
        });
        it('should render message "1 Onboarded signal ," when "," is the suffix', () => {
            expect(formatSelectionMessageBySignalCategory(1, 'Onboarded', 'signal', ',')).toEqual(
                `1 Onboarded signal,`,
            );
        });
        it('should render message "1 Onboarded signal ," when "selected" is the suffix', () => {
            expect(
                formatSelectionMessageBySignalCategory(1, 'Onboarded', 'signal', ' selected'),
            ).toEqual(`1 Onboarded signal selected`);
        });
        it('should render message "2 Onboarded signals ," when input number is great than 1 and suffix is "," ', () => {
            expect(formatSelectionMessageBySignalCategory(2, 'Onboarded', 'signal', ',')).toEqual(
                `2 Onboarded signals,`,
            );
        });
        it('should render message "2 Onboarded signals selected" when input number is great than 1 and suffix is "selected" ', () => {
            expect(
                formatSelectionMessageBySignalCategory(2, 'Onboarded', 'signal', ' selected'),
            ).toEqual(`2 Onboarded signals selected`);
        });
    });

    describe('test on "formatSelectedSignalsSelectionMessage" function to get correct Signal Selection Context based on input', () => {
        it('should render empty message when both total RealTime and Onboarded record are 0', () => {
            expect(formatSelectedSignalsSelectionMessage()).toEqual('');
        });

        it('should render correct `${totalOnboardedRecords} Onboarded signal(s), ${totalRealTimeRecords} Real-time signal(s) selected` message when both Real-time and Onboarded have record', () => {
            const numberSets = [
                { totalOnboardedRecords: 3, totalRealTimeRecords: 1 },
                { totalOnboardedRecords: 2, totalRealTimeRecords: 2 },
                { totalOnboardedRecords: 1, totalRealTimeRecords: 3 },
                { totalOnboardedRecords: 1, totalRealTimeRecords: 1 },
            ];
            numberSets.map(({ totalOnboardedRecords, totalRealTimeRecords }) => {
                const correctOnboardedSignal = equalize(totalOnboardedRecords, 'signal');
                const correctRealTimeSignal = equalize(totalRealTimeRecords, 'signal');
                expect(
                    formatSelectedSignalsSelectionMessage(
                        totalOnboardedRecords,
                        totalRealTimeRecords,
                    ),
                ).toEqual(
                    `${totalOnboardedRecords} Onboarded ${correctOnboardedSignal}, ${totalRealTimeRecords} Real-time ${correctRealTimeSignal} selected`,
                );
            });
        });

        it('should render only `${totalOnboardedRecords} Onboarded signal(s) selected` when Onboarded has record(s) but Real-time has not record', () => {
            const numberSets = [
                { totalOnboardedRecords: 3, totalRealTimeRecords: 0 },
                { totalOnboardedRecords: 2, totalRealTimeRecords: 0 },
                { totalOnboardedRecords: 1, totalRealTimeRecords: 0 },
                { totalOnboardedRecords: 1, totalRealTimeRecords: null },
                { totalOnboardedRecords: 2, totalRealTimeRecords: undefined },
                { totalOnboardedRecords: 1 },
                { totalOnboardedRecords: 2 },
            ];
            numberSets.map(({ totalOnboardedRecords, totalRealTimeRecords }) => {
                const correctOnboardedSignal = equalize(totalOnboardedRecords, 'signal');
                if (totalRealTimeRecords) {
                    expect(
                        formatSelectedSignalsSelectionMessage(
                            totalOnboardedRecords,
                            totalRealTimeRecords,
                        ),
                    ).toEqual(
                        `${totalOnboardedRecords} Onboarded ${correctOnboardedSignal} selected`,
                    );
                } else {
                    expect(formatSelectedSignalsSelectionMessage(totalOnboardedRecords)).toEqual(
                        `${totalOnboardedRecords} Onboarded ${correctOnboardedSignal} selected`,
                    );
                }
            });
        });

        it('should render only `${totalRealTimeRecords} Real-time signal(s) selected` when Real-time has record(s) but Onboarded has not record', () => {
            const numberSets = [
                { totalOnboardedRecords: 0, totalRealTimeRecords: 3 },
                { totalOnboardedRecords: 0, totalRealTimeRecords: 2 },
                { totalOnboardedRecords: 0, totalRealTimeRecords: 1 },
                { totalOnboardedRecords: null, totalRealTimeRecords: 1 },
                { totalOnboardedRecords: undefined, totalRealTimeRecords: 2 },
                { totalRealTimeRecords: 1 },
                { totalRealTimeRecords: 2 },
            ];
            numberSets.map(({ totalOnboardedRecords, totalRealTimeRecords }) => {
                const correctRealTimeSignal = equalize(totalRealTimeRecords, 'signal');
                if (totalOnboardedRecords) {
                    expect(
                        formatSelectedSignalsSelectionMessage(
                            totalOnboardedRecords,
                            totalRealTimeRecords,
                        ),
                    ).toEqual(
                        `${totalRealTimeRecords} Real-time ${correctRealTimeSignal} selected`,
                    );
                } else {
                    expect(formatSelectedSignalsSelectionMessage('', totalRealTimeRecords)).toEqual(
                        `${totalRealTimeRecords} Real-time ${correctRealTimeSignal} selected`,
                    );
                }
            });
        });
    });

    describe('test on "renderSelectedSignalsMessage" function to render the finalized Signal Selection Context based on rowRecords', () => {
        it('should render empty message when no row record is selected', () => {
            expect(renderSelectedSignalsMessage([])).toEqual('');
        });

        it('should render correct `${totalOnboardedRecords} Onboarded signal(s), ${totalRealTimeRecords} Real-time signal(s) selected` when rowRecords contains both types', () => {
            const rowRecords = [
                { signalType: 'Onboarded Records', rowIndex: 4 },
                { signalType: 'Onboarded Records', rowIndex: 3 },
                { signalType: 'Adobe Analytics', rowIndex: 2 },
                { signalType: 'General Online Data', rowIndex: 1 },
                { signalType: 'Actionable Log Files', rowIndex: 0 },
            ];
            const totalOnboardedRecords = getTotalOnboardedRecords(rowRecords);
            const totalRealTimeRecords = getTotalRealTimeRecords(rowRecords);

            expect(totalOnboardedRecords + totalRealTimeRecords).toEqual(rowRecords.length);

            expect(renderSelectedSignalsMessage(rowRecords)).toEqual(
                `${totalOnboardedRecords} Onboarded signals, ${totalRealTimeRecords} Real-time signals selected`,
            );
        });

        it('should render only `${totalOnboardedRecords} Onboarded signal(s) selected` when rowRecords contains only Onboarded type ', () => {
            const rowRecords = [
                { signalType: 'Onboarded Records', rowIndex: 6 },
                { signalType: 'Onboarded Records', rowIndex: 2 },
                { signalType: 'Onboarded Records', rowIndex: 0 },
            ];
            const totalOnboardedRecords = getTotalOnboardedRecords(rowRecords);

            expect(totalOnboardedRecords).toEqual(rowRecords.length);

            expect(renderSelectedSignalsMessage(rowRecords)).toEqual(
                `${totalOnboardedRecords} Onboarded signals selected`,
            );
        });

        it('should render only `${totalRealTimeRecords} Real-time signal(s) selected` when rowRecords does not contain Onboarded type', () => {
            const rowRecords = [
                { signalType: 'Adobe Analytics', rowIndex: 12 },
                { signalType: 'General Online Data', rowIndex: 14 },
                { signalType: 'Actionable Log Files', rowIndex: 0 },
                { signalType: 'Adobe Analytics', rowIndex: 1 },
                { signalType: 'General Online Data', rowIndex: 3 },
                { signalType: 'Actionable Log Files', rowIndex: 5 },
                { signalType: 'Adobe Analytics', rowIndex: 7 },
                { signalType: 'General Online Data', rowIndex: 9 },
                { signalType: 'Actionable Log Files', rowIndex: 11 },
            ];
            const totalRealTimeRecords = getTotalRealTimeRecords(rowRecords);

            expect(totalRealTimeRecords).toEqual(rowRecords.length);

            expect(renderSelectedSignalsMessage(rowRecords)).toEqual(
                `${totalRealTimeRecords} Real-time signals selected`,
            );
        });
    });

    describe('test on hasWarning function to validate selected records signal types', () => {
        it('should return true when 1 Onboarded and 1 Real-time are selected', () => {
            const rowRecords = [
                { signalType: 'Onboarded Records', rowIndex: 4 },
                { signalType: 'Adobe Analytics', rowIndex: 2 },
            ];
            expect(hasWarning(rowRecords)).toBe(true);
        });

        it('should return true when multiple Onboarded and 1 Real-time are selected', () => {
            const rowRecords = [
                { signalType: 'Onboarded Records', rowIndex: 4 },
                { signalType: 'Onboarded Records', rowIndex: 3 },
                { signalType: 'Onboarded Records', rowIndex: 9 },
                { signalType: 'Actionable Log Files', rowIndex: 2 },
            ];
            expect(hasWarning(rowRecords)).toBe(true);
        });

        it('should return true when 1 Onboarded and multiple Real-time are selected', () => {
            const rowRecords = [
                { signalType: 'Onboarded Records', rowIndex: 4 },
                { signalType: 'Adobe Analytics', rowIndex: 12 },
                { signalType: 'General Online Data', rowIndex: 14 },
                { signalType: 'Actionable Log Files', rowIndex: 0 },
            ];
            expect(hasWarning(rowRecords)).toBe(true);
        });

        it('should return false when no record is selected', () => {
            const rowRecords = [];
            expect(hasWarning(rowRecords)).toBe(false);
        });

        it('should return false when only Onboarded records are selected', () => {
            const rowRecords = [
                { signalType: 'Onboarded Records', rowIndex: 4 },
                { signalType: 'Onboarded Records', rowIndex: 1 },
            ];
            expect(hasWarning(rowRecords)).toBe(false);
        });

        it('should return false when only Real-time records are selected', () => {
            const rowRecords = [
                { signalType: 'Adobe Analytics', rowIndex: 12 },
                { signalType: 'General Online Data', rowIndex: 14 },
                { signalType: 'Actionable Log Files', rowIndex: 0 },
                { signalType: 'Adobe Analytics', rowIndex: 1 },
            ];
            expect(hasWarning(rowRecords)).toBe(false);
        });
    });
});
