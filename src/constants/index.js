export const API_ACTION_PREFIX = 'API'

export const API_ACTION_STATUS = {
    REQUEST: 'REQUEST',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
}

export const API_ACTION_TYPE = {
    LOAD_LIST: 'LOAD_LIST',
    SAVE_LIST: 'SAVE_LIST',
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
}

export const SCALES = [
    {
        name: 'A',
        description: 'негативное настроение',
        extendedDescription: 'общее снижение настроения негативная оценка собственной эффективности в целом. Постоянное ожидание неприятностей, склонность к плаксивости, повышенный уровень тревожности.'
    },
    {
        name: 'B',
        description: 'межличностные проблемы',
        extendedDescription: 'идентификация себя с ролью плохого, агрессивное поведение, высокий негативизм, непослушание.'
    },
    {
        name: 'C',
        description: 'неэффективность',
        extendedDescription: 'высокий уровень убеждения неэффективности в школе'
    },
    {
        name: 'D',
        description: 'ангедония',
        extendedDescription: 'высокий уровень истощаемости, наличие чувства базы одиночества'
    },
    {
        name: 'E',
        description: 'негативная самооценка',
        extendedDescription: 'негативная оценка собственной неэффетивности, наличие суицидальных мыслей'
    }
]
