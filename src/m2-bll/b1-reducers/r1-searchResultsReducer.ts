import {api} from "../../m3-dall/api";
import {Dispatch} from "redux";

type InitialStateType = {
    filmName: string
    preloader: boolean
    currentPage: number
    totalResults: string
    searchResults: FilmPreviewType[]
    error: string | null
}

let initialState: InitialStateType = {
    filmName: "",
    preloader: false,
    currentPage: 1,
    totalResults: "1",
    searchResults: [],
    error: "",
}

export type DispatchActionTypeResults =
    | ReturnType<typeof setFilmName>
    | ReturnType<typeof setPreloader>
    | ReturnType<typeof setSearchResults>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalResults>
    | ReturnType<typeof setError>


export const searchResultsReducer = (state: InitialStateType = initialState, action: DispatchActionTypeResults): InitialStateType => {

    switch (action.type) {

        case "SET_FILM_NAME": {
            return {...state, filmName: action.filmName}
        }

        case "SET_PRELOADER": {
            return {...state, preloader: action.preloader}
        }

        case "SET_CURRENT_PAGE": {
            return {...state, currentPage: action.currentPage}
        }

        case "SET_TOTAL_RESULTS": {
            return {...state, totalResults: action.totalResults}
        }

        case "SET_SEARCH_RESULTS": {
            return {...state, searchResults: action.searchResults}
        }

        case "SET_ERROR": {
            return {...state, error: action.error}
        }

        default:
            return state
    }

}

export const setFilmName = (filmName: string) => {
    return {
        type: "SET_FILM_NAME",
        filmName
    } as const
}

export const setPreloader = (preloader: boolean) => {
    return {
        type: "SET_PRELOADER",
        preloader

    } as const
}

export const setCurrentPage = (currentPage: number) => {
    return {
        type: "SET_CURRENT_PAGE",
        currentPage

    } as const
}
export const setTotalResults = (totalResults: string) => {
    return {
        type: "SET_TOTAL_RESULTS",
        totalResults

    } as const
}

export const setSearchResults = (searchResults: FilmPreviewType[]) => {
    return {
        type: "SET_SEARCH_RESULTS",
        searchResults

    } as const
}

export const setError = (error: string | null) => {
    return {
        type: "SET_ERROR",
        error

    } as const
}

export const getSearchResults = (film: string, page: number = 1) => {
    return (dispatch: Dispatch<DispatchActionTypeResults>) => {
        dispatch(setPreloader(true))
        api.getFilmsByName(film, String(page)).then((res: ResponseType) => {


            if (res.Error) {
                dispatch(setPreloader(false))
                dispatch(setError(`"` + film.trim() + `" - ` + res.Error.toLowerCase()))

            }
            if (!res.Error) {
                dispatch(setError(null))
                dispatch(setFilmName(film))
                dispatch(setPreloader(false))
                dispatch(setTotalResults(res.totalResults))
                dispatch(setSearchResults(res.Search))

            }
        })
    }
}

export type ResponseType = {
    Error?: string
    Response: string
    Search: FilmPreviewType[]
    totalResults: string
}

export type FilmPreviewType = {
    Poster: string
    Title: string
    Type: string
    Year: string
    imdbID: string
}