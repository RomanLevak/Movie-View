import {
    LOAD_MOVIES,
    START,
    SUCCESS,
    FAIL
} from '../constants'

import {filterMovies} from '../helpers'

const defaultState = {
    loading: false,
    loaded: false,
    error: '',
    entities: {},
    filters: {popular: true}
}

export default (moviesState = defaultState, action) => {
    const {type, payload} = action

    switch(type) {
        case LOAD_MOVIES + START:
            return {
                ...moviesState,
                loaded: false,
                loading: true,
                error: ''
            }

        case LOAD_MOVIES + SUCCESS: {
            let {results, total_pages} = payload
            let movies = filterMovies(results)
            // api maxiimal requested page allowed is 1000
            total_pages = total_pages > 1000 ? 1000 : total_pages

            return {
                ...moviesState,
                loaded: true,
                loading: false,
                entities: movies,
                total_pages,
                error: ''
            }
        }

        case LOAD_MOVIES + FAIL:
            return {
                ...moviesState,
                loaded: false,
                loading: false,
                entities: {},
                error: payload
            }
    }

    return moviesState
}
