import {API_ACTION_PREFIX, API_ACTION_STATUS, API_ACTION_TYPE} from "../constants";

const initialState = {
    items: [],
    fetching: false,
    errors: null
}

export function apiReducerFactory(objectName) {
    objectName = objectName.toUpperCase()
    return function (state = initialState, action) {
        const {type, data} = action
        switch (type) {
            case [API_ACTION_PREFIX, objectName, API_ACTION_TYPE.FETCHING, API_ACTION_STATUS.REQUEST].join('_'):
                return {...state, fetching: true, errors: null}
            case [API_ACTION_PREFIX, objectName, API_ACTION_TYPE.LOAD_LIST, API_ACTION_STATUS.SUCCESS].join('_'):
                return {...initialState, items: data}
            case [API_ACTION_PREFIX, objectName, API_ACTION_TYPE.CREATE, API_ACTION_STATUS.SUCCESS].join('_'):
                return {...initialState, items: state.items.concat(data), errors: null}
            case [API_ACTION_PREFIX, objectName, API_ACTION_TYPE.GET, API_ACTION_STATUS.SUCCESS].join('_'):
            case [API_ACTION_PREFIX, objectName, API_ACTION_TYPE.UPDATE, API_ACTION_STATUS.SUCCESS].join('_'):
                return {...initialState, items: state.items.map(e => e.id === data.id ? data : e), errors: null}
            case [API_ACTION_PREFIX, objectName, API_ACTION_TYPE.DELETE, API_ACTION_STATUS.SUCCESS].join('_'):
                return {...initialState, items: state.items.filter(c => c.id !== data.id), errors: null}
            case [API_ACTION_PREFIX, objectName, API_ACTION_TYPE.LOAD_LIST, API_ACTION_STATUS.ERROR].join('_'):
            case [API_ACTION_PREFIX, objectName, API_ACTION_TYPE.CREATE, API_ACTION_STATUS.ERROR].join('_'):
            case [API_ACTION_PREFIX, objectName, API_ACTION_TYPE.UPDATE, API_ACTION_STATUS.ERROR].join('_'):
            case [API_ACTION_PREFIX, objectName, API_ACTION_TYPE.DELETE, API_ACTION_STATUS.ERROR].join('_'):
                return {...state, fetching: false, errors: data}
            default:
                return state
        }
    }
}

