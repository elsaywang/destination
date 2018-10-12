import React from 'react';
import { shallow } from 'enzyme';
import SavedSearchPopover from '../../components/SavedSearchPopover';
import { Tag } from '@react/react-spectrum/TagList';
import OverlayTrigger from '@react/react-spectrum/OverlayTrigger';
import Popover from '@react/react-spectrum/Popover';
import FieldLabel from '@react/react-spectrum/FieldLabel';
import { createShallowIntlComponent } from '../../lib/i18n/testHelpers';
import { getSignalStatusLabel } from '../../constants/signalStatusOptions';
import { getSignalTypeLabel } from '../../constants/signalTypeOptions';
import { getSignalCategory } from '../../constants/signalCategoryOptions';
import { getSortLabel } from '../../constants/sortOptions';

describe('<SavedSearchPopover /> component', () => {
    describe('rendering', () => {
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
                    value: 98397,
                },
            ],
            source: {
                dataSourceIds: [],
                reportSuiteIds: [],
                sourceType: null,
            },
            minEventFires: 88991,
            signalStatus: 'USED',
            viewRecordsFor: '7D',
            sortBy: 'keyValuePairs',
        };
        const wrapper = createShallowIntlComponent(
            <SavedSearchPopover
                onSavedSearchClick={jest.fn()}
                search={search}
                isCurrentSearch={false}
                deleteSearch={jest.fn()}
                disabled={false}
            />,
        ).dive();

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

        it('renders disabled <Tag />  when disabled props is true', () => {
            wrapper.setProps({ disabled: true });

            const overlayTrigger = wrapper.find(OverlayTrigger);

            expect(overlayTrigger.find(Tag).props().disabled).toBe(true);
        });
        describe('renders <Popover />', () => {
            it("contains user's saved search name", () => {
                expect(wrapper.find(Popover).contains(search.name)).toBe(true);
            });

            it("contains user's saved search signal status", () => {
                expect(
                    wrapper.find(Popover).contains(getSignalStatusLabel(search.signalStatus)),
                ).toBe(true);
            });

            it("contains user's saved search signal category type", () => {
                expect(
                    wrapper.find(Popover).contains(getSignalCategory(search.source.sourceType)),
                ).toBe(true);
            });

            it("does not contain user's saved search signal source type if signal source is null", () => {
                expect(
                    wrapper.find(Popover).contains(getSignalTypeLabel(search.source.sourceType)),
                ).toBe(false);
            });

            it("contains user's saved search signal category, signal type, 'Report Suite', and name if signal source is 'ANALYTICS'", () => {
                const newSearch = {
                    ...search,
                    source: {
                        name: 'Test Report Suite',
                        dataSourceIds: [],
                        reportSuiteIds: [1],
                        sourceType: 'ANALYTICS',
                    },
                };
                const newWrapper = createShallowIntlComponent(
                    <SavedSearchPopover
                        onSavedSearchClick={jest.fn()}
                        search={newSearch}
                        isCurrentSearch={false}
                        deleteSearch={jest.fn()}
                    />,
                ).dive();

                expect(
                    newWrapper
                        .find(FieldLabel)
                        .filterWhere(node => node.props().label === 'Signal Category').length,
                ).toEqual(1);
                expect(
                    newWrapper
                        .find(Popover)
                        .contains(getSignalTypeLabel(newSearch.source.sourceType)),
                ).toBe(true);
                expect(
                    newWrapper
                        .find(FieldLabel)
                        .filterWhere(node => node.props().label === 'Report Suite').length,
                ).toEqual(1);
                expect(newWrapper.find(Popover).contains(newSearch.source.name)).toBe(true);
            });

            it("contains user's saved search signal category, signal type, 'Onboarded Record', and name if signal source is 'ANALYTICS'", () => {
                const newSearch = {
                    ...search,
                    source: {
                        name: 'Onboarded',
                        dataSourceIds: [1],
                        reportSuiteIds: [],
                        sourceType: 'ANALYTICS',
                    },
                };
                const newWrapper = createShallowIntlComponent(
                    <SavedSearchPopover
                        onSavedSearchClick={jest.fn()}
                        search={newSearch}
                        isCurrentSearch={false}
                        deleteSearch={jest.fn()}
                    />,
                ).dive();

                expect(
                    newWrapper
                        .find(FieldLabel)
                        .filterWhere(node => node.props().label === 'Signal Category').length,
                ).toEqual(1);
                expect(
                    newWrapper
                        .find(Popover)
                        .contains(getSignalTypeLabel(newSearch.source.sourceType)),
                ).toBe(true);
                expect(
                    newWrapper
                        .find(FieldLabel)
                        .filterWhere(node => node.props().label === 'Onboarded Record').length,
                ).toEqual(1);
                expect(
                    newWrapper.find(Popover).contains(getSignalTypeLabel(newSearch.source.name)),
                );
            });

            it("contains user's saved search 'view records for' setting", () => {
                expect(wrapper.find(Popover).contains('Last 7 Days')).toBe(true);
            });

            it("contains user's saved search custom date range setting, if selected", () => {
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

                expect(newWrapper.find(Popover).contains('April 1, 2018 to April 15, 2018')).toBe(
                    true,
                );
            });

            it("contains user's saved search sorting selection", () => {
                expect(wrapper.find(Popover).contains(getSortLabel(search.sortBy))).toBe(true);
            });
        });
    });

    describe('canDelete', () => {
        const search = {
            name: 'Loren Waters',
            keyValuePairs: [
                {
                    key: 'k-Licensed',
                    operator: '>=',
                    value: 67425,
                },
            ],
            source: {
                dataSourceIds: [],
                reportSuiteIds: [],
                sourceType: null,
            },
            minEventFires: 88991,
            signalStatus: 'USED',
            viewRecordsFor: '7D',
            sortBy: 'keyValuePairs',
        };

        it('should return true if the saved search is selected and not a preset', () => {
            const wrapper = createShallowIntlComponent(
                <SavedSearchPopover
                    onSavedSearchClick={jest.fn()}
                    search={search}
                    isCurrentSearch={true}
                    deleteSearch={jest.fn()}
                />,
            ).dive();

            expect(wrapper.instance().canDelete()).toBe(true);
        });

        it('should return false if the saved search is selected and a preset', () => {
            const searchPreset = {
                ...search,
                presetId: 'top-unused-signals',
            };

            const wrapper = createShallowIntlComponent(
                <SavedSearchPopover
                    onSavedSearchClick={jest.fn()}
                    search={searchPreset}
                    isCurrentSearch={true}
                    deleteSearch={jest.fn()}
                />,
            ).dive();

            expect(wrapper.instance().canDelete()).toBe(false);
        });

        it('should return false if the saved search is not selected', () => {
            const wrapper = createShallowIntlComponent(
                <SavedSearchPopover
                    onSavedSearchClick={jest.fn()}
                    search={search}
                    isCurrentSearch={false}
                    deleteSearch={jest.fn()}
                />,
            ).dive();

            expect(wrapper.instance().canDelete()).toBe(false);
        });
    });
});
