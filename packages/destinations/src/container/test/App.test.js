import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('renders <App/> without crashing', () => {
    const wrapper = shallow(<App />);

    describe('rendering', () => {
        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
