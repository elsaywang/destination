import React from 'react';
import { shallow } from 'enzyme';
import { FormattedNumber } from 'react-intl';
import { columnKeys } from '../../constants/columns';
import {
    formatDataSourceOptionName,
    formatReportSuiteOptionName,
} from '../../utils/signalSourceOptions';
import SignalsTable from '../SignalsTable';
import Table from '../../components/common/Table';
import TraitsPopover from '../../containers/TraitsPopover';
import TraitsCreation from '../../components/common/TraitsCreation';
import Link from '@react/react-spectrum/Link';

describe('<SignalsTable /> component', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(
        <SignalsTable
            results={[
                {
                    keyValuePairs: [{}],
                    source: { sourceType: 'ANALYTICS', reportSuiteIds: [123] },
                },
                {
                    keyValuePairs: [{}],
                    source: { sourceType: 'ONBOARDED', dataSourceIds: [456] },
                },
            ]}
            signalType="ALL"
            sortSearch={mockFn}
            onLoadMore={mockFn}
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
            includedInTraits,
        } = columnKeys;

        it('should return the correct columns when the "All" signal type filter is selected', () => {
            const actualAllSignalsColumnsIncludes = columnKey =>
                includesColumn(getColumns('ALL'), columnKey);

            expect(actualAllSignalsColumnsIncludes(keyValuePairs)).toBeTruthy();
            expect(actualAllSignalsColumnsIncludes(signalType)).toBeTruthy();
            expect(actualAllSignalsColumnsIncludes(signalSource)).toBeTruthy();
            expect(actualAllSignalsColumnsIncludes(totalCount)).toBeTruthy();
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
            expect(actualAnalyticsColumnsIncludes(includedInTraits)).toBeTruthy();

            expect(actualAnalyticsColumnsIncludes(keyName)).toBeFalsy();
        });

        it('should return the correct columns when the "Adobe Analytics" signal type filter is selected and Advanced Search is enabled', () => {
            const actualAdvancedAnalyticsColumnsIncludes = columnKey =>
                includesColumn(getColumns('ANALYTICS', true), columnKey);

            expect(actualAdvancedAnalyticsColumnsIncludes(keyValuePairs)).toBeTruthy();
            expect(actualAdvancedAnalyticsColumnsIncludes(keyName)).toBeTruthy();
            expect(actualAdvancedAnalyticsColumnsIncludes(totalCount)).toBeTruthy();
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
        it('should should return the default row height if each signal result has one key value pair', () => {
            const newWrapper = shallow(
                <SignalsTable
                    results={[
                        {
                            keyValuePairs: [{}],
                            source: { sourceType: 'ANALYTICS', reportSuiteIds: [123] },
                        },
                    ]}
                />,
            );
            const { getRowHeight } = newWrapper.instance();
            const expectedRowHeight = 48;

            expect(getRowHeight()).toEqual(expectedRowHeight);
        });

        it('should should return the max row height if each signal result has two key value pairs', () => {
            const newWrapper = shallow(
                <SignalsTable
                    results={[
                        {
                            keyValuePairs: [{}, {}],
                            source: { sourceType: 'ANALYTICS', reportSuiteIds: [123] },
                        },
                    ]}
                />,
            );
            const { getRowHeight } = newWrapper.instance();
            const expectedRowHeight = 72;

            expect(getRowHeight()).toEqual(expectedRowHeight);
        });

        it('should should return the max row height if each signal result has three key value pairs', () => {
            const newWrapper = shallow(
                <SignalsTable
                    results={[
                        {
                            keyValuePairs: [{}, {}, {}],
                            source: { sourceType: 'ANALYTICS', reportSuiteIds: [123] },
                        },
                    ]}
                />,
            );
            const { getRowHeight } = newWrapper.instance();
            const expectedRowHeight = 72;

            expect(getRowHeight()).toEqual(expectedRowHeight);
        });

        it('should should return the default row height if there are no signal results', () => {
            const newWrapper = shallow(<SignalsTable results={[]} />);
            const { getRowHeight } = newWrapper.instance();
            const expectedRowHeight = 48;

            expect(getRowHeight()).toEqual(expectedRowHeight);
        });
    });

    describe('Rendering cells', () => {
        const instance = wrapper.instance();

        describe('renderCell', () => {
            const verifyRenderMethodInColumn = (renderMethodName, columnKey, data) => {
                const spy = jest.spyOn(instance, renderMethodName);

                instance.renderCell({ key: columnKey }, data);

                expect(instance[renderMethodName]).toHaveBeenCalledWith(data);

                spy.mockRestore();
            };

            it('should call `renderKeyValuePairs` for cells in the `keyValuePairs` column', () => {
                verifyRenderMethodInColumn('renderKeyValuePairs', 'keyValuePairs', []);
            });
            it('should call `renderTotalCounts` for cells in the `totalCount` column', () => {
                verifyRenderMethodInColumn('renderTotalCounts', 'totalCount', 123456789);
            });
            it('should call `renderIncludedInTraits` for cells in the `includedInTraits` column', () => {
                verifyRenderMethodInColumn('renderIncludedInTraits', 'includedInTraits', {
                    sids: [],
                    keyValuePairs: [],
                    source: { dataSourceIds: [], sourceType: 'ONBOARDED' },
                });
            });
            it('should call `renderSignalType` for cells in the `signalType` column', () => {
                verifyRenderMethodInColumn('renderSignalType', 'signalType', 'Adobe Analytics');
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

        describe('renderKeyName', () => {
            const { renderKeyName } = wrapper.instance();

            it("should render a single key-value pair's friendly name inside a div", () => {
                const oneKeyName = ['Browser'];

                expect(renderKeyName(oneKeyName)).toMatchSnapshot();
            });
            it('should render two key-value pairs on separate lines', () => {
                const twoKeyNames = ['Browser', 'Browser Type'];

                expect(renderKeyName(twoKeyNames)).toMatchSnapshot();
            });
        });

        describe('renderSignalType', () => {
            const { renderSignalType } = wrapper.instance();

            it('should render a valid signalType name inside a div', () => {
                const signalTypes = [
                    'General Online Data',
                    'Adobe Analytics',
                    'Onboarded Records',
                    'Actionable Log Files',
                ];

                signalTypes.map(({ signalType }) =>
                    expect(renderSignalType(signalType)).toMatchSnapshot(),
                );
            });
        });
        describe('renderTotalCounts', () => {
            const { renderTotalCounts } = wrapper.instance();
            const totalCountsWrapper = shallow(<div>{renderTotalCounts(123456789)}</div>);

            it('renders <FormattedNumber />', () => {
                expect(totalCountsWrapper.find(FormattedNumber).exists()).toBeTruthy();
            });
        });

        describe('renderIncludedInTraits', () => {
            describe('when signals are not included in traits', () => {
                const { renderIncludedInTraits } = wrapper.instance();
                const signals = [
                    {
                        sids: [],
                        categoryType: 'REALTIME',
                        source: { dataSourceIds: [123], sourceType: 'ANALYTICS' },
                    },
                    {
                        sids: [],
                        categoryType: 'ONBOARDED',
                        source: { dataSourceIds: [456], sourceType: 'ONBOARDED' },
                    },
                    {
                        sids: [],
                        categoryType: 'REALTIME',
                        source: { dataSourceIds: [789], sourceType: 'REALTIME' },
                    },
                    {
                        sids: [],
                        categoryType: 'REALTIME',
                        source: { dataSourceIds: [1919], sourceType: 'ALF' },
                    },
                    {
                        sids: [],
                        categoryType: 'REALTIME',
                        source: { dataSourceIds: null, sourceType: 'ALL' },
                    },
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
                const data = {
                    sids: [1, 2, 3],
                    categoryType: 'REALTIME',
                    source: { dataSourceIds: [123], sourceType: 'ANALYTICS' },
                };
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
                const newWrapper = shallow(<SignalsTable results={[]} />);
                const instance = newWrapper.instance();
                const signals = [{}];

                instance.formatKeyName = jest.fn(() => 'Browser');
                instance.formatSignalType = jest.fn(() => 'Adobe Analytics');
                instance.formatSignalSource = jest.fn(() => '—');
                instance.formatIncludedInTraits = jest.fn(() => []);

                expect(instance.formatSignalsList(signals)).toEqual([
                    {
                        keyName: 'Browser',
                        signalType: 'Adobe Analytics',
                        signalSource: '—',
                        includedInTraits: [],
                    },
                ]);
            });
        });

        describe('formatKeyName', () => {
            const { formatKeyName } = wrapper.instance();

            it('should return the friendly key name of a single key-value pair', () => {
                const signal = {
                    keyValuePairs: [
                        {
                            key: 'browser',
                            keyName: 'Browser',
                            value: 'chrome',
                        },
                    ],
                };

                expect(formatKeyName(signal)).toEqual(['Browser']);
            });

            it('should return the friendly key names of a multiple key-value pairs', () => {
                const signal = {
                    keyValuePairs: [
                        {
                            key: 'browser',
                            keyName: 'Browser',
                            value: 'chrome',
                        },
                        {
                            key: 'browsertype',
                            keyName: 'Browser Type',
                            value: 'xxx',
                        },
                    ],
                };

                expect(formatKeyName(signal)).toEqual(['Browser', 'Browser Type']);
            });

            it("should return '—' (emdash) if the friendly key name of a key-value pair does not exist", () => {
                const signal = {
                    keyValuePairs: [
                        {
                            key: 'browser',
                            value: 'chrome',
                        },
                    ],
                };

                expect(formatKeyName(signal)).toEqual(['—']);
            });
        });

        describe('formatSignalType', () => {
            const newWrapper = shallow(<SignalsTable results={[]} />);
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
            const newWrapper = shallow(<SignalsTable results={[]} />);
            const { formatSignalSource } = newWrapper.instance();

            it('should return the signal`s report suite Name with Id when its `sourceType` is "ANALYTICS" when sourceName has value', () => {
                const signal = {
                    source: { sourceType: 'ANALYTICS', reportSuiteIds: [123] },
                    sourceName: 'Report ABC 123',
                };
                const reportSuiteWrapper = shallow(<div>{formatSignalSource(signal)}</div>);
                expect(reportSuiteWrapper.find("[data-test='report-suite-name']").text()).toEqual(
                    formatReportSuiteOptionName(signal.source.reportSuiteIds[0], signal.sourceName),
                );
            });

            it('should return the signal`s report suite ID when its `sourceType` is "ANALYTICS" when sourceName is unavaible', () => {
                const signal = {
                    source: { sourceType: 'ANALYTICS', reportSuiteIds: [123] },
                    sourceName: undefined,
                };
                const reportSuiteWrapper = shallow(<div>{formatSignalSource(signal)}</div>);
                expect(reportSuiteWrapper.find("[data-test='report-suite-name']").text()).toEqual(
                    formatReportSuiteOptionName(signal.source.reportSuiteIds[0], signal.sourceName),
                );
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

            it('should return the sourceName value with Hyper Link when signal includes sourceName with sourceId property ', () => {
                const signal = {
                    source: { sourceType: 'ONBOARDED', dataSourceIds: [123] },
                    sourceName: 'test1',
                };
                const linkWrapper = shallow(<div>{formatSignalSource(signal)}</div>);
                expect(linkWrapper.find(Link).exists()).toBeTruthy();
                expect(linkWrapper.find("[data-test='data-source-name']").text()).toEqual(
                    formatDataSourceOptionName(signal.source.dataSourceIds[0], signal.sourceName),
                );
            });
        });

        describe('formatIncludedInTraits', () => {
            const newWrapper = shallow(<SignalsTable results={[]} />);
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
