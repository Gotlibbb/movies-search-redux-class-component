import React from "react";
import style from "../../u3-css/c3r2-Pagination.module.css";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";


class Pagination extends React.Component<PaginationPropsType> {
    state: { inputPage: string } = {
        inputPage: ""
    }

    render() {


        let pageSize = 10
        let pageCount: number | undefined = Math.ceil(Number(this.props.totalResults) / pageSize);

        let pages: number[] = [];

        for (let i = 0; i <= pageCount; i++) {
            pages.push(i)
        }

        const pushUrl = (page: string) => {
            this.props.history.push(`/movies-search-redux-func/search-results/` + this.props.filmName + `/` + page)
        }


        if (pageCount >= 10) {
            let errorInput: boolean = Number(this.state.inputPage) >= pages.length || Number(this.state.inputPage) <= 0
            let errorButton: boolean = this.props.currentPage + 1 >= pages.length || this.props.currentPage <= 0

            let pageHandler = this.props.currentPage

            return <div
                className={style.toggleBlock}
                style={this.props.onlySwitch ? {justifyContent: "center"} : {}}
            >
                <div
                    className={style.changePage}
                    hidden={this.props.onlySwitch}
                >
                    <div hidden={this.props.onlySwitch}>Change page:</div>
                    <input hidden={this.props.onlySwitch} type="number" value={this.state.inputPage}
                           onChange={(e) => {
                               this.setState({inputPage: e.currentTarget.value})
                           }}
                           onKeyPress={(e) => {

                               if (e.key === "Enter" && !errorInput) {
                                   // props.setCurrentPage(Number(inputPage))
                                   // props.searchingFilm(inputPage)
                                   pushUrl(this.state.inputPage)

                               }

                           }}
                    />

                    <button hidden={this.props.onlySwitch}
                            onClick={() => {
                                // props.setCurrentPage(Number(inputPage))
                                // props.searchingFilm(inputPage)
                                pushUrl(this.state.inputPage)
                            }}
                            disabled={errorInput}
                    >↪
                    </button>
                </div>

                <div
                    className={style.pageToggle}

                >
                    {this.props.currentPage !== 1 &&
                    <button onClick={() => {
                        this.props.onlySwitch && window.scrollTo(0, 300)
                        pushUrl(String(pageHandler -= 1))


                    }}>⇐...prev </button>}
                    <div className={style.currentPage}> {this.props.currentPage} </div>
                    <button
                        disabled={errorButton}
                        onClick={() => {
                            this.props.onlySwitch && window.scrollTo(0, 300)
                            pushUrl(String(pageHandler += 1))


                        }}> next...⇒
                    </button>
                </div>

                <div
                    className={style.totalPage}
                    hidden={this.props.onlySwitch}
                >Total pages: {pages.length - 1}</div>
            </div>


        }


        return <div className={style.pagesBlock}>
            {pages.map(p => {
                return <span hidden={p === 0}
                             key={p}
                             className={this.props.currentPage === p ? style.checked : " "}
                             onClick={
                                 () => {

                                     pushUrl(String(p))
                                 }
                             }>
                {p}
            </span>
            })}
        </div>

    }
}

type PaginationPropsType = RouteComponentProps & {
    totalResults: string | undefined
    setCurrentPage: (currentPage: number) => void
    currentPage: number
    filmName: string
    onlySwitch?: boolean


}

export default compose<Function>(React.memo, withRouter)(Pagination)
