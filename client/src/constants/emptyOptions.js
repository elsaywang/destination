export const getEmptyInfo = searched =>
    searched
        ? {
              title: `No results found.`,
              message: `Refine the search query and try searching again.`,
              imageAlt: `no results found`,
              dataTest: `no-result-found`,
          }
        : {
              title: `Start exploring.`,
              message: `Search by key-value pairs or use only filters to get insights on signals.`,
              imageAlt: `start exploring`,
              dataTest: `start-exploring`,
          };
