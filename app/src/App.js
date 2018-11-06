import React, { Component } from 'react';
import './App.css';
import SimpleCard from "./Components/SimpleCard";
import TabBar from "./Components/TabBar";
import Input from '@material-ui/core/Input';
import TextField from "@material-ui/core/TextField/TextField";


class App extends Component {
    constructor(props) {
        super(props);
        };



    render() {
    return (
        <div>
            <TabBar/>
            <TextField
                id="outlined-full-width"
                label="Search through over 12 000 drinks"
                style={{ margin: 8 }}
                placeholder="Search here!"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <SimpleCard title="Dette kan settes med props" description="Det kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her også" pris="OG prisen!" varenummer="10121514425"/>
        </div>
    );
  }
};

export default App;
