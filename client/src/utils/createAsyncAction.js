function createAsyncAction(type, fn) {
    return (...args) => async dispatch => {
        let response;

        try {
            response = await fn(...args);

            if (response.ok) {
                dispatch({
                    type: `${type}`,
                    payload: response.json(),
                });
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            dispatch({
                type: `${type}_REJECTED`,
                error: true,
                payload: error,
            });
        }

        return response;
    };
}

export { createAsyncAction };
