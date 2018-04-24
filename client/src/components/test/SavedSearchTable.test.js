import React, { Component } from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import SignalsTable from '../SignalsTable';
import Wait from '@react/react-spectrum/Wait';
import SavedSearchTable from '../SavedSearchTable';

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
                dataSourceId: 72599,
                reportSuiteId: null,
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
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('state changes based on lifecyle events', () => {
        it('re-render the <SavedSearchTable/> component with new state when no error', () => {
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
                        dataSourceId: 93561,
                        reportSuiteId: null,
                        sourceType: 'REALTIME',
                    },
                    totalCounts: 21456,
                    percentageChange: 0.154,
                    includedInTraits: [1, 2, 3],
                    signalStatus: 'USED',
                },
            };
            wrapper.setState({ ...newState });
            expect(wrapper).toMatchSnapshot();
        });

        it('re-render the <SavedSearchTable/> component with error state', () => {
            const errorState = {
                tableResults: {},
                error: 'There is error',
            };
            wrapper.setState({ ...errorState });
            expect(wrapper).toMatchSnapshot();
        });
    });
});
