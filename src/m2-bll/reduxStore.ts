import {applyMiddleware, combineReducers, createStore, Store} from "redux";
import {searchResultsReducer} from "./b1-reducers/r1-searchResultsReducer";
import {movieReducer} from "./b1-reducers/r2-movieReducer";
import thunkMiddleware from "redux-thunk"

let rootReducer = combineReducers({

    searchResults: searchResultsReducer,
    movie: movieReducer,

})

export let store: Store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;