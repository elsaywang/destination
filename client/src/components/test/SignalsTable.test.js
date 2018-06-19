import React from 'react';
import { shallow } from 'enzyme';
import { FormattedNumber } from 'react-intl';
import { columnKeys } from '../../constants/columns';
import { baseRowHeight } from '../../constants/rows';
import SignalsTable from '../SignalsTable';
import Table from '../../components/common/Table';
import PercentageChange from '../../components/common/PercentageChange';
import TraitsPopover from '../../containers/TraitsPopover';
import TraitsCreation from '../../components/common/TraitsCreation';

describe('<SignalsTable /> component', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(
        <SignalsTable
            results={{
                list: [
                    {
                        id: 0,
                        name: 'test1',
                        source: { sourceType: 'ANALYTICS', reportSuiteIds: [123] },
                        percentageChange: 0.1234,
                    },
                    {
                        id: 1,
                        name: 'test2',
                        source: { sourceType: 'ONBOARDED', dataSourceIds: [456] },
                        percentageChange: -0.5678,
                    },
                ],
            }}
            signalType="ALL"
            sortSearch={mockFn}
            onLoadMore={mockFn}
            totalKeyValuePairs={3}
            allowsSelection
        />,
    );

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Table />', () => {
            expect(wrapper.find(Table).exists()).toBeTruthy();
        });
    });

    describe('getColumns', () => {
        const { getColumns } = wrapper.instance();
        const includesColumn = (columns, columnKey) =>
            columns.map(column => column.key).includes(columnKey);
        const {
            keyValuePairs,
            keyName,
            signalType,
            signalSource,
            totalCount,
            percentageChange,
            includedInTraits,
        } = columnKeys;

        it('should return the correct columns when the "All" signal type filter is selected', () => {
            const actualAllSignalsColumnsIncludes = columnKey =>
                includesColumn(getColumns('ALL'), columnKey);

            expect(actualAllSignalsColumnsIncludes(keyValuePairs)).toBeTruthy();
            expect(actualAllSignalsColumnsIncludes(signalType)).toBeTruthy();
            expect(actualAllSignalsColumnsIncludes(signalSource)).toBeTruthy();
            expect(actualAllSignalsColumnsIncludes(totalCount)).toBeTruthy();
            expect(actualAllSignalsColumnsIncludes(percentageChange)).toBeTruthy();
            expect(actualAllSignalsColumnsIncludes(includedInTraits)).toBeTruthy();

            expect(actualAllSignalsColumnsIncludes(keyName)).toBeFalsy();
        });

        it('should return the correct columns when the "Adobe Analytics" signal type filter is selected and Advanced Search is disabled', () => {
            const actualAnalyticsColumnsIncludes = columnKey =>
                includesColumn(getColumns('ANALYTICS'), columnKey);

            expect(actualAnalyticsColumnsIncludes(keyValuePairs)).toBeTruthy();
            expect(actualAnalyticsColumnsIncludes(signalType)).toBeTruthy();
            expect(actualAnalyticsColumnsIncludes(signalSource)).toBeTruthy();
            expect(actualAnalyticsColumnsIncludes(totalCount)).toBeTruthy();
            expect(actualAnalyticsColumnsIncludes(percentageChange)).toBeTruthy();
            expect(actualAnalyticsColumnsIncludes(includedInTraits)).toBeTruthy();

            expect(actualAnalyticsColumnsIncludes(keyName)).toBeFalsy();
        });

        it('should return the correct columns when the "Adobe Analytics" signal type filter is selected and Advanced Search is enabled', () => {
            const actualAdvancedAnalyticsColumnsIncludes = columnKey =>
                includesColumn(getColumns('ANALYTICS', true), columnKey);

            expect(actualAdvancedAnalyticsColumnsIncludes(keyValuePairs)).toBeTruthy();
            expect(actualAdvancedAnalyticsColumnsIncludes(keyName)).toBeTruthy();
            expect(actualAdvancedAnalyticsColumnsIncludes(totalCount)).toBeTruthy();
            expect(actualAdvancedAnalyticsColumnsIncludes(percentageChange)).toBeTruthy();
            expect(actualAdvancedAnalyticsColumnsIncludes(includedInTraits)).toBeTruthy();

            expect(actualAdvancedAnalyticsColumnsIncludes(signalType)).toBeFalsy();
            expect(actualAdvancedAnalyticsColumnsIncludes(signalSource)).toBeFalsy();
        });

        it('should return the correct columns when the "Actionable Log Files" signal type filter is selected', () => {
            const actualActionableLogFilesColumnsIncludes = columnKey =>
                includesColumn(getColumns('ALF'), columnKey);

            expect(actualActionableLogFilesColumnsIncludes(keyValuePairs)).toBeTruthy();
            expect(actualActionableLogFilesColumnsIncludes(signalType)).toBeTruthy();
            expect(actualActionableLogFilesColumnsIncludes(totalCount)).toBeTruthy();
            expect(actualActionableLogFilesColumnsIncludes(percentageChange)).toBeTruthy();
            expect(actualActionableLogFilesColumnsIncludes(includedInTraits)).toBeTruthy();

            expect(actualActionableLogFilesColumnsIncludes(keyName)).toBeFalsy();
            expect(actualActionableLogFilesColumnsIncludes(signalSource)).toBeFalsy();
        });

        it('should return the correct columns when the "General Online Data" signal type filter is selected', () => {
            const actualGeneralOnlineDataColumnsIncludes = columnKey =>
                includesColumn(getColumns('REALTIME'), columnKey);

            expect(actualGeneralOnlineDataColumnsIncludes(keyValuePairs)).toBeTruthy();
            expect(actualGeneralOnlineDataColumnsIncludes(signalType)).toBeTruthy();
            expect(actualGeneralOnlineDataColumnsIncludes(totalCount)).toBeTruthy();
            expect(actualGeneralOnlineDataColumnsIncludes(percentageChange)).toBeTruthy();
            expect(actualGeneralOnlineDataColumnsIncludes(includedInTraits)).toBeTruthy();

            expect(actualGeneralOnlineDataColumnsIncludes(keyName)).toBeFalsy();
            expect(actualGeneralOnlineDataColumnsIncludes(signalSource)).toBeFalsy();
        });

        it('should return the correct columns when the "Onboarded Records" signal type filter is selected', () => {
            const actualOnboardedRecordsColumnsIncludes = columnKey =>
                includesColumn(getColumns('ONBOARDED'), columnKey);

            expect(actualOnboardedRecordsColumnsIncludes(keyValuePairs)).toBeTruthy();
            expect(actualOnboardedRecordsColumnsIncludes(signalType)).toBeTruthy();
            expect(actualOnboardedRecordsColumnsIncludes(signalSource)).toBeTruthy();
            expect(actualOnboardedRecordsColumnsIncludes(totalCount)).toBeTruthy();
            expect(actualOnboardedRecordsColumnsIncludes(percentageChange)).toBeTruthy();
            expect(actualOnboardedRecordsColumnsIncludes(includedInTraits)).toBeTruthy();

            expect(actualOnboardedRecordsColumnsIncludes(keyName)).toBeFalsy();
        });

        describe('"Total Counts" column name variations', () => {
            const getTotalCountColumnTitle = columns =>
                columns.find(column => column.key === totalCount).title;

            it('should be named "Total Counts" when the "All" signal type filter is selected', () => {
                expect(getTotalCountColumnTitle(getColumns('ALL'))).toEqual('Total Counts');
            });

            it('should be named "Event Fires" when the "Adobe Analytics" signal type filter is selected', () => {
                expect(getTotalCountColumnTitle(getColumns('ANALYTICS'))).toEqual('Event Fires');
            });

            it('should be named "Event Fires" when the "Actionable Log Files" signal type filter is selected', () => {
                expect(getTotalCountColumnTitle(getColumns('ALF'))).toEqual('Event Fires');
            });

            it('should be named "Event Fires" when the "General Online Data" signal type filter is selected', () => {
                expect(getTotalCountColumnTitle(getColumns('REALTIME'))).toEqual('Event Fires');
            });

            it('should be named "Total Records" when the "Onboarded Records" signal type filter is selected', () => {
                expect(getTotalCountColumnTitle(getColumns('ONBOARDED'))).toEqual('Total Records');
            });
        });
    });

    describe('getRowHeight', () => {
        const { getRowHeight } = wrapper.instance();
        it('should should return the correct rowHeight based on the `totalKeyValuePairs` passed in', () => {
            const totalKeyValuePairs = 4;
            const expectedRowHeight = totalKeyValuePairs * baseRowHeight;
            expect(getRowHeight(totalKeyValuePairs)).toEqual(expectedRowHeight);
        });
    });

    describe('Rendering cells', () => {
        const instance = wrapper.instance();

        afterEach(() => {
            jest.restoreAllMocks();
        });

        describe('renderCell', () => {
            const verifyRenderMethodInColumn = (renderMethodName, columnKey, data) => {
                jest.spyOn(instance, renderMethodName);
                instance.renderCell({ key: columnKey }, data);
                expect(instance[renderMethodName]).toHaveBeenCalledWith(data);
            };

            it('should call `renderKeyValuePairs` for cells in the `keyValuePairs` column', () => {
                verifyRenderMethodInColumn('renderKeyValuePairs', 'keyValuePairs', []);
            });
            it('should call `renderTotalCounts` for cells in the `totalCount` column', () => {
                verifyRenderMethodInColumn('renderTotalCounts', 'totalCount', 123456789);
            });
            it('should call `renderPercentageChange` for cells in the `percentageChange` column', () => {
                verifyRenderMethodInColumn('renderPercentageChange', 'percentageChange', 0.1234);
            });
            it('should call `renderIncludedInTraits` for cells in the `includedInTraits` column', () => {
                verifyRenderMethodInColumn('renderIncludedInTraits', 'includedInTraits', {
                    sids: [],
                    keyValuePairs: [],
                });
            });
        });

        describe('renderKeyValuePairs', () => {
            const { renderKeyValuePairs } = wrapper.instance();

            it('should render one key-value pair as `${key}=${value}` inside a div', () => {
                const oneKeyValuePair = [{ key: 'k', value: 'v' }];

                expect(renderKeyValuePairs(oneKeyValuePair)).toMatchSnapshot();
            });
            it('should render two key-value pairs on separate lines', () => {
                const twoKeyValuePairs = [{ key: 'k1', value: 'v1' }, { key: 'k2', value: 'v2' }];

                expect(renderKeyValuePairs(twoKeyValuePairs)).toMatchSnapshot();
            });
        });

        describe('renderTotalCounts', () => {
            const { renderTotalCounts } = wrapper.instance();
            const totalCountsWrapper = shallow(<div>{renderTotalCounts(123456789)}</div>);

            it('renders <FormattedNumber />', () => {
                expect(totalCountsWrapper.find(FormattedNumber).exists()).toBeTruthy();
            });
        });

        describe('renderPercentageChange', () => {
            const { renderPercentageChange } = wrapper.instance();
            const percentageChangeWrapper = shallow(<div>{renderPercentageChange(0.1234)}</div>);

            it('renders <PercentageChange />', () => {
                expect(percentageChangeWrapper.find(PercentageChange).exists()).toBeTruthy();
            });
            it('passes `percentageChange` prop', () => {
                expect(
                    percentageChangeWrapper.find(PercentageChange).props().percentageChange,
                ).toEqual(0.1234);
            });
            it('passes the largest percentageChange magnitude from all results as `maxPercentageMagnitude` prop', () => {
                expect(
                    percentageChangeWrapper.find(PercentageChange).props().maxPercentageMagnitude,
                ).toEqual(0.5678);
            });

            it('renders `-` when `null` or non-numeric value is passed in ', () => {
                const tests = ['test', undefined, null, ''];
                tests.map(test => {
                    const nonePercentageChangeWrapper = shallow(
                        <div>{renderPercentageChange(test)}</div>,
                    );
                    expect(nonePercentageChangeWrapper.text()).toEqual('—');
                });
            });
        });

        describe('renderIncludedInTraits', () => {
            describe('when signals are not included in traits', () => {
                const { renderIncludedInTraits } = wrapper.instance();
                const signals = [
                    { sids: [], sourceType: 'ANALYTICS' },
                    { sids: [], sourceType: 'ONBOARDED' },
                    { sids: [], sourceType: 'REALTIME' },
                    { sids: [], sourceType: 'ALF' },
                    { sids: [], sourceType: '-' },
                ];

                it('should render <TraitsCreation />', () => {
                    signals.map(data =>
                        expect(
                            shallow(<div>{renderIncludedInTraits(data)}</div>)
                                .find(TraitsCreation)
                                .exists(),
                        ).toBeTruthy(),
                    );
                });

                it('passes `categoryType` prop`', () => {
                    signals.map(data => expect(renderIncludedInTraits(data)).toMatchSnapshot());
                });
            });

            describe('when signals are included in traits', () => {
                const { renderIncludedInTraits } = wrapper.instance();
                const data = { sids: [1, 2, 3], sourceType: 'ANALYTICS' };
                const includedInTraitsWrapper = shallow(<div>{renderIncludedInTraits(data)}</div>);

                it('should render <TraitsPopover />', () => {
                    expect(includedInTraitsWrapper.find(TraitsPopover).exists()).toBeTruthy();
                });

                it('passes `sids` prop', () => {
                    expect(includedInTraitsWrapper.find(TraitsPopover).props().sids).toEqual([
                        1,
                        2,
                        3,
                    ]);
                });
            });
        });
    });

    describe('Formatting LIST API response for the table', () => {
        describe('formatSignalsList', () => {
            it('should return the list of signals, where each signal has additional custom data for the `signalType`, `signalSource`, and `includedInTraits` columns', () => {
                const newWrapper = shallow(<SignalsTable results={{ list: [] }} />);
                const instance = newWrapper.instance();
                const signals = [{}];

                instance.formatSignalType = jest.fn(() => 'Adobe Analytics');
                instance.formatSignalSource = jest.fn(() => '—');
                instance.formatIncludedInTraits = jest.fn(() => []);

                expect(instance.formatSignalsList(signals)).toEqual([
                    {
                        signalType: 'Adobe Analytics',
                        signalSource: '—',
                        includedInTraits: [],
                    },
                ]);
            });
        });

        describe('formatSignalType', () => {
            const newWrapper = shallow(<SignalsTable results={{ list: [] }} />);
            const { formatSignalType } = newWrapper.instance();

            it('should return "Adobe Analytics" when the signal`s `sourceType` is "ANALYTICS"', () => {
                const signal = { source: { sourceType: 'ANALYTICS' } };

                expect(formatSignalType(signal)).toEqual('Adobe Analytics');
            });

            it('should return "General Online Data" when the signal`s `sourceType` is "REALTIME"', () => {
                const signal = { source: { sourceType: 'REALTIME' } };

                expect(formatSignalType(signal)).toEqual('General Online Data');
            });

            it('should return "Actionable Log Files" when the signal`s `sourceType` is "ALF"', () => {
                const signal = { source: { sourceType: 'ALF' } };

                expect(formatSignalType(signal)).toEqual('Actionable Log Files');
            });

            it('should return "Onboarded Records" when the signal`s `sourceType` is "ONBOARDED"', () => {
                const signal = { source: { sourceType: 'ONBOARDED' } };

                expect(formatSignalType(signal)).toEqual('Onboarded Records');
            });

            it('should return "—" (emdash) string when the signal`s `sourceType` is anything else (should never happen)', () => {
                const signal = { source: { sourceType: 'INVALID' } };

                expect(formatSignalType(signal)).toEqual('—');
            });
        });

        describe('formatSignalSource', () => {
            const newWrapper = shallow(<SignalsTable results={{ list: [] }} />);
            const { formatSignalSource } = newWrapper.instance();

            // TODO: it should actually return the names of the report suite
            it('should return the signal`s report suite ID when its `sourceType` is "ANALYTICS"', () => {
                const signal = { source: { sourceType: 'ANALYTICS', reportSuiteIds: [123] } };

                expect(formatSignalSource(signal)).toEqual('123');
            });

            it('should return "—" (emdash) when the signal`s `sourceType` is "ANALYTICS" and `reportSuiteIds` is null (should never happen)', () => {
                const signal = { source: { sourceType: 'ANALYTICS', reportSuiteIds: null } };

                expect(formatSignalSource(signal)).toEqual('—');
            });

            it('should return "—" (emdash) when the signal`s `sourceType` is "ANALYTICS" and `reportSuiteIds` is empty (should never happen)', () => {
                const signal = { source: { sourceType: 'ANALYTICS', reportSuiteIds: [] } };

                expect(formatSignalSource(signal)).toEqual('—');
            });

            // TODO: it should actually return the names of the datasource
            it('should return the signal`s datasource ID when its `sourceType` is "ONBOARDED"', () => {
                const signal = { source: { sourceType: 'ONBOARDED', dataSourceIds: [456] } };

                expect(formatSignalSource(signal)).toEqual('456');
            });

            it('should return "—" (emdash) when the signal`s `sourceType` is "ONBOARDED" and `dataSourceIds` is null (should never happen)', () => {
                const signal = { source: { sourceType: 'ONBOARDED', dataSourceIds: null } };

                expect(formatSignalSource(signal)).toEqual('—');
            });

            it('should return "—" (emdash) when the signal`s `sourceType` is "ONBOARDED" and `dataSourceIds` is empty (should never happen)', () => {
                const signal = { source: { sourceType: 'ONBOARDED', dataSourceIds: [] } };

                expect(formatSignalSource(signal)).toEqual('—');
            });

            it('should return "—" (emdash) when the signal`s `sourceType` is "ALF"', () => {
                const signal = { source: { sourceType: 'ALF', dataSourceIds: [] } };

                expect(formatSignalSource(signal)).toEqual('—');
            });

            it('should return "—" (emdash) when the signal`s `sourceType` is "REALTIME"', () => {
                const signal = { source: { sourceType: 'REALTIME', dataSourceIds: [] } };

                expect(formatSignalSource(signal)).toEqual('—');
            });

            it('should return "—" (emdash) when the signal`s `sourceType` is anything else (should never happen)', () => {
                const signal = { source: { sourceType: 'INVALID', dataSourceIds: [] } };

                expect(formatSignalSource(signal)).toEqual('—');
            });
        });

        describe('formatIncludedInTraits', () => {
            const newWrapper = shallow(<SignalsTable results={{ list: [] }} />);
            const { formatIncludedInTraits } = newWrapper.instance();

            it('should return an object containing the signal`s `keyValuePairs`, `includedInTraits` (renamed as `sids`), and `categoryType`', () => {
                const signal = {
                    keyValuePairs: [{}],
                    includedInTraits: [123],
                    categoryType: 'REALTIME',
                    totalCount: 10,
                };

                expect(formatIncludedInTraits(signal)).toEqual({
                    keyValuePairs: [{}],
                    sids: [123],
                    categoryType: 'REALTIME',
                });
            });
        });
    });
});
