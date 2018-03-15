import React from 'react';
import { shallow } from 'enzyme';
import { columnKeys } from '../../constants/columns';
import SignalsTable from '../SignalsTable';
import Table from '../../components/common/Table';

describe('<SignalsTable /> component', () => {
    const wrapper = shallow(<SignalsTable items={[]} signalType="all" />);

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
            keyValuePair,
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

            expect(actualAllSignalsColumnsIncludes(keyValuePair)).toBeTruthy();
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

            expect(actualAnalyticsColumnsIncludes(keyValuePair)).toBeTruthy();
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

            expect(actualAdvancedAnalyticsColumnsIncludes(keyValuePair)).toBeTruthy();
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

            expect(actualActionableLogFilesColumnsIncludes(keyValuePair)).toBeTruthy();
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

            expect(actualGeneralOnlineDataColumnsIncludes(keyValuePair)).toBeTruthy();
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

            expect(actualOnboardedRecordsColumnsIncludes(keyValuePair)).toBeTruthy();
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
});
