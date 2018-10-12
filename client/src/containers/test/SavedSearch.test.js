import React from 'react';
import { shallow } from 'enzyme';
import Heading from '@react/react-spectrum/Heading';
import SavedSearch from '../SavedSearch';
import SavedSearchTagList from '../../components/SavedSearchTagList';
import withLoadingSpinner from '../../components/withLoadingSpinner';
import InlineErrorMessage from '../../components/common/InlineErrorMessage';

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
            includedTraits: [0, 1, 2],
            signalStatus: 'USED',
        },
    ];
    const currentSearch = {
        name: 'Watson Cartwright',
    };
    const error = {
        hasError: false,
        errorMessage: '',
    };
    const wrapper = shallow(
        <SavedSearch
            list={list}
            getSavedSearch={mockFn}
            onSavedSearchClick={mockFn}
            currentSearch={currentSearch.name}
            deleteSearch={mockFn}
            error={error}
            disabled={false}
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

        it('renders <InlineErrorMessage /> instead of saved search tags when there is an error retrieving saved searches', () => {
            wrapper.setProps({
                error: {
                    hasError: true,
                    errorMessage: 'Error!',
                },
            });

            expect(wrapper.find(InlineErrorMessage).exists()).toBe(true);
        });
        it('renders disabled wrapped saved search tag list when when disabled props set to true', () => {
            wrapper.setProps({
                disabled: true,
                error,
                isLoaded: true,
            });
            expect(wrapper.find('[data-test="wrapped-saved-search-tag-list"]').exists()).toBe(true);
            expect(
                wrapper.find('[data-test="wrapped-saved-search-tag-list"]').is('[disabled]'),
            ).toBe(true);
        });
    });
});
