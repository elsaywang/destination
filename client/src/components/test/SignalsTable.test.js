import React from 'react';
import { shallow } from 'enzyme';
import { columnKeys } from '../../constants/columns';
import SignalsTable from '../SignalsTable';
import Table from '../../components/common/Table';

describe('<SignalsTable /> component', () => {
    const wrapper = shallow(
        <SignalsTable
            results={{ list: [{ id: 0, name: 'test', source: { sourceType: 'ANALYTICS' } }] }}
            signalType="all"
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
                includesColumn(getColumns('all'), columnKey);

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
                includesColumn(getColumns('adobeAnalytics'), columnKey);

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
                includesColumn(getColumns('adobeAnalytics', true), columnKey);

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
                includesColumn(getColumns('actionableLogFiles'), columnKey);

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
                includesColumn(getColumns('generalOnlineData'), columnKey);

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
                includesColumn(getColumns('onboardedRecords'), columnKey);

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
            it('should call `renderKeyValuePairs` for cells in the `keyValuePairs` column', () => {
                jest.spyOn(instance, 'renderKeyValuePairs');

                const { renderCell, renderKeyValuePairs } = instance;

                renderCell({ key: 'keyValuePairs' }, []);
                expect(instance.renderKeyValuePairs).toHaveBeenCalledWith([]);
            });
        });

        describe('renderKeyValuePairs', () => {
            const { renderKeyValuePairs } = wrapper.instance();

            it('should render one key-value pair as `${key}=${value}` inside a div', () => {
                const oneKeyValuePair = [{ signalKey: 'k', signalValue: 'v' }];

                expect(renderKeyValuePairs(oneKeyValuePair)).toMatchSnapshot();
            });
            it('should render two key-value pairs on separate lines', () => {
                const twoKeyValuePairs = [
                    { signalKey: 'k1', signalValue: 'v1' },
                    { signalKey: 'k2', signalValue: 'v2' },
                ];

                expect(renderKeyValuePairs(twoKeyValuePairs)).toMatchSnapshot();
            });
        });
    });
});
