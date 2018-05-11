import React from 'react';
import { shallow } from 'enzyme';
import EmptyPlaceholder from '../EmptyPlaceholder';
import Heading from '@react/react-spectrum/Heading';
import explore from '../../../../images/explore.svg';
import noResult from '../../../../images/noResult.svg';

describe('<EmptyPlaceholder/> component', () => {
    const props = {
        title: 'No results found.',
        message: 'Refine the search query and try searching again.',
    };
    const Explore = () => <img src={explore} alt="explore" />;
    const NoResult = () => <img src={noResult} alt="noResult" />;

    describe('rendering when it does not contain any children component', () => {
        const wrapper = shallow(<EmptyPlaceholder {...props} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Heading/>', () => {
            expect(wrapper.find(Heading).exists()).toBeTruthy();
        });

        it('renders no children component', () => {
            expect(
                wrapper
                    .find('div')
                    .children()
                    .find(Explore)
                    .exists(),
            ).toBeFalsy();
            expect(
                wrapper
                    .find('div')
                    .children()
                    .find(NoResult)
                    .exists(),
            ).toBeFalsy();
        });

        it('displays empty message within 2nd <div/>', () => {
            expect(
                wrapper
                    .find('div')
                    .at(1)
                    .text(),
            ).toEqual(props.message);
        });
    });

    describe('rendering when it does contain children component', () => {
        const props = {
            title: 'No results found.',
            message: 'Refine the search query and try searching again.',
        };
        const wrapper = shallow(
            <EmptyPlaceholder {...props}>
                <Explore />
                <NoResult />
            </EmptyPlaceholder>,
        );

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <Heading/>', () => {
            expect(wrapper.find(Heading).exists()).toBeTruthy();
        });

        it('renders <Explore/> and <NoResult/> as children components', () => {
            expect(
                wrapper
                    .find('div')
                    .children()
                    .find(Explore)
                    .exists(),
            ).toBeTruthy();
            expect(
                wrapper
                    .find('div')
                    .children()
                    .find(NoResult)
                    .exists(),
            ).toBeTruthy();
        });
    });
});
