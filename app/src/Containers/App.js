import React, { Component } from 'react';
import TabBar from "./TabBar";
import InputBar from './inputBar.js';
import FilterChips from "./FilterChips";
import CardList from '../Components/CardList.js';
import FetchFromJson from '../utils/fetchFromJson.js';
import PropTypes from 'prop-types';
import {connect}from 'react-redux';
import SimpleCard from "./SimpleCard";
import configureStore from "../Store/configureStore";
import {fetchProductsIfNeeded, searchServer,} from '../Actions/actions';
let store = configureStore();


class App extends Component {
    constructor(props) {
        super(props);
        this.state= {
            selectedOption : 'DescName',
            sortOrder: '',
            data: [],
            fetcher: new FetchFromJson('http://it2810-15.idi.ntnu.no:3000/beverages/search'),
            historyFetcher: new FetchFromJson('http://it2810-15.idi.ntnu.no:3000/beverages/history'),
            history: [],
            nextData: null,
            name: null,
            type: null,
            page: 1,
            hasNextPage: false,
            nextButtonDisabled: true,
            prevButtonDisabled: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.setInputUrlParams = this.setInputUrlParams.bind(this);
        this.onNextProduct = this.onNextProduct.bind(this);
        this.onPrevProduct = this.onPrevProduct.bind(this);
        this.reloadProduct = this.reloadProduct.bind(this);

    }
    generateStringArgs(page=this.state.page){
        let queryString = '';

        /*if(this.props.name !== '' && this.props.name) {
            this.setState({
                ...this.state,
                name: this.props.name
            });
            queryString += "name=" + this.props.name;
        }*/
        if (this.state.name !== '' && this.state.name){
            /*this.setState({
                ...this.state,
                name: this.state.name
            });*/
            queryString += "name=" + this.state.name;
        }

        /*if(this.props.type !== '' && this.props.type) {
            queryString += (queryString.length > 0) ? '&' : '';

            this.setState({
                ...this.state,
                type: this.props.type
            });
            queryString += "productType=" + this.props.type;
        }*/
        if (this.state.type !== '' &&  this.state.type){
            /*this.setState({
                ...this.state,
                type: this.props.type
            });*/
            queryString += (queryString.length > 0) ? '&' : '';
            queryString += "productType=" + this.state.type;
        }
        if(this.state.sortOrder && queryString.length > 0){
            queryString += (queryString.length > 0) ? '&' : '';
            queryString += '&sort=' +this.state.sortOrder;

        }
        // TODO: Add page
        let pageString = '&page=' + page;
        queryString += queryString.length > 0 ? pageString : '';

        return queryString;
    }

    async reloadProduct(page){
        let stringArgs = this.generateStringArgs(page);
        // onsole.log(stringArgs);
        let fetcher = this.state.fetcher;
        let url = this.url;
        return new Promise(async function(resolve){
            if (stringArgs.indexOf('name') >= 0 || stringArgs.indexOf('productType') >= 0) {
                // console.log(stringArgs);
                let data = await fetcher.fetchFromString(stringArgs);
                resolve(data);
            }
        })

    }

    async onNextProduct(){
        // TODO: Set data to nextData, call reloadProduct with next page, set nextData to new data
        //console.log(this.state);
        let nextData = await this.reloadProduct(this.state.page +2);
        // console.log("Next Page");
        // console.log(this.state);
        //console.log(nextData);
        this.setState({
            ...this.state,
            data : this.state.nextData,
            nextData : nextData,
            page: this.state.page +1,
            nextButtonDisabled: nextData.length === 0,
            prevButtonDisabled: false

        })
        // Must be called when page changes
        // TODO: Disable next button if nextData.length === 0
        this.updateSearches();
    }

    async onPrevProduct(){
        // TODO: Set nextData to data, call reloadProduct with prev page, set data to new data
        if(this.state.page > 1) {
            let prevData = await this.reloadProduct(this.state.page - 1);
            //console.log("Prev Page");
            //console.log(this.state);
            this.setState({
                ...this.state,
                nextData: this.state.data,
                data: prevData,
                page: this.state.page -1,
                prevButtonDisabled: this.state.page -1 <= 1,
                nextButtonDisabled: this.state.data.length === 0
            });
        }
        else{
            // console.log("Error in prevpage");
            this.onNewQuery();
        }
        this.updateSearches();
    }

    async onNewQuery(){
        // TODO: Set page to 1, run reloadData with (d) => setState(..., data: d)  and with (nd) => setState(..., nextData: nd)
        // Must be called when name or type changes.
        let data = await this.reloadProduct(1);
        let nextData = await this.reloadProduct(2);

        this.setState({
            ...this.state,
            page: 1,
            prevButtonDisabled: true,
            data: data,
            nextData: nextData,
            nextButtonDisabled: nextData.length === 0
        });
    }

        //TODO: Constructor w/ state for params like ID etc & callback.bind.this()
    // Dropdown & Inputbar can change params in state. Use callback, see P2
    // Set props in CardList to state.params elns

    componentDidMount() {
        //store.dispatch(fetchAllFiltersIfNeeded(productData))
        //const {productData, filterArray, isFavorite, query} = this.props;
        //dispatch(fetchAllFiltersIfNeeded(productData))
        //store.dispatch(fetchAllFilters())
    }

    /*
    componentWillReceiveProps(nextProps) {
        if (nextProps.getAllFilters !== this.props.allFilters) {
            const {dispatch, getAllFilters} = nextProps;
            dispatch((getAllFilters))
        }
    };*/

    handleRefreshClick = e => {
        e.preventDefault()
    };

    handleChange(e, order) {
        // console.log("order: ");
        // console.log(order);
        this.setState({
            ...this.state,
            selectedOption: e.target.value,
            sortOrder: order
        }, () => this.onNewQuery())
    };


    render() {
        return (
            <div>
                <TabBar/>
                <InputBar callback={(e) => this.setInputUrlParams(e)}/>
                {/*TODO: hvor kalle denne callbacken ? usikker. */}
                <p> Previous searches:
                    <ul>
                        {this.state.history.map((item, index) => {
                            console.log(item);
                            return (<li>
                                    {item[0]}
                                </li>);
                        }
                            )
                        }
                    </ul>
                </p>
                <FilterChips callback ={(e) => this.setFilterUrlParams(e)}/>
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
                <CardList data={this.state.data}/>
                <div>
                    <button disabled={this.state.prevButtonDisabled} onClick ={(e) => this.onPrevProduct(e)}>Prev</button>
                    <button disabled={this.state.nextButtonDisabled} onClick={(e) => this.onNextProduct(e)}>Next</button>
                </div>
            </div>
        );
    }

    updateSeachParams(newParams){
        // Butt beware: only partly new params


    }
    async updateSearches(){
        let history = await this.state.historyFetcher.fetchFromString('');

        var items = Object.keys(history).map(function(key) {
            return [key, history[key]];
        });

        // Sort the array based on the second element
        let sortedHistory = items.sort(function(first, second) {
            return second[1] - first[1];
        });
        this.setState({
            ...this.state,
            history: sortedHistory.slice(0,5)
        });
    }

    setInputUrlParams(params){
        // console.log(params);
        this.setState({
            ...this.state,
            name: params
        }, () => {
            this.onNewQuery();
            this.updateSearches()});
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

    setFilterUrlParams(params){
        console.log(params);
        this.setState({
            ...this.state,
            type: params
        }, () => {
            this.onNewQuery();
            this.updateSearches()
        });
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
/*
const mapDispatchToProps = dispatch => {
    return{
// const mapDispatchToProps = dispatch => {
//     return{
//
//     }
// };

    }
};*/


export default App;
