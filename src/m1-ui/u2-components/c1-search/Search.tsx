import React from "react";
import style from '../../u3-css/c2-Search.module.css'


class Search extends React.Component<SearchComponentPropsType> {

    state: StateType = {
        inputValue: ""
    }


    render() {

        return <div className={style.searchContainer}>

            <div className={style.searchContainer__logo}><h1>Movies_Search</h1></div>


            <div className={style.searchContainer__inputZone}>

                <input type={"text"}
                       className={style.searchContainer__inputZone__input}
                       autoFocus={true}
                       placeholder={"Enter name of movie "}
                       value={this.state.inputValue}
                       onChange={(e) => {
                           this.setState({inputValue: e.target.value})
                       }}
                       onKeyPress={(e) => {
                           e.key === "Enter" && this.props.searchHandler(this.state.inputValue)
                       }}
                />

                <button
                    className={style.searchContainer__inputZone__button}
                    onClick={() => this.props.searchHandler(this.state.inputValue)}>
                    Search
                </button>

            </div>
        </div>
    }
}

type StateType = {
    inputValue: string
}


export type SearchComponentPropsType = {
    searchHandler: (inputValue: string) => void
}


export default React.memo(Search)