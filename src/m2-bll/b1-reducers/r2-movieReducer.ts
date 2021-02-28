import {Dispatch} from "redux";
import {api} from "../../m3-dall/api";
import {AxiosResponse} from "axios";
import {DispatchActionTypeResults, setPreloader} from "./r1-searchResultsReducer";


let initialState: InitialStateType = {
    movie: {
        Title: "",
        Year: "",
        Runtime: "",
        Genre: "",
        Director: "",
        Actors: "",
        Plot: "",
        Language: "",
        Country: "",
        Poster: "",
        imdbRating: "",
        imdbID: "",
        Type: "",
        BoxOffice: "",
        Production: "",
    }
}

export type DispatchActionTypeMovie =
    | ReturnType<typeof setMovie>


export const movieReducer = (state: InitialStateType = initialState, action: DispatchActionTypeMovie): InitialStateType => {

    switch (action.type) {

        case "SET_MOVIE": {
            return {...state, movie: action.movie}
        }
        default:
            return state
    }

}

export const setMovie = (movie: MovieType | null) => {
    return {
        type: "SET_MOVIE",
        movie
    } as const
}


export const getMovie = (filmId: string) => {
    return (dispatch: Dispatch<DispatchActionTypeMovie | DispatchActionTypeResults>) => {
        dispatch(setPreloader(true))
        api.getFilmByImdbId(filmId).then((res: AxiosResponse<MovieType>) => {
            dispatch(setMovie(res.data))
            dispatch(setPreloader(false))
        })
    }
}

type InitialStateType = {
    movie: MovieType | null
}

export type MovieType = {
    Title: string
    Year: string
    Runtime: string
    Genre: string
    Director: string
    Actors: string
    Plot: string
    Language: string
    Country: string
    Poster: string
    imdbRating: string
    imdbID: string
    Type: string
    BoxOffice: string
    Production: string
}
