import style from "../../u3-css/c4-Movie.module.css";
import React from "react";
import {MovieType} from "../../../m2-bll/b1-reducers/r2-movieReducer";
import {Preloader} from "../../u5-assets/Preloader";

class Movie extends React.Component<MoviePropsType> {

    render() {

        if (this.props.preloader) return <Preloader/>

        if (!this.props.movie) return <Preloader/>

        if (!this.props.movie.Title) return <Preloader/>


        return <div className={style.moviePageContainer}>

            <span className={style.moviePageContainer__backToSearch} onClick={this.props.backToSearchHandler}>⇦ Back to search</span>

            <div className={style.moviePageContainer__title}>{this.props.movie.Title}</div>

            <div className={style.moviePageContainer__movieBlock}>

                <img className={style.moviePageContainer__movieBlock__img} src={this.props.movie.Poster}
                     alt={"poster"}/>

                <div className={style.moviePageContainer__movieBlock__movieInfo}>


                    <div><u><b>Production</b></u>: {this.props.movie.Production}</div>
                    <div><u><b>Type</b></u>: {this.props.movie.Type}</div>
                    <div><u><b>Genre</b></u>: {this.props.movie.Genre}</div>
                    <div><u><b>imdbRating</b></u>: {this.props.movie.imdbRating}</div>
                    <div><u><b>Country</b></u>: {this.props.movie.Country}</div>
                    <div><u><b>Year</b></u>: {this.props.movie.Year}</div>
                    <div><u><b>Language</b></u>: {this.props.movie.Language}</div>
                    <div><u><b>Director</b></u>: {this.props.movie.Director}</div>
                    <div><u><b>Actors</b></u>: {this.props.movie.Actors}</div>
                    <div><u><b>Brief description</b></u>: {this.props.movie.Plot}</div>
                    <div><u><b>Box office</b></u>: {this.props.movie.BoxOffice}</div>
                    <div><u><b>Runtime</b></u>: {this.props.movie.Runtime}</div>

                </div>
            </div>

        </div>
    }
}


export type MoviePropsType = {

    preloader: boolean

    movie: MovieType | null

    backToSearchHandler: () => void
}


export default React.memo(Movie)