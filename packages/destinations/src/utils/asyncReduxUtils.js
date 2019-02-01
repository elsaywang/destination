const actionDispatcherCache = new Map();

function createAsyncAction(type, fn) {
    const func = options => {
        const actionDispatcher = (...args) => async (dispatch, getStore) => {
            let response;

            try {
                dispatch({
                    type: `${type}_PENDING`,
                    payload: { ...args },
                });

                if (args.length === 0) {
                    response = await fn(null, getStore);
                } else {
                    response = await fn(...args, getStore);
                }

                if (response.ok) {
                    const action = { type: `${type}_FULFILLED` };
                    if (options.json) {
                        const json = await response.json();
                        action.payload = json;
                    }

                    dispatch(action);
                } else {
                    // API call went through, but failed with a 4xx or 5xx error.
                    const { ok, status, statusText } = response;

                    dispatch({
                        type: `${type}_REJECTED`,
                        error: true,
                        payload: {
                            ok,
                            status,
                            message: statusText,
                        },
                    });
                }
            } catch (error) {
                // API call didn't go through. Likely an error in `response.json()`.
                dispatch({
                    type: `${type}_REJECTED`,
                    error: true,
                    payload: error,
                });
            }

            return response;
        };

        actionDispatcherCache.set(actionDispatcher, type);

        return actionDispatcher;
    };

    return func;
}

function createAsyncActionHandlers(actionDispatcher, { onPending, onFulfilled, onError }) {
    const actionType = actionDispatcherCache.get(actionDispatcher);
    if (!actionType) {
        throw Error('No such action dispatcher exists');
    }

    return [
        [`${actionType}_PENDING`, onPending],
        [`${actionType}_FULFILLED`, onFulfilled],
        [`${actionType}_REJECTED`, onError],
    ];
}

export { createAsyncAction, createAsyncActionHandlers };
