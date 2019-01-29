import React from 'react';
import { shallow } from 'enzyme';
import MetricsContext from '../MetricsContext';

describe('<MetricsContext/> component', () => {
    describe('rendering', () => {
        const props = {
            type: 'People-Based',
            shareableAudience: 245123,
            addressableAudience: 213123,
            matchRate: '89%',
            lifetimeAddressableAudience: 123123,
        };
        const wrapper = shallow(<MetricsContext {...props} />);

        it('matches snapshot', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
