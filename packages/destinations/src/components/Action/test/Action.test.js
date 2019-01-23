import React from 'react';
import { shallow } from 'enzyme';
import Action from '../Action';
import DeleteAction from '../DeleteAction';
import EditAction from '../EditAction';
import MetricsView from '../MetricsView';

describe('<Action/> component', () => {
    describe('rendering', () => {
        const mockFn = jest.fn();
        const props = {
            disabled: false,
            destination: {
                id: 20008,
                name: 'card',
            },
            showMetrics: false,
        };
        const wrapper = shallow(<Action {...props} />);

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
    });
});
