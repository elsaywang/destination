import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import DashboardContainer from '../DashboardContainer';
import SavedSearchTable from '../../components/SavedSearchTable';
import configureStore from '../../configureStore';
import Heading from '@react/react-spectrum/Heading';
import Button from '@react/react-spectrum/Button';
import Well from '@react/react-spectrum/Well';

describe('<DashboardContainer /> component', () => {
    const store = configureStore();
    const wrapper = shallow(
        <Provider store={store}>
            <DashboardContainer />
        </Provider>,
    )
        .dive({ context: { store } })
        .dive();

    describe('rendering', () => {
        describe('when savedSearch prop with no records passed in ', () => {
            beforeAll(() => {
                wrapper.setProps({
                    savedSearch: [],
                });
            });

            it('matches snapshot', () => {
                expect(wrapper).toMatchSnapshot();
            });

            it('does not render any <Well/> component', () => {
                expect(wrapper.find(Well).exists()).toBeFalsy();
            });

            it('does not render any <Heading /> component', () => {
                expect(wrapper.find(Heading).exists()).toBeFalsy();
            });

            it('does not render any <Button /> component', () => {
                expect(wrapper.find(Button).exists()).toBeFalsy();
            });

            it('does not render any <SavedSearchTable/> component', () => {
                expect(wrapper.find(SavedSearchTable).exists()).toBeFalsy();
            });
        });
    });

    describe('when savedSearch with records is passed in as a prop', () => {
        beforeAll(() => {
            wrapper.setProps({
                savedSearch: [
                    {
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
                            dataSourceId: 72599,
                            reportSuiteId: null,
                            sourceType: 'REALTIME',
                        },
                        minEventFires: 46276,
                        signalStatus: 'USED',
                        startDate: '2018-04-22T20:41:09.693Z',
                        endDate: '2018-04-23T10:37:26.452Z',
                    },
                    {
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
                            dataSourceId: 72599,
                            reportSuiteId: null,
                            sourceType: 'REALTIME',
                        },
                        minEventFires: 46276,
                        signalStatus: 'USED',
                        startDate: '2018-04-22T20:41:09.693Z',
                        endDate: '2018-04-23T10:37:26.452Z',
                    },
                ],
                populateSearchFields: jest.fn(),
                callSearch: jest.fn(),
            });
        });

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders the same number of <Well/> components as savedSearch props length', () => {
            expect(wrapper.find(Well).exists()).toBeTruthy();
            expect(wrapper.find(Well)).toHaveLength(wrapper.instance().props.savedSearch.length);
        });

        it('renders the same number of <Heading/> components as savedSearch props length', () => {
            expect(wrapper.find(Heading).exists()).toBeTruthy();
            expect(wrapper.find(Heading)).toHaveLength(wrapper.instance().props.savedSearch.length);
        });

        it('renders the same number of <Button/> components as savedSearch props length', () => {
            expect(wrapper.find(Button).exists()).toBeTruthy();
            expect(wrapper.find(Button)).toHaveLength(wrapper.instance().props.savedSearch.length);
        });

        it('renders the same number of <SavedSearchTable/> components as savedSearch props length', () => {
            expect(wrapper.find(SavedSearchTable).exists()).toBeTruthy();
            expect(wrapper.find(SavedSearchTable)).toHaveLength(
                wrapper.instance().props.savedSearch.length,
            );
        });

        it('.handleViewMoreForSavedSearch() is called on the first saved search table', () => {
            const wrapperInstance = wrapper.instance();
            const firstSavedSearch = wrapperInstance.props.savedSearch[0];
            const spyOnClick = jest.spyOn(wrapperInstance, 'handleViewMoreForSavedSearch');
            wrapper
                .find(Button)
                .at(0)
                .simulate('click', firstSavedSearch);
            expect(spyOnClick).toHaveBeenCalled();
            expect(wrapperInstance.props.populateSearchFields).toHaveBeenCalled();
            expect(wrapperInstance.props.callSearch).toHaveBeenCalled();
        });
    });
});
