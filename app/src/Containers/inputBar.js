import React, { Component } from 'react'
import '../CSS/inputStyle.css';
import CardList from '../Components/CardList';
import SimpleCard from "./SimpleCard";
import {applyMiddleware as dispatch} from "redux";
import connect from "react-redux/es/connect/connect";
import {getQuery} from '../Actions/actions';

import setQuery from "../Actions/actions";
import configureStore from "../Store/configureStore";

let store = configureStore();
//import CardList from './CardList';
//import SimpleCard from "./SimpleCard";

class InputBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryId: 0,
            query: '',
            //previousQueries: [],
            results: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({query: event.target.value});
    }

    /*getInfo(){
        //now logikk for å hente ut ting fra databasen, FETCH API greier, vetikke finne ut av senere
        //    .then(({ data }) => {
        this.setState({
            results: ['hei'] //data.data?
        });
        console.log("results: " + this.state.results);
    }*/

    /*
        saveQuery() {
            let queries = [...this.state.previousQueries];   //creating the copy
            let id = this.state.queryId + 1;
            //adding new data
            if (this.state.query) {
                queries.push({
                    id: id,
                    query: this.state.query
                });
            }

            //updating the state value
            this.setState({previousQueries: queries, queryId: id});
        }*/
    handleSubmit(event) {
        //gjøre noe her med input
        console.log("memes")
        console.log(this.state.query);
        //event.preventDefault();
        //console.log(this.state.previousQueries);
        //this.getInfo();
        this.setState({query: ''});
    }

    render() {
        let query;
        return (
            <div className="container">
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        if (!query.value.trim()) {
                            return
                        }
                        store.dispatch(getQuery(query.value));
                        let data = store.getState();
                        console.log(data.getQuery);
                        this.handleSubmit();
                        query.value = '';

                    }} className="form">
                {/*<form onSubmit={this.handleSubmit} className="form">*/}
                    {/*<h3 className="headText">Search: </h3>*/}
                    <label className="label">
                        <input ref={node => query = node} value={this.state.query}
                               className="input" onChange={this.handleChange}/>
                        {/*<input type="text" placeholder="Søk etter varer her..." value={this.state.query} onChange={this.handleChange} className="input"/>*/}
                    </label>
                    <input type="submit" value="Søk" className="submit"/>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        query: state.query
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getQuery: query => dispatch(getQuery(query)),
    };
};

InputBar = connect(mapStateToProps, mapDispatchToProps)(InputBar);

export default InputBar;
