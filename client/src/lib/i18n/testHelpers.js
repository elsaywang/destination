/**
 * Adapted from react-intl docs and Platform-UI's `componentHelpers.js`.
 *
 * @see {@link https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl#enzyme}
 * @see {@link https://git.corp.adobe.com/experience-platform/platform-ui/blob/blackout/test/helpers/componentHelpers.js}
 */

import React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import { mount } from 'enzyme';
import { getLocaleData } from './getLocaleData';

const { locale, messages } = getLocaleData();
const intlProvider = new IntlProvider({ locale, messages }, {});
const { intl } = intlProvider.getChildContext();

/**
 * Clones React Node with intl as a prop
 *
 * @see {@link https://gist.github.com/mirague/c05f4da0d781a9b339b501f1d5d33c37}
 * @param node to be provided intl prop
 * @returns a React node
 */
function nodeWithIntlProp(node) {
    return React.cloneElement(node, { intl });
}

/**
 * Uses enzyme.mount to create and return an enzyme ReactWrapper with the provided children
 * wrapped in an IntlProvider component
 *
 * @see {@link https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md#reactwrapper-api}
 * @see {@link https://gist.github.com/mirague/c05f4da0d781a9b339b501f1d5d33c37}
 *
 * @example
 * const result = createMountedIntlComponent(<ComponentName />);
 * expect(result.someEnzymeReactWrapperApi()).someJestComparisonApi()
 *
 * @param node to be rendered with intl context
 * @returns an enzyme ReactWrapper - a wrapper instance around the rendered output
 */
export const createMountedIntlComponent = node => {
    return mount(nodeWithIntlProp(node), {
        context: { intl },
        childContextTypes: { intl: intlShape },
    });
};
