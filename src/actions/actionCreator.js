import {API_ACTION_PREFIX} from "../constants";

export function apiActionCreator({actionType, actionStatus, objectName, data}) {
    objectName = objectName.toUpperCase()
    return {type: [API_ACTION_PREFIX, objectName, actionType, actionStatus].join('_'), data}
}