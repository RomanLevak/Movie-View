import {
    API_KEY,
    LOAD_MOVIES,
    LOAD_MOVIE_INFO,
    LOAD_MOVIE_POSTER,
    SEARCH_MOVIE,
    LOAD_LIST,
    LOAD_LISTS,
    CREATE_LIST,
    UPDATE_LIST,
    DELETE_LIST,
    ADD_MOVIE_TO_LIST,
    REMOVE_MOVIE_FROM_LIST,
    SINGIN,
    SINGOUT,
    SINGUP,
    GET_CURRENT_USER,
} from '../constants'

export function loadMovies(filters) {
    const url = {
        'popular': `/tmdbapi/movie/popular?api_key=${API_KEY}&page=${filters.page}`,
        'by_genre': `/tmdbapi/discover/movie?api_key=${API_KEY}` +
                    `&page=${filters.page}&with_genres=${filters.genreId}`,
    }[filters.type]

    return {
        type: LOAD_MOVIES,
        callAPI: {url}
    }
}

export function loadMovieInfo(id) {
    return {
        type: LOAD_MOVIE_INFO,
        callAPI: {
            url: `/tmdbapi/movie/${id}?api_key=${API_KEY}`
        }
    }
}

export function loadMoviePoster(id) {
    return {
        type: LOAD_MOVIE_POSTER,
        id,
        callAPI: {
            url: `/tmdbapi/movie/${id}?`+
            `api_key=${API_KEY}`},
    }
}

export function searchMovie(query, temp = false) {
    return {
        type: SEARCH_MOVIE,
        temp,
        callAPI: {
            url: '/tmdbapi/search/movie?' +
                `api_key=${API_KEY}&query=${query}`
        }
    }
}

export function loadLists(filters = {}) {
    const {authorName, page} = filters
    let url = ''
    const start = (page-1) * 12

    if(authorName)
        url = `/server/lists/username/${authorName}`
    else
        url = `/server/lists/latest?start=${start}&count=12}`

    return {
        type: LOAD_LISTS,
        callAPI: {url}
    }
}

export function loadList(id) {
    return {
        type: LOAD_LIST,
        id,
        callAPI: {
            url: `/server/lists/${id}`
        }
    }
}

export function createList(title) {
    return {
        type: CREATE_LIST,
        callAPI: {
            url: '/server/lists/',
            method: 'POST',
            body: {title}
        }
    }
}

export function updateList(id, body) {
    return {
        type: UPDATE_LIST,
        callAPI: {
            url: `/server/lists/${id}`,
            method: 'PUT',
            body
        }
    }
}

export function deleteList(id) {
    return {
        type: DELETE_LIST,
        callAPI: {
            url: `/server/lists/${id}`,
            method: 'DELETE'
        }
    }
}

export function addMovieToList(listId, movieId) {
    return {
        type: ADD_MOVIE_TO_LIST,
        callAPI: {
            url: `/server/lists/${listId}/${movieId}`,
            method: 'PUT'
        }
    }
}

export function removeMovieFromList(listId, movieId) {
    return {
        type: REMOVE_MOVIE_FROM_LIST,
        callAPI: {
            url: `/server/lists/${listId}/${movieId}`,
            method: 'DELETE'
        }
    }
}

export function singIn(email, password) {
    return {
        type: SINGIN,
        callAPI: {
            url: '/server/user/login',
            method: 'POST',
            body: {email, password}
        }
    }
}

export function singUp(email, username, password) {
    return {
        type: SINGUP,
        callAPI: {
            url: '/server/user/register',
            method: 'POST',
            body: {
                email,
                displayName: username,
                password
            }
        }
    }
}

export function singOut() {
    return {
        type: SINGOUT,
        callAPI: {
            url: '/server/user/logout',
            method: 'POST'
        }
    }
}

export function getCurrentUser() {
    return {
        type: GET_CURRENT_USER,
        callAPI: {url: '/server/user/me'}
    }
}
