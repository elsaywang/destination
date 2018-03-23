import React from 'react';
import { shallow } from 'enzyme';
import { FormattedNumber } from 'react-intl';
import PercentageChange from '../PercentageChange';
import { barContainer } from '../PercentageChange.css';

describe('<PercentageChange /> component', () => {
    const wrapper = shallow(
        <PercentageChange percentageChange={0.1234} maxPercentageMagnitude={0.5678} />,
    );

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
        it('renders <FormattedNumber /> for the percentage', () => {
            expect(wrapper.find(FormattedNumber).exists()).toBeTruthy();
        });
    });

    describe('getBarWidth', () => {
        const { getBarWidth } = wrapper.instance();

        describe('formatting of returned string', () => {
            it('should end with `rem`', () => {
                expect(
                    getBarWidth({
                        percentageChange: 0.1234,
                        maxPercentageMagnitude: 0.1234,
                    }).substr(-3),
                ).toEqual('rem');
            });
            it('should start with an integer if the width is an integer', () => {
                expect(
                    getBarWidth({
                        percentageChange: 0.1234,
                        maxPercentageMagnitude: 0.1234,
                    }).includes('.'),
                ).toBeFalsy();
            });
            it('should contain up to 2 decimal places if the width is a float', () => {
                expect(
                    getBarWidth({
                        percentageChange: 0.1234,
                        maxPercentageMagnitude: 0.5678,
                    }).match(/^\d.\d{2}/),
                ).toBeTruthy();
            });
        });

        it('should return the max bar width if `percentageChange` is equal to `maxPercentageMagnitude`', () => {
            expect(
                getBarWidth({
                    percentageChange: 0.1234,
                    maxPercentageMagnitude: 0.1234,
                }),
            ).toEqual('2rem');
        });

        it('should return a width of percentageChange / maxPercentageMagnitude normalized between 10% of maxPercentageMagnitude and maxPercentageMagnitude', () => {
            expect(
                getBarWidth({
                    percentageChange: 0.5,
                    maxPercentageMagnitude: 0.75,
                }),
            ).toEqual('1.39rem');
        });

        it('should return a normalized minimum width', () => {
            expect(
                getBarWidth({
                    percentageChange: 0,
                    maxPercentageMagnitude: 1,
                }),
            ).toEqual('0.18rem');
        });
    });

    describe('getBarClass', () => {
        const { getBarClass } = wrapper.instance();

        it('should return the class for a positive percentage change if the percentage change is greater than or equal to 0', () => {
            expect(getBarClass(0.5)).toEqual('bar--positive');
            expect(getBarClass(0)).toEqual('bar--positive');
        });
        it('should return the class for a positive percentage change if the percentage change is less than 0', () => {
            expect(getBarClass(-0.5)).toEqual('bar--negative');
        });
    });
});
