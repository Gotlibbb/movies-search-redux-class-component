import React from "react";
import style from '../../u3-css/c3r1-FilmPreview.module.css'
import {FilmPreviewType} from "../../../m2-bll/b1-reducers/r1-searchResultsReducer";


class FilmPreview extends React.Component<FilmPreviewPropsType> {
    render() {

        return <div className={style.filmPreviewBlock}
                    onClick={() => this.props.viewFilmHandler(this.props.filmPreview.imdbID)}>
            <div className={style.filmPreviewBlock__title}>{this.props.filmPreview.Title}</div>
            <img className={style.filmPreviewBlock__img} src={this.props.filmPreview.Poster} alt={"poster"}/>
            <div className={style.Year}>Year: {this.props.filmPreview.Year}</div>
            <div className={style.Type}>Type: {this.props.filmPreview.Type}</div>
        </div>
    }
}

export type FilmPreviewPropsType = {

    filmPreview : FilmPreviewType
    viewFilmHandler: (imdbID: string) => void


}

export default React.memo(FilmPreview)