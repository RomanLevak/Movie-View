/* eslint-disable */
import {START, SUCCESS, FAIL} from '../constants'

export default () => next => action => {
    const {callAPI} = action

    if(!callAPI || !callAPI.url.startsWith('/tmdb'))
        return next(action)

    tmdbAPIHandler.addRequest(next, action)
}

/*
 * tmdb API do not have an option
 * to get an info about array of movies by their
 * id in one request, so when a lot of MoviePoster
 * components is being rendered simultaneously,
 *     (f.e. HomeList with 6 ListPosters
 *     and each one consists of 4 MoviePosters)
 * each one makes request to tmdb API for its own
 * data about movie. Such requests would
 * often fail with a 429 status(Too Many Requests).
 * tmdbAPIHandler helps to avoid such behavior
 *     (by storing the requests in queue and then
 *      making a several requests from queue
 *      only after previous ones got response)
 * and handles responses with 429 statusCode.
 * To see how it works in browser console
 * uncomment all lines in this file, that starts
 * with '//'
 */

// let i = 0
// let addedSyncRequests = 0

const tmdbAPIHandler = {
    /*
     * amount of requests sent
     * to tmdb in each portion
     */
    n: 8,

    /*
     * how much time to wait (in ms)
     * before repeating a portion
     * of requests if one of them
     * got 429 status
     */
    pauseTime: 600,

    /*
     * requests queue stores an
     * array of objects which consists of
     * next and action values
     * [..., {next, action}, ...]
     */
    queue: [],

    /*
     * true if there are a synchronous code
     * that is filling requests queue
     */
    isBeingFilled: false,

    /*
     * true if setTimeout that runs after
     * a synchronous filling a queue
     * is already set
     */
    isBeingFilledTimeOutSet: false,

    /*
     * true if handler is already
     * waiting for response from the
     * portion of requests from queue
     */
    isWaitingResponse: false,

    addRequest(next, action) {
        const {queue} = this

        this.isBeingFilled = true

        queue.push({next, action})

        // ++addedSyncRequests

        /*
         * request filling may be synchronous
         * so handler won't try to make api requests, while
         * there a synchronous code filling the
         * requests queue
         */
        if(!this.isBeingFilledTimeOutSet) {
            this.isBeingFilledTimeOutSet = true

            // console.log('start synchronously adding requests')

            setTimeout(
                () => {
                    // console.log(`synchronously added ${addedSyncRequests} requests`)
                    // addedSyncRequests = 0

                    this.isBeingFilled = false
                    this.isBeingFilledTimeOutSet = false
                    this.makeRequests()
                },
                0
            )
        }
    },

    /* make portion request */
    makeRequests(reqs = []) {
        const {
            queue,
            isWaitingResponse,
            n,
            pauseTime
        } = this

        if(isWaitingResponse || !queue.length)
            return

        let firstReqs = []

        /* cut out first n elements */
        if(!reqs.length)
            firstReqs = queue.splice(0, n)
        else
            firstReqs = reqs

        this.isWaitingResponse = true

        // console.log('start portion ' + ++i)

        Promise.all(firstReqs.map(req =>
            makeSingleRequest(req.next, req.action)
        ))
            .then(() => {
                // console.log('got   portion ' + i)

                this.isWaitingResponse = false
                /* make requests for next portion from queue */
                this.makeRequests()
            })
            .catch(error => {
                // console.log('failed portion ' + i--)

                this.isWaitingResponse = false

                if(error.message == 'Too Many Requests')
                    setTimeout(
                        this.makeRequests.bind(this, firstReqs),
                        pauseTime
                    )
            })
    }
}

function makeSingleRequest(next, action) {
    const {callAPI, type, ...rest} = action

    next({
        ...rest, type: type + START
    })

    const {url} = callAPI

    return fetch(
        url,
        {headers: {'Content-Type': 'application/json'}}
    )
        .then(response => {
            const {status, statusText} = response

            if(status == 429) /* Too Many Requests */
                throw new Error(statusText)

            return response.json()
        })
        .then(response => {
            next({
                ...rest,
                type: type + SUCCESS,
                payload: response
            })

            return response
        })
}
