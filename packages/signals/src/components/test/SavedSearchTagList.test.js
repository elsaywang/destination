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
            totalCount: 59925,
            includedTraits: [0, 1, 2],
            signalStatus: 'USED',
            viewRecordsFor: '7D',
            customStartDate: '2018-04-24',
            customEndDate: '2018-05-01',
        },
    ];
    const currentSearch = {
        name: 'Watson Cartwright',
    };
    const wrapper = shallow(
        <SavedSearchTagList
            list={list}
            onSavedSearchClick={mockFn}
            deleteSearch={mockFn}
            currentSearch={currentSearch.name}
            disabled={false}
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
