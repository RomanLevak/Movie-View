import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Poster from './Poster'
import Loader from './Loader'
import {connect} from 'react-redux'
import {mapToArr} from '../helpers'
import {searchMovie} from '../AC'
import {Link} from 'react-router-dom'

class Results extends Component {

    static propTypes = {
        query: PropTypes.string,
        // form connect
        movies: PropTypes.array,
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.bool.isRequired,
        searchMovie: PropTypes.func.isRequired
    }

    componentDidMount() {
        const {loaded, loading, query, searchMovie} = this.props

        if(!loading || !loaded)
            searchMovie(query)
    }

    getBody = () => {
        const {movies, loading, error} = this.props

        if(loading)
            return <Loader />

        if(error)
            return <span className = 'error-msg'>Failed to load resources</span>
        // renders only first 18 elements
        return movies.slice(0, 18).map(movie =>
            <li className = 'results-list__item' key = {movie.id}>
                <Link to = {`/movies/${movie.id}`} key = {movie.id}>
                    <Poster
                        type = 'horizontal'
                        title = {movie.title}
                        year = {movie.year}
                        poster_path = {movie.poster_path}
                    />
                </Link>
            </li>
        )
    }

    render() {
        return (
            <div className = 'results-box'>
                <div className='results'>
                    <h2 className = 'results__title'>
                        Searh results for:
                        <span className = 'results__query'> {this.props.query}</span>
                    </h2>
                    <ul className='results-list'>
                        {this.getBody()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        movies: mapToArr(state.search.entities),
        loading: state.search.loading,
        loaded: state.search.loaded,
        error: state.search.error
    }),
    {searchMovie}
)(Results)