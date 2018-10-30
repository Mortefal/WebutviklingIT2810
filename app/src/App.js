import React, { Component } from 'react';
import './App.css';
import SimpleCard from "./Components/SimpleCard";


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
    return (
        <div>
            <SimpleCard title="Dette kan settes med props" description="Det kan det her også" pris="OG prisen!"/>
        </div>
    );
  }
};

export default App;
