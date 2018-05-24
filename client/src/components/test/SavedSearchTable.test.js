import React, { Component } from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import SignalsTable from '../SignalsTable';
import SavedSearchTable from '../SavedSearchTable';
import Wait from '@react/react-spectrum/Wait';
import withLoadingSpinner from '../withLoadingSpinner';

describe('<SavedSearchTable/> component', () => {
    const mockFn = jest.fn();
    const props = {
        savedSearch: {
            name: "Margot O'Hara",
            keyValuePairs: [
                {
                    key: 'k-user-centric',
                    operator: '>=',
                    value: 31399,
                    id: 0,
                },
            ],
            source: {
                dataSourceIds: 72599,
                reportSuiteIds: null,
                sourceType: 'REALTIME',
            },
            minEventFires: 46276,
            signalStatus: 'USED',
            startDate: '2018-04-22T20:41:09.693Z',
            endDate: '2018-04-23T10:37:26.452Z',
        },
        isAdvancedSearchEnabled: false,
        allowsSelection: false,
    };

    const wrapper = shallow(<SavedSearchTable {...props} getResultsBySavedSearch={mockFn} />);

    describe('rendering', () => {
        const newState = {
            tableResults: {},
        };
        wrapper.setState({ ...newState });

        const initialWrapper = wrapper.dive();
        it('matches snapshot', () => {
            expect(initialWrapper).toMatchSnapshot();
        });

        it('renders <Wait/> spinner', () => {
            expect(initialWrapper.find(Wait).exists()).toBeTruthy();
        });

        it('does not render <SignalsTable>', () => {
            expect(initialWrapper.find(SignalsTable).exists()).toBeFalsy();
        });
    });

    describe('state changes based on lifecyle events without error', () => {
        const newState = {
            tableResults: {
                keyValuePairs: [
                    {
                        key: 'k-regional',
                        operator: '<',
                        value: 57091,
                    },
                ],
                source: {
                    dataSourceIds: 93561,
                    reportSuiteIds: null,
                    sourceType: 'REALTIME',
                },
                totalCount: 21456,
                percentageChange: 0.154,
                includedInTraits: [1, 2, 3],
                signalStatus: 'USED',
            },
        };
        wrapper.setState({ ...newState });
        const updatedWrapper = wrapper.dive();

        it('matches snapshot', () => {
            expect(updatedWrapper).toMatchSnapshot();
        });

        it('does not render <Wait/> spinner', () => {
            expect(updatedWrapper.find(Wait).exists()).toBeFalsy();
        });

        it('renders <SignalsTable/>', () => {
            expect(updatedWrapper.find(SignalsTable).exists()).toBeTruthy();
        });
    });

    describe('state changes based on lifecyle events with error', () => {
        const errorState = {
            tableResults: {},
            error: 'There is error',
        };
        wrapper.setState({ ...errorState });
        const wrapperWithError = wrapper.dive();
        it('matches snapshot', () => {
            expect(wrapperWithError).toMatchSnapshot();
        });

        it('renders <Wait/> spinner', () => {
            expect(wrapperWithError.find(Wait).exists()).toBeTruthy();
        });

        it('does not render <SignalsTable/>', () => {
            expect(wrapperWithError.find(SignalsTable).exists()).toBeFalsy();
        });
    });
});
