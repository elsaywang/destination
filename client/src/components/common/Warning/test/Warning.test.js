import React from 'react';
import { shallow } from 'enzyme';
import Warning from '../Warning';
import WarningMessage from '../WarningMessage';
import { SignalsSelectionWarningMessage } from '../WarningTemplates';
import Alert from '@react/react-spectrum/Icon/Alert';

describe('<Warning/> component', () => {
    describe('rendering when it does not contain any children component', () => {
        const wrapper = shallow(<Warning />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders `warning` <Alert/> icon with size=`S`', () => {
            expect(wrapper.find(Alert).exists()).toBeTruthy();
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
            expect(wrapper.find(WarningMessage).exists()).toBeTruthy();
            expect(wrapper.find(WarningMessage).props().content).toEqual(content);
        });
    });

    describe('rendering when it includes <SignalsSelectionWarningMessage/> as children component', () => {
        const { content } = 'there is a warning';
        const wrapper = shallow(
            <Warning>
                <SignalsSelectionWarningMessage />
            </Warning>,
        );

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <SignalsSelectionWarningMessage/> component ', () => {
            expect(wrapper.find(SignalsSelectionWarningMessage).exists()).toBeTruthy();
        });
    });
});
