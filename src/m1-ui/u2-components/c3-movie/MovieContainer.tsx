import React from "react"
import Movie, {MoviePropsType} from "./Movie";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Preloader} from "../../u5-assets/Preloader";
import {connect} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/reduxStore";
import {getMovie, MovieType} from "../../../m2-bll/b1-reducers/r2-movieReducer";
import {setFilmName} from "../../../m2-bll/b1-reducers/r1-searchResultsReducer";
import {compose} from "redux";

class MovieContainer extends React.Component <MovieContainerPropsType, MoviePropsType> {

    componentDidMount() {
        this.props.setFilmName(this.props.match.params.filmNameUrl)
        this.props.getMovie(this.props.match.params.movieId)
    }

    render() {

        const backToSearchHandler = () => {
            this.props.history.push("/movies-search-redux-func/search-results/" + this.props.match.params.filmNameUrl + `/` + this.props.currentPage)
        }


        if (this.props.preloader) return <Preloader/>


        return <Movie
            preloader={this.props.preloader}
            movie={this.props.movie}
            backToSearchHandler={backToSearchHandler}
        />
    }
}


const mstp = (state: AppRootStateType) => ({
    movie: state.movie.movie,
    currentPage: state.searchResults.currentPage,
    preloader: state.searchResults.preloader,
})

const mdtp = {
    setFilmName,
    getMovie,
}

type MovieContainerPropsType = RouteComponentProps<{ movieId: string, filmNameUrl: string }> & {
    movie: MovieType | null
    currentPage: number
    preloader: boolean
    setFilmName: (filmName: string) => void
    getMovie: (filmId: string) => void
}


export default compose<Function>(React.memo, withRouter, connect(mstp, mdtp))(MovieContainer)