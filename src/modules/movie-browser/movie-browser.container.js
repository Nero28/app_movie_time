import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AppBar } from 'material-ui';
import { connect } from 'react-redux';
import * as movieActions from './movie-browser.actions';
import * as movieHelpers from './movie-browser.helpers';
import MovieList from './movie-list/movie-list.component';
import * as scrollHelpers from '../common/scroll.helpers';
import MovieModal from './movie-modal/movie-modal.container';

class MovieBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        };
        // Binds the handleScroll to this class (MovieBrowser)
        // which provides access to MovieBrowser's props
        // Note: You don't have to do this if you call a method
        // directly from a lifecycle method or define an arrow function
        this.handleScroll = this.handleScroll.bind(this);
    }


    componentDidMount() {
        window.onscroll = this.handleScroll;
        this.props.getMovies(this.state.currentPage);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const { topMovies } = this.props;
        if (!topMovies.isLoading) {
            let percentScrolled = scrollHelpers.getScrollDownPercentage(window);
            if (percentScrolled > .8) {
                const nextPage = this.state.currentPage + 1;
                this.props.getMovies(nextPage);
                this.setState({ currentPage: nextPage });
            }
        }
    }

    render() {
        const { topMovies } = this.props;
        const movies = movieHelpers.getMoviesList(topMovies.response)

        return (
            <div>
                <AppBar title='Movie Browser' />
                <Container>
                    <Row>
                        <p>Search will go here</p>
                    </Row>
                    <Row>
                        <MovieList movies={movies} isLoading={topMovies.isLoading} />
                    </Row>
                </Container>
                <MovieModal/>
            </div>
        );
    }
};

export default connect(
    // Map nodes in our state to a properties of our component
    (state) => ({
        topMovies: state.movieBrowser.topMovies
    }),
    // Map action creators to properties of our component
    { ...movieActions }
)(MovieBrowser);