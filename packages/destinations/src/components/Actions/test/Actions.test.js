import React from 'react';
import { shallow } from 'enzyme';
import Actions from '../Actions';
import DeleteAction from '../DeleteAction';
import EditAction from '../EditAction';
import MetricsView from '../MetricsView';
import Activation from '../Activation';

describe('<Actions/> component', () => {
    describe('rendering when `isForDestination` ', () => {
        const mockFn = jest.fn();
        const props = {
            disabled: false,
            destination: {
                id: 20008,
                name: 'card',
                destinationType: 'PEOPLE_BASED',
                shareableAudience: 909,
            },
            showMetrics: false,
            isForDestination: true,
        };

        const wrapper = shallow(<Actions {...props} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders only <DeleteAction/> and <EditAction/> if `showMetrics` prop is false', () => {
            expect(wrapper.find(DeleteAction).exists()).toBeTruthy();
            expect(wrapper.find(EditAction).exists()).toBeTruthy();
            expect(wrapper.find(MetricsView).exists()).toBeFalsy();
        });

        it('renders  <DeleteAction/>, <EditAction/> and <MetricsView/> if `showMetrics` prop is true', () => {
            wrapper.setProps({ showMetrics: true });
            expect(wrapper.find(DeleteAction).exists()).toBeTruthy();
            expect(wrapper.find(EditAction).exists()).toBeTruthy();
            expect(wrapper.find(MetricsView).exists()).toBeTruthy();
        });

        it('should not render <Activation/> as `isForDestination` is true', () => {
            expect(wrapper.find(Activation).exists()).toBeFalsy();
        });
    });

    describe('rendering when `isForDestination` is false', () => {
        const mockFn = jest.fn();
        const props = {
            disabled: false,
            authentication: {
                adAccountId: '1',
                accountName: 'test',
                expireIn: 'Expired',
            },
            isForDestination: false,
        };
        const wrapper = shallow(<Actions {...props} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders only <DeleteAction/> and <Activation/> if `isForDestination` prop is false', () => {
            expect(wrapper.find(DeleteAction).exists()).toBeTruthy();
            expect(wrapper.find(Activation).exists()).toBeTruthy();
        });

        it('should not render <EditAction/> and <MetricsView/> ', () => {
            expect(wrapper.find(EditAction).exists()).toBeFalsy();
            expect(wrapper.find(MetricsView).exists()).toBeFalsy();
        });
    });
});
