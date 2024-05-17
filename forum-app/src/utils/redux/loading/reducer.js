function loadingReducer(loading = [], action = {}) {
    if (action.type === 'LOADING_STATE') {
        return {
            ...loading,
            loading: action.payload
        }
    }
    return loading;
}

export {
    loadingReducer
}