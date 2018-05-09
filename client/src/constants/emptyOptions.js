export const getEmptyInfo = searched =>
    searched
        ? {
              title: `No results found.`,
              message: `Refine the search query and try searching again.`,
              imageAlt: `No results found. Refine the search query and try searching again.`,
              dataTest: `no-result-found`,
          }
        : {
              title: `Start exploring.`,
              message: `Search by key-value pairs or use only filters to get insights on signals.`,
              imageAlt: `Start exploring. Search by key-value pairs or use only filters to get insights on signals.`,
              dataTest: `start-exploring`,
          };
