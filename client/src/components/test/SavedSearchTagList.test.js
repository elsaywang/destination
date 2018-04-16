import React from 'react';
import { shallow } from 'enzyme';
import SavedSearchTagList from '../../components/SavedSearchTagList';
import { TagList, Tag } from '@react/react-spectrum/TagList';
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
    const wrapper = shallow(<SavedSearchTagList list={list} onSavedSearchClick={mockFn} />);

    describe('rendering', () => {
        it('renders <TagList /> with a list of <Tag /> rendered according to the list passed in', () => {
            const tagList = wrapper.find(TagList);

            expect(tagList.filter('[data-test="saved-search-tag-list"]').exists()).toBe(true);
            expect(tagList.find(Tag).length).toBe(list.length);
            expect(tagList.findWhere(tag => tag.props().value === list[0].name).exists()).toBe(
                true,
            );
        });
    });
});
