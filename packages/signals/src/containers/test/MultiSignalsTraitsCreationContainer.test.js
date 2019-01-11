import React from 'react';
import { shallow } from 'enzyme';
import { MultiSignalsTraitsCreationContainer } from '../MultiSignalsTraitsCreationContainer';
import TraitsCreation from '../../components/common/TraitsCreation';

describe('<MultiSignalsTraitsCreationContainer/> component', () => {
    describe('rendering when there is no signal selected', () => {
        const mockFn = jest.fn();
        const initialprops = {
            selectedSignals: {
                selectionMessage: '',
                hasSignalSelectionsTypeWarning: false,
                selectedRowIndexes: [],
            },
        };
        const wrapper = shallow(<MultiSignalsTraitsCreationContainer {...initialprops} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders null element', () => {
            expect(wrapper.getElement()).toBe(null);
        });
    });

    describe('rendering when there are signals selected', () => {
        const props = {
            selectedSignals: {
                selectionMessage: '1 Real-time signal selected ',
                hasSignalSelectionsTypeWarning: false,
                selectedRowIndexes: [0],
            },
        };
        const wrapper = shallow(<MultiSignalsTraitsCreationContainer {...props} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <TraitsCreation/> component', () => {
            expect(wrapper.find(TraitsCreation).exists()).toBe(true);
        });

        it('<TraitsCreation/> is in `Multi-Signals Traits Creation` mode', () => {
            expect(wrapper.find(TraitsCreation).props().multiCreation).toBe(true);
        });

        it('<TraitsCreation/> passes props `selectedSignals`', () => {
            expect(wrapper.find(TraitsCreation).props().selectedSignals).toMatchObject(
                props.selectedSignals,
            );
        });

        it('<TraitsCreation/> passes props `categoryType`', () => {
            expect(wrapper.find(TraitsCreation).props().selectedSignals).toMatchObject(
                props.selectedSignals,
            );
        });
    });
});
