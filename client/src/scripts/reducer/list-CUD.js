// create, update, delete lists reducer
import {
    CREATE_LIST,
    UPDATE_LIST,
    ADD_MOVIE_TO_LIST,
    START,
    SUCCESS,
    FAIL
} from '../constants'

const defaultState = {
    create: {
        loading: false,
        loaded: false,
        error: '',
        entity: {}
    },
    update: {
        loading: false,
        loaded: false,
        error: '',
        entity: {}
    },
    addMovie: {
        loading: false,
        loaded: false,
        error: '',
        entity: {}
    }
}

export default (CUDState = defaultState, action) => {
    const {type, payload} = action

    switch(type) {
        case CREATE_LIST + START:
            return {
                ...CUDState,
                create: {
                    loaded: false,
                    loading: true,
                    error: '',
                    entity: {}
                }
            }

        case CREATE_LIST + SUCCESS:
            return {
                ...CUDState,
                create: {
                    loaded: true,
                    loading: false,
                    error: '',
                    entity: payload
                }
            }

        case CREATE_LIST + FAIL:
            return {
                ...CUDState,
                create: {
                    loaded: false,
                    loading: false,
                    entity: {},
                    error: payload
                }
            }

        case ADD_MOVIE_TO_LIST + START:
            return {
                ...CUDState,
                addMovie: {
                    loaded: false,
                    loading: true,
                    error: '',
                    entity: {}
                }
            }

        case ADD_MOVIE_TO_LIST + SUCCESS:
            return {
                ...CUDState,
                addMovie: {
                    loaded: true,
                    loading: false,
                    error: '',
                    entity: payload
                }
            }

        case ADD_MOVIE_TO_LIST + FAIL:
            return {
                ...CUDState,
                addMovie: {
                    loaded: false,
                    loading: false,
                    entity: {},
                    error: payload
                }
            }
        case UPDATE_LIST + START:
            return {
                ...CUDState,
                update: {
                    loaded: false,
                    loading: true,
                    error: '',
                    entity: {}
                }
            }

        case UPDATE_LIST + SUCCESS:
            return {
                ...CUDState,
                update: {
                    loaded: false,
                    loading: true,
                    error: '',
                    entity: payload
                }
            }

        case UPDATE_LIST + FAIL:
            return {
                ...CUDState,
                update: {
                    loaded: false,
                    loading: false,
                    entity: {},
                    error: payload
                }
            }
    }

    return CUDState
}