import React, { Component } from 'react';
import TabBar from "./TabBar";
import InputBar from './inputBar.js';
import FilterChips from "./FilterChips";
import CardList from '../Components/CardList.js';
import FetchFromJson from '../utils/fetchFromJson.js';
import PropTypes from 'prop-types';
import {connect}from 'react-redux';
import rootReducer from '../Reducers/reducers';
import {fetchAllFilters} from "../Actions/actions";
import {applyMiddleware as dispatch} from "redux";
import SimpleCard from "./SimpleCard";
import configureStore from "../Store/configureStore";

let store = configureStore();


class App extends Component {
    constructor(props) {
        super(props);
        this.state= {
            selectedOption : 'DescName',
            sortOrder: '',
            data: [{'title': 'N/A', 'pris': 'N/A', 'varenummer':'N/A', 'taste': 'N/A', 'aroma': 'N/A, ',
                'country': 'N/A', 'abv':'N/A'}],
            fetcher: new FetchFromJson('http://it2810-15.idi.ntnu.no:3000/beverages/search'),
            nextData: null,
            name: null,
            type: null,
            page: 1,
            hasNextPage: false,
            nextButtonDisabled: false,
            prevButtonDisabled: false
        };
        this.handleChange = this.handleChange.bind(this);

    }
    generateStringArgs(page=this.state.page){
        let queryString = '';

        if(this.props.name !== '' && this.props.name) {
            this.setState({
                ...this.state,
                name: this.props.name
            });
            queryString += "name=" + this.props.name;
        }
        else if (this.state.name !== '' && this.state.name){
            queryString += "name=" + this.state.name;
        }

        if(this.props.type !== '' && this.props.type) {
            queryString += (queryString.length > 0) ? '&' : '';

            this.setState({
                ...this.state,
                type: this.props.type
            });
            queryString += "productType=" + this.props.type;
        }
        else if (this.state.type !== '' &&  this.state.type){
            queryString += "productType=" + this.state.type;
        }

        if(this.props.sortOrder && queryString.length > 0){
            queryString += (queryString.length > 0) ? '&' : '';
            queryString += '&sort=' +this.props.sortOrder;

        }
        // TODO: Add page
        let pageString = '&page=' + page;
        queryString += queryString.length > 0 ? pageString : '';

        return queryString;
    }

    reloadProduct(callback, page=this.state.page){
        let stringArgs = this.generateStringArgs();
        console.log(stringArgs);
        if (stringArgs.indexOf('name') >= 0 || stringArgs.indexOf('productType') >= 0) {
            // console.log(stringArgs);
            this.state.fetcher.fetchFromString(stringArgs, (data) => {
                callback(data);
            });
            stringArgs.replace(/page=\d/, 'page=' + this.state.page + 1);
        }
    }

    onNextProduct(){
        // TODO: Set data to nextData, call reloadProduct with next page, set nextData to new data
        function callack(){
            this.setState({
                ...this.state,
                data : this.state.nextData,
                nextData : '',
            })
        }
        // Must be called when page changes
        // TODO: Disable next button if nextData.length === 0
    }
    onPrevProduct(){
        // TODO: Set nextData to data, call reloadProduct with prev page, set data to new data
        function callback(prevData) {
            this.setState({
                ...this.state,
                nextData: this.state.data,
                data: prevData,
                page: this.page -1,
                prevButtonDisabled: this.page -1 === 1
            })
        }


        // Must be called when page changes
        // TODO: Disable 'prev' button if page == 1
    }
    onNewQuery(){
        // TODO: Set page to 1, run reloadData with (d) => setState(..., data: d)  and with (nd) => setState(..., nextData: nd)
        // Must be called when name or type changes.
    }

        //TODO: Constructor w/ state for params like ID etc & callback.bind.this()
    // Dropdown & Inputbar can change params in state. Use callback, see P2
    // Set props in CardList to state.params elns

    componentDidMount() {
        //store.dispatch(fetchAllFiltersIfNeeded(productData))
        const {productData, filterArray, isFavorite, query} = this.props;
        //dispatch(fetchAllFiltersIfNeeded(productData))
        store.dispatch(fetchAllFilters())
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

    handleChange(e, order) {
        console.log("order: ")
        console.log(order)
        this.setState({
            ...this.state,
            selectedOption: e.target.value,
            sortOrder: order
        });
    };


    render() {
        let cardList;
        let data = store.getState();
        console.log(data.getQuery);
        // console.log(data.getQuery)
        // console.log(store.getState());

        return (
            <div>
                <TabBar/>
                <InputBar callback={(e) => this.setInputUrlParams(e)}/>
                {/*<DropDown/>*/}
                <FilterChips/>
                <form>
                    <label>
                        <input type="radio" value="DescName"
                               checked={this.state.selectedOption === 'DescName'}
                               onChange={(e) =>this.handleChange(e,'name')} />
                        Desc navn
                    </label>
                    <label>
                        <input type="radio" value="Asc"
                               checked={this.state.selectedOption === 'Asc'}
                               onChange={(e) =>this.handleChange(e, 'price_1')} />
                        Asc Pris
                    </label>
                    <label>
                        <input type="radio" value="Desc"
                               checked={this.state.selectedOption === 'Desc'}
                               onChange={(e) =>this.handleChange(e,'price_-1')} />
                        Desc Pris
                    </label>
                </form>
                <CardList name={this.state.name} type={this.state.type} sortOrder={this.state.sortOrder}/>
                <div>
                    <button>Prev</button><button>Next</button>
                </div>
            </div>
        );
    }

    updateSeachParams(newParams){
        // Butt beware: only partly new params


    }

    setInputUrlParams(params){
        console.log(params);

        this.setState({
            ...this.state,
            name: params
        })
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
        let fetcher = new FetchFromJson('http://it2810-15.idi.ntnu.no:3000/beverages/search');
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
    const { getAllFilters, products } = state;
    const {
        filterArray,
        productData,
    } = products[getAllFilters] || {
        filterArray: [],
        productData: []
    };

    return {
        getAllFilters,
        filterArray,
        productData,
        query: state.getQuery().query
}
};
const mapDispatchToProps = dispatch => {
    return{

    }
};



export default App;
