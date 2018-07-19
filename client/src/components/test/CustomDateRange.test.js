import React from 'react';
import mockdate from 'mockdate';
import { shallow } from 'enzyme';
import CustomDateRange from '../CustomDateRange';
import Datepicker from '@react/react-spectrum/Datepicker';

describe('<CustomDateRange /> component', () => {
    const mockFn = jest.fn();

    beforeEach(() => {
        mockdate.set(1525176000000); // Mon May 01 2018 12:00:00 GMT+0000 (GMT)
    });

    afterEach(() => {
        mockdate.reset();
    });

    describe('rendering', () => {
        it('matches snapshot', () => {
            const wrapper = shallow(
                <CustomDateRange
                    customStartDate="2018-04-24"
                    customEndDate="2018-05-01"
                    onCustomStartDateChange={mockFn}
                    onCustomEndDateChange={mockFn}
                    minCustomStartDateDaysAgo={30}
                />,
            );

            expect(wrapper).toMatchSnapshot();
        });

        it('renders custom start and end date <Datepicker /> components', () => {
            const wrapper = shallow(
                <CustomDateRange
                    customStartDate="2018-04-24"
                    customEndDate="2018-05-01"
                    minCustomStartDateDaysAgo={30}
                />,
            );

            expect(wrapper.find(Datepicker).length).toEqual(2);
        });
    });

    describe('handleCustomStartDateChange', () => {
        it('should call `onCustomStartDateChange` with the selected date formatted as YYYY-MM-DD', () => {
            const mockOnCustomStartDateChange = jest.fn();

            const wrapper = shallow(
                <CustomDateRange
                    customStartDate="2018-04-24"
                    customEndDate="2018-05-01"
                    onCustomStartDateChange={mockOnCustomStartDateChange}
                    minCustomStartDateDaysAgo={30}
                />,
            );

            wrapper.instance().handleCustomStartDateChange('04/28/18');

            expect(mockOnCustomStartDateChange).toHaveBeenCalledWith('2018-04-28');
        });
    });

    describe('handleCustomEndDateChange', () => {
        it('should call `onCustomEndDateChange` with the selected date formatted as YYYY-MM-DD', () => {
            const mockOnCustomEndDateChange = jest.fn();

            const wrapper = shallow(
                <CustomDateRange
                    customStartDate="2018-04-24"
                    customEndDate="2018-05-01"
                    onCustomEndDateChange={mockOnCustomEndDateChange}
                    minCustomStartDateDaysAgo={30}
                />,
            );

            wrapper.instance().handleCustomEndDateChange('04/29/18');

            expect(mockOnCustomEndDateChange).toHaveBeenCalledWith('2018-04-29');
        });
    });

    describe('getMinCustomStartDate', () => {
        it('should be `minCustomStartDateDaysAgo` days ago in UTC', () => {
            const wrapper = shallow(
                <CustomDateRange
                    customStartDate="2018-04-24"
                    customEndDate="2018-05-01"
                    minCustomStartDateDaysAgo={180}
                />,
            );
            const actual = wrapper.instance().getMinCustomStartDate();
            const expected = '2017-11-02';

            expect(actual).toEqual(expected);
        });
    });

    describe('getMaxCustomStartDate', () => {
        it('should default to 1 day ago in UTC', () => {
            const wrapper = shallow(
                <CustomDateRange
                    customStartDate="2018-04-24"
                    customEndDate="2018-05-01"
                    minCustomStartDateDaysAgo={30}
                />,
            );
            const actual = wrapper.instance().getMaxCustomStartDate();
            const expected = '2018-04-30';

            expect(actual).toEqual(expected);
        });

        it('should be 1 day behind the custom end date', () => {
            const wrapper = shallow(
                <CustomDateRange
                    customStartDate="2018-04-01"
                    customEndDate="2018-04-15"
                    minCustomStartDateDaysAgo={30}
                />,
            );
            const actual = wrapper.instance().getMaxCustomStartDate();
            const expected = '2018-04-14';

            expect(actual).toEqual(expected);
        });
    });

    describe('getMinCustomEndDate', () => {
        it('should default to 6 days ago in UTC, since the default custom start date is 7 days ago', () => {
            const wrapper = shallow(
                <CustomDateRange
                    customStartDate="2018-04-24"
                    customEndDate="2018-05-01"
                    minCustomStartDateDaysAgo={30}
                />,
            );
            const actual = wrapper.instance().getMinCustomEndDate();
            const expected = '2018-04-25';

            expect(actual).toEqual(expected);
        });

        it('should be 1 day ahead of the custom start date', () => {
            const wrapper = shallow(
                <CustomDateRange
                    customStartDate="2018-04-01"
                    customEndDate="2018-04-15"
                    minCustomStartDateDaysAgo={30}
                />,
            );
            const actual = wrapper.instance().getMinCustomEndDate();
            const expected = '2018-04-02';

            expect(actual).toEqual(expected);
        });
    });

    describe('getMaxCustomEndDate', () => {
        it('should be today`s date in in UTC', () => {
            const wrapper = shallow(
                <CustomDateRange
                    customStartDate="2018-04-24"
                    customEndDate="2018-05-01"
                    minCustomStartDateDaysAgo={30}
                />,
            );
            const actual = wrapper.instance().getMaxCustomEndDate();
            const expected = '2018-05-01';

            expect(actual).toEqual(expected);
        });
    });
});
