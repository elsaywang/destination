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
            totalCount: 59925,
            percentageChange: 45886,
            includedTraits: [0, 1, 2],
            signalStatus: 'USED',
        },
    ];
    const currentSearch = {
        name: 'Watson Cartwright',
    };
    const wrapper = shallow(
        <SavedSearch
            list={list}
            getSavedSearch={mockFn}
            onSavedSearchClick={mockFn}
            currentSearch={currentSearch.name}
            deleteSearch={mockFn}
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
