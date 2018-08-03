import { getCurrentYear } from '../utils/dateRange';

export const getFooterCopyRightMessage = () =>
    `© ${getCurrentYear()} Adobe Systems Incorporated. All Rights Reserved.`;

export const languageOption = {
    label: `Language: `,
    option: 'English',
};
