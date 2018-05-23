import React from 'react';
import { shallow } from 'enzyme';
import { FormattedNumber } from 'react-intl';
import { columnKeys } from '../../constants/columns';
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
                        source: { sourceType: 'ANALYTICS' },
                        percentageChange: 0.1234,
                    },
                    {
                        id: 1,
                        name: 'test2',
                        source: { sourceType: 'ONBOARDED' },
                        percentageChange: -0.5678,
                    },
                ],
            }}
            signalType="ALL"
            sortSearch={mockFn}
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
            valueName,
            signalType,
            signalSource,
            totalCounts,
            totalEventFires,
            percentageChange,
            includedInTraits,
        } = columnKeys;

        it('should return the correct columns when the "All" signal type filter is selected', () => {
            const actualAllSignalsColumnsIncludes = columnKey =>
                includesColumn(getColumns('ALL'), columnKey);

            expect(actualAllSignalsColumnsIncludes(keyValuePairs)).toBeTruthy();
            expect(actualAllSignalsColumnsIncludes(signalType)).toBeTruthy();
            expect(actualAllSignalsColumnsIncludes(signalSource)).toBeTruthy();
            expect(actualAllSignalsColumnsIncludes(totalCounts)).toBeTruthy();
            expect(actualAllSignalsColumnsIncludes(percentageChange)).toBeTruthy();
            expect(actualAllSignalsColumnsIncludes(includedInTraits)).toBeTruthy();

            expect(actualAllSignalsColumnsIncludes(keyName)).toBeFalsy();
            expect(actualAllSignalsColumnsIncludes(valueName)).toBeFalsy();
            expect(actualAllSignalsColumnsIncludes(totalEventFires)).toBeFalsy();
        });

        it('should return the correct columns when the "Adobe Analytics" signal type filter is selected and Advanced Search is disabled', () => {
            const actualAnalyticsColumnsIncludes = columnKey =>
                includesColumn(getColumns('ANALYTICS'), columnKey);

            expect(actualAnalyticsColumnsIncludes(keyValuePairs)).toBeTruthy();
            expect(actualAnalyticsColumnsIncludes(signalType)).toBeTruthy();
            expect(actualAnalyticsColumnsIncludes(signalSource)).toBeTruthy();
            expect(actualAnalyticsColumnsIncludes(totalCounts)).toBeTruthy();
            expect(actualAnalyticsColumnsIncludes(percentageChange)).toBeTruthy();
            expect(actualAnalyticsColumnsIncludes(includedInTraits)).toBeTruthy();

            expect(actualAnalyticsColumnsIncludes(keyName)).toBeFalsy();
            expect(actualAnalyticsColumnsIncludes(valueName)).toBeFalsy();
            expect(actualAnalyticsColumnsIncludes(totalEventFires)).toBeFalsy();
        });

        it('should return the correct columns when the "Adobe Analytics" signal type filter is selected and Advanced Search is enabled', () => {
            const actualAdvancedAnalyticsColumnsIncludes = columnKey =>
                includesColumn(getColumns('ANALYTICS', true), columnKey);

            expect(actualAdvancedAnalyticsColumnsIncludes(keyValuePairs)).toBeTruthy();
            expect(actualAdvancedAnalyticsColumnsIncludes(keyName)).toBeTruthy();
            expect(actualAdvancedAnalyticsColumnsIncludes(valueName)).toBeTruthy();
            expect(actualAdvancedAnalyticsColumnsIncludes(totalEventFires)).toBeTruthy();
            expect(actualAdvancedAnalyticsColumnsIncludes(percentageChange)).toBeTruthy();
            expect(actualAdvancedAnalyticsColumnsIncludes(includedInTraits)).toBeTruthy();

            expect(actualAdvancedAnalyticsColumnsIncludes(signalType)).toBeFalsy();
            expect(actualAdvancedAnalyticsColumnsIncludes(signalSource)).toBeFalsy();
            expect(actualAdvancedAnalyticsColumnsIncludes(totalCounts)).toBeFalsy();
        });

        it('should return the correct columns when the "Actionable Log Files" signal type filter is selected', () => {
            const actualActionableLogFilesColumnsIncludes = columnKey =>
                includesColumn(getColumns('ALF'), columnKey);

            expect(actualActionableLogFilesColumnsIncludes(keyValuePairs)).toBeTruthy();
            expect(actualActionableLogFilesColumnsIncludes(signalType)).toBeTruthy();
            expect(actualActionableLogFilesColumnsIncludes(totalCounts)).toBeTruthy();
            expect(actualActionableLogFilesColumnsIncludes(percentageChange)).toBeTruthy();
            expect(actualActionableLogFilesColumnsIncludes(includedInTraits)).toBeTruthy();

            expect(actualActionableLogFilesColumnsIncludes(keyName)).toBeFalsy();
            expect(actualActionableLogFilesColumnsIncludes(valueName)).toBeFalsy();
            expect(actualActionableLogFilesColumnsIncludes(signalSource)).toBeFalsy();
            expect(actualActionableLogFilesColumnsIncludes(totalEventFires)).toBeFalsy();
        });

        it('should return the correct columns when the "General Online Data" signal type filter is selected', () => {
            const actualGeneralOnlineDataColumnsIncludes = columnKey =>
                includesColumn(getColumns('REALTIME'), columnKey);

            expect(actualGeneralOnlineDataColumnsIncludes(keyValuePairs)).toBeTruthy();
            expect(actualGeneralOnlineDataColumnsIncludes(signalType)).toBeTruthy();
            expect(actualGeneralOnlineDataColumnsIncludes(totalCounts)).toBeTruthy();
            expect(actualGeneralOnlineDataColumnsIncludes(percentageChange)).toBeTruthy();
            expect(actualGeneralOnlineDataColumnsIncludes(includedInTraits)).toBeTruthy();

            expect(actualGeneralOnlineDataColumnsIncludes(keyName)).toBeFalsy();
            expect(actualGeneralOnlineDataColumnsIncludes(valueName)).toBeFalsy();
            expect(actualGeneralOnlineDataColumnsIncludes(signalSource)).toBeFalsy();
            expect(actualGeneralOnlineDataColumnsIncludes(totalEventFires)).toBeFalsy();
        });

        it('should return the correct columns when the "Onboarded Records" signal type filter is selected', () => {
            const actualOnboardedRecordsColumnsIncludes = columnKey =>
                includesColumn(getColumns('ONBOARDED'), columnKey);

            expect(actualOnboardedRecordsColumnsIncludes(keyValuePairs)).toBeTruthy();
            expect(actualOnboardedRecordsColumnsIncludes(signalType)).toBeTruthy();
            expect(actualOnboardedRecordsColumnsIncludes(signalSource)).toBeTruthy();
            expect(actualOnboardedRecordsColumnsIncludes(totalCounts)).toBeTruthy();
            expect(actualOnboardedRecordsColumnsIncludes(percentageChange)).toBeTruthy();
            expect(actualOnboardedRecordsColumnsIncludes(includedInTraits)).toBeTruthy();

            expect(actualOnboardedRecordsColumnsIncludes(keyName)).toBeFalsy();
            expect(actualOnboardedRecordsColumnsIncludes(valueName)).toBeFalsy();
            expect(actualOnboardedRecordsColumnsIncludes(totalEventFires)).toBeFalsy();
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
            it('should call `renderTotalCounts` for cells in the `totalCounts` column', () => {
                verifyRenderMethodInColumn('renderTotalCounts', 'totalCounts', 123456789);
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
});
