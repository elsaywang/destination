import React from 'react';
import { shallow } from 'enzyme';
import Add from '@react/react-spectrum/Icon/Add';
import Link from '@react/react-spectrum/Link';
import SingleSignalTraitsCreation from '../SingleSignalTraitsCreation';

describe('<SingleSignalTraitsCreation/> component', () => {
    const mockFn = jest.fn();
    const props = {
        traitsCreationLabelText: 'Create Rule-Based Trait',
    };
    const wrapper = shallow(<SingleSignalTraitsCreation {...props} />);

    it('matches the snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
    it('includes <Add/> icon with size=`S`', () => {
        expect(wrapper.find(Add).exists()).toBe(true);
        expect(wrapper.find(Add).props().size).toEqual('S');
    });
    it('renders the correct text passed from `traitsCreationLabelText` prop in a <div/>', () => {
        expect(
            wrapper.containsMatchingElement(<div>{props.traitsCreationLabelText}</div>),
        ).toBeTruthy();
    });
});
