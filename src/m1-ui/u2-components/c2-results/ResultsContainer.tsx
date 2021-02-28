import React from "react"
import Results, {ResultsPropsType} from "./Results";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
    FilmPreviewType,
    getSearchResults,
    setCurrentPage,
    setFilmName
} from "../../../m2-bll/b1-reducers/r1-searchResultsReducer";
import {AppRootStateType} from "../../../m2-bll/reduxStore";
import {MovieType, setMovie} from "../../../m2-bll/b1-reducers/r2-movieReducer";
import {compose} from "redux";


class ResultsContainer extends React.Component <ResultsContainerPropsType, ResultsPropsType> {


    componentDidMount() {
        this.props.setMovie(null)
        this.props.setCurrentPage(Number(this.props.match.params.page))
        this.props.setFilmName(this.props.match.params.filmNameUrl)
        this.props.getSearchResults(this.props.match.params.filmNameUrl, Number(this.props.match.params.page))
    }

    componentDidUpdate(prevProps: ResultsContainerPropsType) {
        if (prevProps.match.params !== this.props.match.params) {
            this.props.setCurrentPage(Number(this.props.match.params.page))
            this.props.setFilmName(this.props.match.params.filmNameUrl)
            this.props.getSearchResults(this.props.match.params.filmNameUrl, Number(this.props.match.params.page))
        }
    }


    render() {


        const viewFilmHandler = (imdbID: string) => {
            this.props.history.push(`/movies-search-redux-func/movie/` + this.props.filmName + `/` + imdbID)
        }


        return <Results
            viewFilmHandler={viewFilmHandler}
            preloader={this.props.preloader}
            searchResults={this.props.searchResults}
            error={this.props.error}
            currentPage={this.props.currentPage}
            setCurrentPage={setCurrentPage}
            filmName={this.props.filmName}
            totalResults={this.props.totalResults}

        />
    }
}

const mstp = (state: AppRootStateType) => ({
    filmName: state.searchResults.filmName,
    preloader: state.searchResults.preloader,
    searchResults: state.searchResults.searchResults,
    error: state.searchResults.error,
    currentPage: state.searchResults.currentPage,
    totalResults: state.searchResults.totalResults,
})

const mdtp = {
    setMovie,
    setCurrentPage,
    setFilmName,
    getSearchResults
}


type ResultsContainerPropsType = RouteComponentProps<{ filmNameUrl: string, page: string }> & {
    preloader: boolean
    searchResults: FilmPreviewType[]
    error: string | null
    totalResults: string
    currentPage: number
    filmName: string

    setPreloader: (preloader: boolean) => void
    setCurrentPage: (currentPage: number) => void
    setMovie: (movie: MovieType | null) => void
    setFilmName: (filmName: string) => void
    getSearchResults: (film: string, page?: number) => void

}


export default compose<Function>(connect(mstp, mdtp), withRouter, React.memo)(ResultsContainer)