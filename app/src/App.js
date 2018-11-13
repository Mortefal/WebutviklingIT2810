import React, { Component } from 'react';

import { Provider } from "react-redux"
import store from "./store"

import SimpleCard from "./Components/SimpleCard";
import TabBar from "./Components/TabBar";
import InputBar from './Components/inputBar.js';
import DropDown from './Components/DropDown.js'
import FilterChips from "./Components/FilterChips";
class App extends Component {

    render() {
    return (
        <Provider store={store}>
            <div>
                <TabBar/>
                <InputBar/>
                {/*<DropDown/>*/}
                <FilterChips/>
            </div>
        </Provider>
    );
  }
}

export default App;
