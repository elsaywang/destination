import React from 'react';
import { shallow } from 'enzyme';
import InlineErrorMessage from '../../components/common/InlineErrorMessage';

describe('<InlineErrorMessage /> component', () => {
    const errorMessage = 'This is an error message.';

    describe('when isInvalid is true,', () => {
        const wrapper = shallow(
            <InlineErrorMessage isInvalid={true} errorMessage={errorMessage} />,
        );

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <InlineErrorMessage /> component with an error message', () => {
            expect(wrapper.find('[data-test="inline-error-message"]').exists()).toBe(true);
            expect(wrapper.text()).toBe(errorMessage);
        });
    });

    describe('when isInvalid is false', () => {
        const wrapper = shallow(
            <InlineErrorMessage isInvalid={false} errorMessage={errorMessage} />,
        );

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('renders <InlineErrorMessage /> component with no error message', () => {
            expect(wrapper.find('[data-test="inline-error-message"]').exists()).toBe(false);
            expect(wrapper.text()).toBe('');
        });
    });
});
