import React from 'react';
import { shallow } from 'enzyme';
import EditAction from '../EditAction';
import Button from '@react/react-spectrum/Button';

describe('<EditAction/> component', () => {
    describe('rendering', () => {
        const mockFn = jest.fn();
        const props = {
            disabled: false,
            destination: {
                id: 20008,
                name: 'card',
            },
        };
        const wrapper = shallow(<EditAction {...props} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders  <Button/> ', () => {
            expect(wrapper.find(Button).exists()).toBeTruthy();
        });
    });
});
