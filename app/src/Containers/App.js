import React, { Component } from 'react';
import TabBar from "./TabBar";
import InputBar from './inputBar.js';
import FilterChips from "./FilterChips";
import CardList from '../Components/CardList.js';
import FetchFromJson from '../utils/fetchFromJson.js';
import PropTypes from 'prop-types';
import {connect}from 'react-redux';

class App extends Component {
    //TODO: Constructor w/ state for params like ID etc & callback.bind.this()
    // Dropdown & Inputbar can change params in state. Use callback, see P2
    // Set props in CardList to state.params elns
        static propTypes = {
            filterArray: PropTypes.array.isRequired,
            productData: PropTypes.array.isRequired,
            isFavorite: PropTypes.bool.isRequired,
            dispatch: PropTypes.func.isRequired,
    };


    componentDidMount() {
        const {dispatch, getAllFilters} = this.props;
        dispatch();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.getAllFilters !== this.props.allFilters) {
            const {dispatch, getAllFilters} = nextProps;
            dispatch((getAllFilters))
        }
    };

    handleRefreshClick = e => {
        e.preventDefault()
    };


    render() {
        let cardList;
        if (this.props.productData){
            cardList = <CardList data={this.props.productData}/>
        }
        else {
            cardList = <p>Data not yet available </p>
        }
        return (
            <div>
                <TabBar/>
                <InputBar callback={(e) => this.setInputUrlParams(e)}/>
                {/*<DropDown/>*/}
                <FilterChips/>
                {cardList}
            </div>
        );
    }

    updateSeachParams(newParams){
        // Butt beware: only partly new params


    }

    setInputUrlParams(params){
        //this.setState(....)
     /* try{
          let newPoemKey = this.state.data[this.state.key].poemUrl[e["title"]];
          console.log(newPoemKey);
          this.setState({
              ...this.state,
              poemUrl: newPoemKey
          });
      }catch (e) {
          console.log(e);
      }*/
    }

    setDropDownUrlParams(params){
        //this.setState(....)
      /*try {
          let newSvgKey = this.state.data[this.state.key].svgUrl[e["title"]];
          this.setState({
              ...this.state,
              svgUrl: newSvgKey
          });
      }
      catch (e) {
          console.log(e);
      }*/
    }

    componentWillUpdate(){
       //  this.recieveData()

    }


    recieveData(stringArgs){
        //stringArgs ~= "_id=igouhreso87ey4"

        //TODO: Use fetch util to get JSON data
        let fetcher = new FetchFromJson('http://localhost:3000/beverages/search');
        fetcher.fetchFromString("productType=Rødvin", ((data) => {
            console.log(data[0]);
            this.setState({
                ...this.state,
                data: data
            })
        }));
        //JSON Data ~= [{_id=goin5e7h5, name=..., ....}, {...}, ...]
        //JSON data[0] = {_id=gliren74, ...}
    }
}
const mapStateToProps = state => {
    const { getAllFilters, products } = state
    const {
        filterArray,
        productData,
    } = products[getAllFilters] || {
        filterArray: [],
        productData: []
    }

    return {
        getAllFilters,
        filterArray,
        productData,
    }
}

export default App;
