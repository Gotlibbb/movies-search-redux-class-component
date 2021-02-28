import React from "react";
import Search, {SearchComponentPropsType} from "./Search";
import {RouteComponentProps, withRouter} from "react-router-dom";
import { compose } from "redux";

class SearchContainer extends React.Component <RouteComponentProps, SearchComponentPropsType>{

    render() {

        const searchHandler = (value: string) => {

            this.props.history.push(`/movies-search-redux-func/search-results/` + value + `/` + 1)
        }

            return <Search
            searchHandler={searchHandler}
        />
    }
}


export default compose<Function>((React.memo, withRouter)(SearchContainer))