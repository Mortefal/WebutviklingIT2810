import React, { Component } from 'react'

export default class InputBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            queryId: 0,
            query: '',
            previousQueries: [],
            results:[]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({query: event.target.value});
    }

    getInfo(){
        //now logikk for å hente ut ting fra databasen, FETCH API greier, vetikke finne ut av senere
        //    .then(({ data }) => {
        this.setState({
            results: ['hei'] //data.data?
        });
        console.log("results: " + this.state.results);
    }

    saveQuery(){
        let queries = [...this.state.previousQueries];   //creating the copy
        let id = this.state.queryId + 1;
        //adding new data
        queries.push({
            id: id,
            query: this.state.query
        });

        //updating the state value
        this.setState({previousQueries: queries, queryId: id});
    }

    handleSubmit(event) {
        //gjøre noe her med input
        console.log(this.state.query);
        event.preventDefault();
        this.saveQuery();
        console.log(this.state.previousQueries);
        this.getInfo();
        this.setState({query: ''});

    }
    render() {
        return (
            <div>
            <form onSubmit={this.handleSubmit} style={{display: 'block'}}>
                <h3>Search</h3>
                <label>
                    <input type="text" value={this.state.query} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            </div>
        );
    }
}
