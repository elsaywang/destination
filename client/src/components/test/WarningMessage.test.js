import React from 'react';
import { shallow } from 'enzyme';
import Alert from '@react/react-spectrum/Icon/Alert';
import { WarningMessage, messageBodyTemplateMapping } from '../WarningMessage';

describe('<WarningMessage/> component', () => {
    const wrapper = shallow(<WarningMessage />);

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Alert/> icon', () => {
            expect(wrapper.find(Alert).exists()).toBe(true);
        });

        it('renders the correct warning message body in span based on `warningType` in props ', () => {
            wrapper.setProps({ warningType: 'signalsSelection' });
            const messageBody = messageBodyTemplateMapping['signalsSelection'];
            expect(wrapper.containsMatchingElement(messageBody)).toBeTruthy();
        });
    });
});
