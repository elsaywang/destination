import React from 'react';
import { shallow } from 'enzyme';
import Heading from '@react/react-spectrum/Heading';
import SavedSearch from '../SavedSearch';
import SavedSearchTagList from '../../components/SavedSearchTagList';
import withLoadingSpinner from '../../components/withLoadingSpinner';

describe('<SavedSearch /> component', () => {
    const mockFn = jest.fn();
    const list = [
        {
            id: 17966,
            name: 'Germaine Wiza',
            keyValuePairs: [
                {
                    key: 'k-monitor',
                    operator: '>',
                    value: 'v-programming',
                },
            ],
            type: 'Lek',
            source: 'Buckinghamshire',
            totalCounts: 59925,
            percentageChange: 45886,
            includedTraits: [0, 1, 2],
            signalStatus: 'USED',
        },
    ];
    const currentSearch = {
        name: 'Watson Cartwright',
        keyValuePairs: [
            {
                key: 'k-Coves',
                operator: '<',
                value: 24330,
            },
        ],
        source: {
            dataSourceId: 64915,
            reportSuiteId: null,
            sourceType: 'REALTIME',
            dataType: 'Real-Time',
        },
        minEventFires: 42193,
        signalStatus: 'USED',
        startDate: '2018-04-27T07:59:20.448Z',
        endDate: '2018-04-26T19:25:16.587Z',
        sorting: 'Total Event Fires',
    };
    const wrapper = shallow(
        <SavedSearch
            list={list}
            getSavedSearch={mockFn}
            onSavedSearchClick={mockFn}
            currentSearch={currentSearch}
        />,
    );

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders saved search div', () => {
            expect(wrapper.find('[data-test="saved-search"]').exists()).toBe(true);
        });

        it('renders <Heading />', () => {
            expect(wrapper.find(Heading).exists()).toBe(true);
        });
    });
});
