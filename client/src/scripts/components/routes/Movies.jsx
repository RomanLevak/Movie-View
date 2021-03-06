import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect, Switch} from 'react-router-dom'
import {mapToArr} from '../../helpers'
import {genres as genresObj} from '../../constants'
import MovieInfo from '../MovieInfo'
import Results from '../Results'
import Explorer from '../Explorer'

const genres = mapToArr(genresObj)

class Movies extends Component {

    static propTypes = {
        match: PropTypes.object
    }

    render() {
        const {url} = this.props.match

        return (
            <Switch>
                <Route path={`${url}/popular/:page`} render={this.getDefaultExplorer} />
                <Route path={`${url}/popular`} render={this.getDefaultExplorer} />
                <Route path={`${url}/genres/:genre/:page`} render={this.getExplorerWithGenre} />
                <Route path={`${url}/genres/:genre`} render={this.getExplorerWithGenre} />
                <Route path={`${url}/search/:query`} render={this.getResults} />
                <Route path={`${url}/:id`} render={this.getMovie} />
                <Route path={url} render={this.getDefaultExplorer} />
            </Switch>
        )
    }

    getResults = ({match}) => {
        const {query} = match.params

        return <Results query={query} key={query} />
    }

    getDefaultExplorer = ({match}) => {
        const {page} = match.params
        const {url} = match

        if(!page) {
            if(url.includes('popular'))
                return <Redirect to={`${url}/1`} />
            else
                return <Redirect to={`${url}/popular/1`} />
        }

        return (
            <Explorer
                filters={{
                    type: 'popular',
                    page: parseInt(page)
                }}
                key='popular'
            />
        )
    }

    getExplorerWithGenre = ({match}) => {
        const {url} = match
        const {page} = match.params
        const genreUrl = match.params.genre

        const genreId = genres.find(genre => genre.name == genreUrl).id
        if(!genreId)
            return <Redirect to={'/not-found'} />

        if(!page)
            return <Redirect to={`${url}/1`} />

        return (
            <Explorer
                filters={{
                    type: 'by_genre',
                    genreId,
                    page: parseInt(page)
                }}
                key={genreId}
            />
        )
    }

    getMovie = ({match}) => {
        const {id} = match.params

        return <MovieInfo id={match.params.id} key={id} />
    }
}

export default Movies
