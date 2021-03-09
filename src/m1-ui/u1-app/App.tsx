import React from 'react';
import style from '../u3-css/c1-App.module.css'
import {Routes} from "../u4-routes/Routes";
import SearchContainer from "../u2-components/c1-search/SearchContainer";


class App extends React.Component {

  render() {
    return <div className={style.appContainer}>

      <SearchContainer/>
      <Routes/>

    </div>
  }
}

export default React.memo(App);
