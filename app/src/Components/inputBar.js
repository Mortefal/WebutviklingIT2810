import React, { Component } from 'react'
import '../CSS/inputStyle.css';
import CardList from './CardList';
import SimpleCard from "./SimpleCard";
//import CardList from './CardList';
//import SimpleCard from "./SimpleCard";

export default class InputBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            queryId: 0,
            query: '',
            previousQueries: [],
            results:[],
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

    saveQuery(){
        let queries = [...this.state.previousQueries];   //creating the copy
        let id = this.state.queryId + 1;
        //adding new data
        if(this.state.query){
            queries.push({
                id: id,
                query: this.state.query
            });
        }

        //updating the state value
        this.setState({previousQueries: queries, queryId: id});
    }

    handleSubmit(event) {
        //gjøre noe her med input
        console.log(this.state.query);
        event.preventDefault();
        this.saveQuery();
        console.log(this.state.previousQueries);
        //this.getInfo();
        this.setState({query: ''});
    }

    render() {
        return (
            <div className="container">
            <form onSubmit={this.handleSubmit} className="form">
                {/*<h3 className="headText">Search: </h3>*/}
                <label className="label">
                    <input type="text" placeholder="Søk etter varer her..." value={this.state.query} onChange={this.handleChange} className="input"/>
                </label>
                <input type="submit" value="Søk" className="submit"/>
            </form>
            </div>
        );
    }
}
