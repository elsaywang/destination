import React from 'react';
import { shallow } from 'enzyme';
import Warning from '../Warning';
import WarningMessage from '../WarningMessage';
import { SignalsSelectionWarning } from '../WarningTemplates';
import Alert from '@react/react-spectrum/Icon/Alert';

describe('<Warning/> component', () => {
    describe('rendering when it does not contain any children component', () => {
        const wrapper = shallow(<Warning />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders `warning` <Alert/> icon with size=`S`', () => {
            expect(wrapper.find(Alert).exists()).toBe(true);
            expect(wrapper.find(Alert).props().size).toEqual('S');
            expect(wrapper.find(Alert).props().variant).toEqual('warning');
        });
    });

    describe('rendering when it includes <WarningMessage/> as children component', () => {
        const { content } = 'there is a warning';
        const wrapper = shallow(
            <Warning>
                <WarningMessage {...content} />
            </Warning>,
        );

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <WarningMessage /> component with correct `content` props', () => {
            expect(wrapper.find(WarningMessage).exists()).toBe(true);
            expect(wrapper.find(WarningMessage).props().content).toEqual(content);
        });
    });

    describe('rendering when it includes <SignalsSelectionWarning/> as children component', () => {
        const { content } = 'there is a warning';
        const wrapper = shallow(
            <Warning>
                <SignalsSelectionWarning />
            </Warning>,
        );

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <SignalsSelectionWarning/> component ', () => {
            expect(wrapper.find(SignalsSelectionWarning).exists()).toBe(true);
        });
    });
});
