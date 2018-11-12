import React, { Component } from 'react';

import SimpleCard from "./Components/Cards/SimpleCard";
import TabBar from "./Components/TabBar";
import InputBar from './Components/inputBar.js';
import DropDown from './Components/DropDown.js'
import FilterChips from "./Components/FilterChips";
class App extends Component {

    render() {
    return (
        <div>
            <TabBar/>
            <InputBar/>
            {/*<DropDown/>*/}
            <FilterChips/>
        </div>

    );
  }
}

export default App;
