export const getEmptyOptions = variant => {
    switch (variant) {
        case 'explore':
            return {
                title: `Start exploring.`,
                message: `Search by key-value pairs or use only filters to get insights on signals.`,
                imageAlt: `Start exploring. Search by key-value pairs or use only filters to get insights on signals.`,
                dataTest: `start-exploring`,
            };
        case 'noResult':
            return {
                title: `No results found.`,
                message: `Refine the search query and try searching again.`,
                imageAlt: `No results found. Refine the search query and try searching again.`,
                dataTest: `no-result-found`,
            };
        case 'errorFetching':
            return {
                title: `Error fetching data.`,
                message: `Please try again later.`,
                imageAlt: `Error fetching data. Please try again later.`,
                dataTest: `error-fetching-data`,
            };
        default:
            return {
                title: '',
                message: '',
                imageAlt: '',
                dataTest: '',
            };
    }
};
