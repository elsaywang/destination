import React from 'react';
import { shallow } from 'enzyme';
import SavedSearchTable from '../SavedSearchTable';
import EmptySearch from '../EmptySearch';
import fetch from '../../utils/fetch';

jest.mock('../../utils/fetch');
fetch.mockImplementation(() => ({ json: () => new Promise(res => ({})) }));

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
            error: false,
            hasSearched: false,
        };

        wrapper.setState({ ...newState });

        const initialWrapper = wrapper.dive();

        it('matches snapshot', () => {
            expect(initialWrapper).toMatchSnapshot();
        });

        it('does not render <SignalsTable>', () => {
            const signalsTable = initialWrapper.findWhere(
                node => node.props().dataTest === 'signals-table',
            );

            expect(signalsTable.exists()).toBeFalsy();
        });
    });

    describe('state changes based on lifecyle events without error', () => {
        const newState = {
            tableResults: {
                pid: 1194,
                startDate: 1530662400000,
                endDate: 1531332629645,
                list: [
                    {
                        keyValuePairs: [
                            {
                                key: 'evar18',
                                value: 'CMS18',
                            },
                        ],
                        source: {
                            dataSourceIds: null,
                            reportSuiteIds: null,
                            sourceType: null,
                        },
                        totalCount: 93859,
                        percentageChange: 0.27783491545226535,
                        includedInTraits: null,
                        signalStatus: 'UNUSED',
                    },
                ],
                pageSize: 20,
                page: 0,
                total: 20,
                analyticsServiceAvailable: true,
            },
            error: false,
            hasSearched: true,
        };

        wrapper.setState({ ...newState });
        const updatedWrapper = wrapper.dive();

        it('matches snapshot', () => {
            expect(updatedWrapper).toMatchSnapshot();
        });

        it('renders <SignalsTable />', () => {
            const signalsTable = updatedWrapper.findWhere(
                node => node.props().dataTest === 'signals-table',
            );

            expect(signalsTable.exists()).toBeTruthy();
        });
    });

    describe('state changes based on lifecyle events with error', () => {
        const errorState = {
            tableResults: {},
            error: true,
            hasSearched: true,
        };

        wrapper.setState({ ...errorState });

        const wrapperWithError = wrapper.dive();

        it('matches snapshot', () => {
            expect(wrapperWithError).toMatchSnapshot();
        });

        it('renders <EmptySearch /> with "errorFetching" variant', () => {
            expect(wrapper.find(EmptySearch).exists()).toBeTruthy();
            expect(wrapper.find(EmptySearch).props().variant).toBe('errorFetching');
        });

        it('does not render <SignalsTable/>', () => {
            const signalsTable = wrapperWithError.findWhere(
                node => node.props().dataTest === 'signals-table',
            );

            expect(signalsTable.exists()).toBeFalsy();
        });
    });
});
