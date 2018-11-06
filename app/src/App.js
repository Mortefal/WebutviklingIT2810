import React, { Component } from 'react';

import SimpleCard from "./Components/SimpleCard";
import TabBar from "./Components/TabBar";
import Input from '@material-ui/core/Input';
import TextField from "@material-ui/core/TextField/TextField";
import InputBar from './Components/inputBar.js';

class App extends Component {
    constructor(props) {
        super(props);
        };
    render() {
    return (
        <div>
            <TabBar/>
            <InputBar/>
            <SimpleCard title="Dette kan settes med props" description="Det kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her også" pris="OG prisen!" varenummer="10121514425"/>
        </div>

    );
  }
};

export default App;
