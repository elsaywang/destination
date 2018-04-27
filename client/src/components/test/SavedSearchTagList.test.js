import React from 'react';
import { shallow } from 'enzyme';
import SavedSearchTagList from '../../components/SavedSearchTagList';
import { TagList } from '@react/react-spectrum/TagList';
import SavedSearchPopover from '../../components/SavedSearchPopover';
import Heading from '@react/react-spectrum/Heading';

describe('<SavedSearchTagList /> component', () => {
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
        <SavedSearchTagList
            list={list}
            onSavedSearchClick={mockFn}
            currentSearch={currentSearch}
        />,
    );

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <TagList /> with a list of <Tag /> rendered according to the list passed in', () => {
            const tagList = wrapper.find(TagList);

            expect(tagList.filter('[data-test="saved-search-tag-list"]').exists()).toBe(true);
            expect(tagList.find(SavedSearchPopover).length).toBe(list.length);
        });
    });
});
