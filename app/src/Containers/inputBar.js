import React, { Component } from 'react'
import '../CSS/inputStyle.css';
//import {applyMiddleware as dispatch} from "redux";
import connect from "react-redux/es/connect/connect";
import {getQuery} from '../Actions/actions';
//import setQuery from "../Actions/actions";
import configureStore from "../Store/configureStore";

let store = configureStore();

/*
*   INPUT-BAR:
*   Here we successfully set the state of the query in the store with redux, this happens on 'onSubmit' of the form.
*   The component in itself is a simple form with an input field and submit field.
*/

class InputBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({query: event.target.value});
    }

    handleSubmit() {
        this.setState({query: ''});
        this.props.callback(this.state.query);
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
                        this.handleSubmit();
                        //set query value to '' after a search has been made
                        query.value = '';
                    }} className="form">
                    <label className="label">
                        <input ref={node => query = node} value={this.state.query} type="Text" class="input"
                               className="input" onChange={this.handleChange} placeholder="Søk etter varer her... "/>
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
