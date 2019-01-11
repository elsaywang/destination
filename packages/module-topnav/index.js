import 'nodelist-foreach-polyfill';
import { initTopNav } from './build/js/TopNav';

document.onreadystatechange = function () {
    document.readyState === 'interactive' &&
        initTopNav();
};
