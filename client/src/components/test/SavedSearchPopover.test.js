import React from 'react';
import { shallow } from 'enzyme';
import SavedSearchPopover from '../../components/SavedSearchPopover';
import { Tag } from '@react/react-spectrum/TagList';
import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';
import Popover from '@react/react-spectrum/Popover';
import { createShallowIntlComponent } from '../../lib/i18n/testHelpers';
import { formatSignal } from '../../utils/stringifySignals';
import { getSignalStatusLabel } from '../../constants/signalStatusOptions';
import { getSignalTypeLabel } from '../../constants/signalTypeOptions';

describe('<SavedSearchPopover /> component', () => {
    const search = {
        name: 'Loren Waters',
        keyValuePairs: [
            {
                key: 'k-Licensed',
                operator: '>=',
                value: 67425,
            },
            {
                key: 'k-Gorgeous Wooden Shirt',
                operator: '<=',
                value: 98396,
            },
        ],
        source: {
            dataSourceIds: [86195],
            reportSuiteIds: [],
            sourceType: 'REALTIME',
            categoryType: 'Real-Time',
        },
        minEventFires: 88991,
        signalStatus: 'USED',
        viewRecordsFor: '7D',
        sortBy: 'Key Value Pairs',
    };
    const wrapper = createShallowIntlComponent(
        <SavedSearchPopover
            onSavedSearchClick={jest.fn()}
            search={search}
            isCurrentSearch={false}
            deleteSearch={jest.fn()}
        />,
    ).dive();

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <OverlayTrigger /> with <Tag /> and <Popover /> children', () => {
            const overlayTrigger = wrapper.find(OverlayTrigger);

            expect(
                overlayTrigger.filter('[data-test="saved-search-overlay-trigger"]').exists(),
            ).toBe(true);
            expect(overlayTrigger.find(Tag).exists()).toBe(true);
            expect(
                overlayTrigger
                    .find(Popover)
                    .filter('[data-test="saved-search-popover"]')
                    .exists(),
            ).toBe(true);
        });

        it('renders <Tag /> with passed in search name', () => {
            const overlayTrigger = wrapper.find(OverlayTrigger);

            expect(overlayTrigger.find(Tag).props().value).toEqual(search.name);
        });
        it('renders <Tag /> with id value is null when isCurrentSearch props is false', () => {
            const overlayTrigger = wrapper.find(OverlayTrigger);

            expect(overlayTrigger.find(Tag).props().id).toEqual(null);
        });

        it('renders <Tag /> with id is `isCurrentSearch` when isCurrentSearch props is true', () => {
            wrapper.setProps({ isCurrentSearch: true });

            const overlayTrigger = wrapper.find(OverlayTrigger);

            expect(overlayTrigger.find(Tag).props().id).toEqual('isCurrentSearch');
        });

        it("renders <Popover /> containing user's saved search name", () => {
            expect(wrapper.find(Popover).contains(search.name)).toBe(true);
        });

        it("renders <Popover /> containing user's saved search signal status", () => {
            expect(wrapper.find(Popover).contains(getSignalStatusLabel(search.signalStatus))).toBe(
                true,
            );
        });

        it("renders <Popover /> containing user's saved search data type", () => {
            expect(wrapper.find(Popover).contains(search.source.categoryType)).toBe(true);
        });

        it("renders <Popover /> containing user's saved search source type", () => {
            expect(
                wrapper.find(Popover).contains(getSignalTypeLabel(search.source.sourceType)),
            ).toBe(true);
        });

        it("renders <Popover /> containing user's saved search 'view records for' setting", () => {
            expect(wrapper.find(Popover).contains('Last 7 Days')).toBe(true);
        });

        it("renders <Popover /> containing user's saved search custom date range setting, if selected", () => {
            const newSearch = {
                ...search,
                viewRecordsFor: 'custom',
                customStartDate: '2018-04-01',
                customEndDate: '2018-04-15',
            };
            const newWrapper = createShallowIntlComponent(
                <SavedSearchPopover
                    onSavedSearchClick={jest.fn()}
                    search={newSearch}
                    isCurrentSearch={false}
                    deleteSearch={jest.fn()}
                />,
            ).dive();

            expect(newWrapper.find(Popover).contains('April 1, 2018 to April 15, 2018')).toBe(true);
        });

        it("renders <Popover /> containing user's saved search sorting selection", () => {
            expect(wrapper.find(Popover).contains(search.sortBy)).toBe(true);
        });
    });
});
