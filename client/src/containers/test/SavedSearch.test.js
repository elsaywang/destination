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
                    signalKey: 'k-monitor',
                    operator: '>',
                    signalValue: 'v-programming',
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
    const wrapper = shallow(<SavedSearch list={list} getSavedSearch={mockFn} />);

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
