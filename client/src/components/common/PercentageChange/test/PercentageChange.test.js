import React from 'react';
import { shallow } from 'enzyme';
import { FormattedNumber } from 'react-intl';
import { createMountedIntlComponent } from '../../../../lib/i18n/testHelpers';
import PercentageChange from '../PercentageChange';
import { barContainer } from '../PercentageChange.css';

describe('<PercentageChange /> component', () => {
    const wrapper = shallow(
        <PercentageChange percentageChange={0.12345} maxPercentageMagnitude={0.5678} />,
    );

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
        it('renders <FormattedNumber /> for the percentage', () => {
            expect(wrapper.find(FormattedNumber).exists()).toBeTruthy();
        });
    });

    describe('percentage number in default English locale', () => {
        it('should be rounded to two decimal places', () => {
            const hasTwoDecimalPlaces = text => Boolean(text.match(/\d{2}\.\d{2}/));
            const mounted = createMountedIntlComponent(
                <PercentageChange percentageChange={0.12345} maxPercentageMagnitude={0.5678} />,
            );

            expect(hasTwoDecimalPlaces(mounted.text())).toBeTruthy();

            mounted.setProps({ percentageChange: 1 });

            expect(hasTwoDecimalPlaces(mounted.text())).toBeTruthy();
        });
        describe('positive/negative sign', () => {
            it('should have a plus sign in front of positive percentages', () => {
                const mounted = createMountedIntlComponent(
                    <PercentageChange percentageChange={0.12345} maxPercentageMagnitude={0.5678} />,
                );

                expect(mounted.text().match(/^\+ /)).toBeTruthy();
            });
            it('should have a plus sign in front of 0 percent', () => {
                const mounted = createMountedIntlComponent(
                    <PercentageChange percentageChange={0} maxPercentageMagnitude={0.5678} />,
                );

                expect(mounted.text().match(/^\+ /)).toBeTruthy();
            });
            it('should have an endash in front of negative percentages', () => {
                const mounted = createMountedIntlComponent(
                    <PercentageChange
                        percentageChange={-0.12345}
                        maxPercentageMagnitude={0.5678}
                    />,
                );

                expect(mounted.text().match(/^\– /)).toBeTruthy();
            });
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

    describe('getClassVariant', () => {
        const { getClassVariant } = wrapper.instance();

        it('should return the class for a positive percentage change if the percentage change is greater than or equal to 0', () => {
            expect(getClassVariant(0.5)).toEqual('percentageChange--positive');
            expect(getClassVariant(0)).toEqual('percentageChange--positive');
        });
        it('should return the class for a positive percentage change if the percentage change is less than 0', () => {
            expect(getClassVariant(-0.5)).toEqual('percentageChange--negative');
        });
    });
});
