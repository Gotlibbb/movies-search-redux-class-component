import React from "react"
import style from "../../u3-css/c3-Results.module.css"
import {Preloader} from "../../u5-assets/Preloader";
import {FilmPreviewType} from "../../../m2-bll/b1-reducers/r1-searchResultsReducer";
import Pagination from "./Pagination";
import FilmPreview from "./FilmPreview";


class Results extends React.Component<ResultsPropsType> {
    render() {

        if (this.props.error) {
            return <span style={{color: "red"}}>{this.props.error}</span>
        }

        return <div className={style.resultsContainer}>

            <Pagination
                totalResults={this.props.totalResults}
                currentPage={this.props.currentPage}
                setCurrentPage={this.props.setCurrentPage}
                filmName={this.props.filmName}


            />
            {this.props.preloader ? <Preloader/> :
                <div className={style.resultsContainer__resultsBlock}>
                    {this.props.searchResults.map((el) => {
                            let obj: FilmPreviewType = {
                                imdbID: el.imdbID,
                                Poster: el.Poster,
                                Title: el.Title,
                                Type: el.Type,
                                Year: el.Year,
                            }
                            return <FilmPreview
                                key={el.imdbID}
                                filmPreview={obj}
                                viewFilmHandler={this.props.viewFilmHandler}
                            />
                        }
                    )}

                </div>
            }
            <Pagination
                totalResults={this.props.totalResults}
                onlySwitch={true}
                currentPage={this.props.currentPage}
                setCurrentPage={this.props.setCurrentPage}
                filmName={this.props.filmName}
            />

        </div>
    }
}

export type ResultsPropsType = {
    preloader: boolean
    viewFilmHandler: (imdbID: string) => void
    searchResults: FilmPreviewType[]

    error: string | null
    totalResults: string
    currentPage: number
    setCurrentPage: (currentPage: number) => void
    filmName: string
}

export default React.memo(Results)