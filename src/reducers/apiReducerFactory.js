const initialState = {
    items: [],
    fetching: false,
    errors: null
}

const ACTION_PREFIX = 'API'

const ACTION_STATUS = {
    REQUEST: 'REQUEST',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
}

const ACTION_TYPE = {
    FETCHING: 'FETCHING',
    LOAD_LIST: 'LOAD_LIST',
    GET: 'GET',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
}


export function apiActionCreator({dispatch, objectName, APIFunc, params, requestType}) {
    objectName = objectName.toUpperCase()
    dispatch({type: [ACTION_PREFIX, objectName, ACTION_TYPE.FETCHING, ACTION_STATUS.REQUEST].join('_')})
    return APIFunc(params).then(
        data =>  dispatch({
            type: [ACTION_PREFIX, objectName, ACTION_TYPE[requestType], ACTION_STATUS.SUCCESS].join('_'),
            data
        }),
        error => {
            dispatch({
                type: [ACTION_PREFIX, objectName, ACTION_TYPE[requestType], ACTION_STATUS.ERROR].join('_'),
                data: error
            })
            return Promise.reject()
        }
    )
}


export function apiReducerFactory(objectName) {
    objectName = objectName.toUpperCase()
    return function (state = initialState, action) {
        const {type, data} = action
        switch (type) {
            case [ACTION_PREFIX, objectName, ACTION_TYPE.FETCHING, ACTION_STATUS.REQUEST].join('_'):
                return {...state, fetching: true, errors: null}
            case [ACTION_PREFIX, objectName, ACTION_TYPE.LOAD_LIST, ACTION_STATUS.SUCCESS].join('_'):
                return {...initialState, items: data}
            case [ACTION_PREFIX, objectName, ACTION_TYPE.CREATE, ACTION_STATUS.SUCCESS].join('_'):
                return {...initialState, items: state.items.concat(data), errors: null}
            case [ACTION_PREFIX, objectName, ACTION_TYPE.GET, ACTION_STATUS.SUCCESS].join('_'):
            case [ACTION_PREFIX, objectName, ACTION_TYPE.UPDATE, ACTION_STATUS.SUCCESS].join('_'):
                return {...initialState, items: state.items.map(e => e.id === data.id ? data : e), errors: null}
            case [ACTION_PREFIX, objectName, ACTION_TYPE.DELETE, ACTION_STATUS.SUCCESS].join('_'):
                return {...initialState, items: state.items.filter(c => c.id !== data.id), errors: null}
            case [ACTION_PREFIX, objectName, ACTION_TYPE.LOAD_LIST, ACTION_STATUS.ERROR].join('_'):
            case [ACTION_PREFIX, objectName, ACTION_TYPE.CREATE, ACTION_STATUS.ERROR].join('_'):
            case [ACTION_PREFIX, objectName, ACTION_TYPE.UPDATE, ACTION_STATUS.ERROR].join('_'):
            case [ACTION_PREFIX, objectName, ACTION_TYPE.DELETE, ACTION_STATUS.ERROR].join('_'):
                return {...state, fetching: false, errors: data}
            default:
                return state
        }
    }
}

