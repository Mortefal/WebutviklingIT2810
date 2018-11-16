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

class InputBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryId: 0,
            query: '',
            results: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({query: event.target.value});
    }

    handleSubmit(event) {
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
                        let data = store.getState();
                        console.log(data.getQuery);
                        this.handleSubmit();
                        query.value = '';
                    }} className="form">
                    <label className="label">
                        <input ref={node => query = node} value={this.state.query}
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
