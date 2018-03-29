import {
    OnboardedRecords,
    equalize,
    formatDisplayContextByType,
    formatSelectedSignalsDisplayContext,
    getTotalOnboardedRecords,
    getTotalRealTimeRecords,
    renderSelectedSignalsContext,
} from '../signalSelection.utils.js';

describe('signalSelection Utils', () => {
    describe('test on "equalize" function to generate signular or plural based on total number', () => {
        it('should return signular string when total number is not greater than 1', () => {
            const sets = [
                { number: 1, name: 'signal' },
                { number: 1, name: 'trait' },
                { number: 0, name: 'result' },
                { number: 0, name: 'trait' },
            ];
            sets.map(v => expect(equalize(v.number, v.name)).toEqual(v.name));
        });
        it('should return plural string when total number is greater than 1', () => {
            const sets = [
                { number: 3, name: 'signal' },
                { number: 3, name: 'trait' },
                { number: 6, name: 'result' },
                { number: 10, name: 'signal' },
            ];
            sets.map(v => expect(equalize(v.number, v.name)).toEqual(`${v.name}s`));
        });
    });

    describe('test on "formatSelectedSignalsDisplayContext" function to get the correct display context based on input', () => {
        it('should render context "1 Onboarded signal " ', () => {
            expect(formatDisplayContextByType(1, 'Onboarded', 'signal')).toEqual(
                `1 Onboarded signal `,
            );
        });
        it('should render context "1 Onboarded signal ," when "," is the suffix', () => {
            expect(formatDisplayContextByType(1, 'Onboarded', 'signal', ',')).toEqual(
                `1 Onboarded signal ,`,
            );
        });
        it('should render context "1 Onboarded signal ," when "selected" is the suffix', () => {
            expect(formatDisplayContextByType(1, 'Onboarded', 'signal', 'selected')).toEqual(
                `1 Onboarded signal selected`,
            );
        });
        it('should render context "2 Onboarded signals ," when input number is great than 1 and suffix is "," ', () => {
            expect(formatDisplayContextByType(2, 'Onboarded', 'signal', ',')).toEqual(
                `2 Onboarded signals ,`,
            );
        });
        it('should render context "2 Onboarded signals selected" when input number is great than 1 and suffix is "selected" ', () => {
            expect(formatDisplayContextByType(2, 'Onboarded', 'signal', 'selected')).toEqual(
                `2 Onboarded signals selected`,
            );
        });
    });

    describe('test on "formatSelectedSignalsDisplayContext" function to get correct Signal Selection Context based on input', () => {
        it('should render empty context when both total RealTime and Onboarded record are 0', () => {
            expect(formatSelectedSignalsDisplayContext()).toEqual('');
        });

        it('should render correct `${totalOnboardedRecords} Onboarded signal(s), ${totalRealTimeRecords} Real-time signal(s) selected` context when both Real-time and Onboarded have record', () => {
            const numberSets = [
                { totalOnboardedRecords: 3, totalRealTimeRecords: 1 },
                { totalOnboardedRecords: 2, totalRealTimeRecords: 2 },
                { totalOnboardedRecords: 1, totalRealTimeRecords: 3 },
                { totalOnboardedRecords: 1, totalRealTimeRecords: 1 },
            ];
            numberSets.map(v => {
                const correctOnboardedSignal = equalize(v.totalOnboardedRecords, 'signal');
                const correctRealTimeSignal = equalize(v.totalRealTimeRecords, 'signal');
                expect(
                    formatSelectedSignalsDisplayContext(
                        v.totalOnboardedRecords,
                        v.totalRealTimeRecords,
                    ),
                ).toEqual(
                    `${v.totalOnboardedRecords} Onboarded ${correctOnboardedSignal} , ${
                        v.totalRealTimeRecords
                    } Real-time ${correctRealTimeSignal} selected`,
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
            numberSets.map(v => {
                const correctOnboardedSignal = equalize(v.totalOnboardedRecords, 'signal');
                if (v.totalRealTimeRecords) {
                    expect(
                        formatSelectedSignalsDisplayContext(
                            v.totalOnboardedRecords,
                            v.totalRealTimeRecords,
                        ),
                    ).toEqual(
                        `${v.totalOnboardedRecords} Onboarded ${correctOnboardedSignal} selected`,
                    );
                } else {
                    expect(formatSelectedSignalsDisplayContext(v.totalOnboardedRecords)).toEqual(
                        `${v.totalOnboardedRecords} Onboarded ${correctOnboardedSignal} selected`,
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
            numberSets.map(v => {
                const correctRealTimeSignal = equalize(v.totalRealTimeRecords, 'signal');
                if (v.totalOnboardedRecords) {
                    expect(
                        formatSelectedSignalsDisplayContext(
                            v.totalOnboardedRecords,
                            v.totalRealTimeRecords,
                        ),
                    ).toEqual(
                        `${v.totalRealTimeRecords} Real-time ${correctRealTimeSignal} selected`,
                    );
                } else {
                    expect(formatSelectedSignalsDisplayContext('', v.totalRealTimeRecords)).toEqual(
                        `${v.totalRealTimeRecords} Real-time ${correctRealTimeSignal} selected`,
                    );
                }
            });
        });
    });

    describe('test on "renderSelectedSignalsContext" function to render the finalized Signal Selection Context based on rowRecords', () => {
        it('should render empty context when no row record is selected', () => {
            expect(renderSelectedSignalsContext([])).toEqual('');
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

            expect(renderSelectedSignalsContext(rowRecords)).toEqual(
                `${totalOnboardedRecords} Onboarded signals , ${totalRealTimeRecords} Real-time signals selected`,
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

            expect(renderSelectedSignalsContext(rowRecords)).toEqual(
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

            expect(renderSelectedSignalsContext(rowRecords)).toEqual(
                `${totalRealTimeRecords} Real-time signals selected`,
            );
        });
    });
});
