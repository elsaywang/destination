import React from 'react';
import { shallow } from 'enzyme';
import { TraitsCreationWarning } from '../TraitsCreationWarning';
import Warning from '../../components/common/Warning';
import { SignalsSelectionWarningMessage } from '../../components/common/Warning/WarningTemplates';

describe('<TraitsCreationWarning/> component', () => {
    describe('rendering when there is no signal selected', () => {
        const initialprops = {
            selectedSignals: {
                selectionMessage: '',
                records: [],
                hasWarning: false,
            },
        };
        const { hasWarning } = initialprops.selectedSignals;
        const wrapper = shallow(<TraitsCreationWarning hasWarning={hasWarning} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders null element', () => {
            expect(wrapper.getElement()).toBe(null);
        });
    });

    describe('rendering when there are signals selected but without warning', () => {
        const props = {
            selectedSignals: {
                selectionMessage: '1 Real-time signal selected ',
                records: [{ rowIndex: 0, signalType: 'Adobe Analytics' }],
                hasWarning: false,
            },
        };
        const { hasWarning } = props.selectedSignals;
        const wrapper = shallow(<TraitsCreationWarning hasWarning={hasWarning} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders null element', () => {
            expect(wrapper.getElement()).toBe(null);
        });
    });

    describe('rendering when there are signals selected with warning', () => {
        const props = {
            selectedSignals: {
                selectionMessage: '1 Onboarded , 1 Real-time are selected',
                records: [
                    { rowIndex: 0, signalType: 'Adobe Analytics' },
                    { rowIndex: 4, signalType: 'Onboarded Records' },
                ],
                hasWarning: true,
            },
        };
        const { hasWarning } = props.selectedSignals;
        const wrapper = shallow(<TraitsCreationWarning hasWarning={hasWarning} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Warning/> component with <SignalsSelectionWarningMessage/> template', () => {
            expect(wrapper.find(Warning).exists()).toBe(true);
            expect(wrapper.find(SignalsSelectionWarningMessage).exists()).toBe(true);
        });
    });
});
