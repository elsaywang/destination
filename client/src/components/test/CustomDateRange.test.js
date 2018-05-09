import React from 'react';
import mockdate from 'mockdate';
import { shallow } from 'enzyme';
import CustomDateRange from '../CustomDateRange';
import Datepicker from '@react/react-spectrum/Datepicker';

describe('<CustomDateRange /> component', () => {
    const mockFn = jest.fn();

    const wrapper = shallow(
        <CustomDateRange
            customStartDate="2018-04-24"
            customEndDate="2018-05-01"
            onCustomStartDateChange={mockFn}
            onCustomEndDateChange={mockFn}
        />,
    );

    beforeEach(() => {
        mockdate.set(1525176000000); // Mon May 01 2018 12:00:00 GMT+0000 (GMT)
    });

    afterEach(() => {
        mockdate.reset();
    });

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders custom start and end date <Datepicker /> components', () => {
            expect(wrapper.find(Datepicker).length).toEqual(2);
        });
    });
});
