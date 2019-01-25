import { metricsHeadings } from '../metrics';

describe('metricsHeadings constants', () => {
    it('matches snapshot', () => {
        expect(metricsHeadings).toMatchSnapshot();
    });
});
