import React, { Component } from 'react';
import TabBar from "./TabBar";
import InputBar from './inputBar.js';
import FilterChips from "./FilterChips";
import CardList from '../Components/CardList.js';
import FetchFromJson from '../utils/fetchFromJson.js';

class App extends Component {

    /*
    * Big constructor with a massive state:
    * We realize that this is not using redux, however after a lot of trial and more errors, we found it necessary to
    * work around redux in order for everything to work.
    *
    * Using redux, all the buttons would've dispatched actions, in which the calls to the REST API would be executed.
    * Subsequently, reducers would reduce those actions to state changes in the global state, and the various components
    * such as CardList would update their content based upon the new content of the state.
    * */
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

    // Simple straight-forward function to parse this.state into a string usable in and url when sending GET-requests to
    // the REST API.
    generateStringArgs(page=this.state.page){
        let queryString = '';

        // First determine if name should be included:
        if (this.state.name !== '' && this.state.name){
            queryString += "name=" + this.state.name;
        }

        // Then type. Notice we'll add a '&' if we've added some parameter earlier.
        if (this.state.type !== '' &&  this.state.type){
            queryString += (queryString.length > 0) ? '&' : '';
            queryString += "productType=" + this.state.type;
        }
        if(this.state.sortOrder && queryString.length > 0){
            queryString += (queryString.length > 0) ? '&' : '';
            queryString += '&sort=' +this.state.sortOrder;

        }
        let pageString = '&page=' + page;
        queryString += queryString.length > 0 ? pageString : '';

        return queryString; // queryString looks something like "name=Chenet&page=2" for instance.
    }

    // Function which updates the products. Called when by all the functions which change parameters.
    // As discussed above, this is hardly according to redux - this should've been an action dispatched by other actions.
    async reloadProduct(page){
        let stringArgs = this.generateStringArgs(page);
        let fetcher = this.state.fetcher;
        return new Promise(async function(resolve){
            if (stringArgs.indexOf('name') >= 0 || stringArgs.indexOf('productType') >= 0) {
                let data = await fetcher.fetchFromString(stringArgs);
                resolve(data);
            }
        })

    }
    // Should also have been an action
    async onNextProduct(){
        // Take notice we're processing for the next page, but not changed page yet.
        // Since the next page's data is already loaded, the nextData for the next page, is the data 2 pages ahead.
        // The next-button is disabled once nothing loads on the next page.
        let nextData = await this.reloadProduct(this.state.page +2);
        this.setState({
            ...this.state,
            data : this.state.nextData,
            nextData : nextData,
            page: this.state.page +1,
            nextButtonDisabled: nextData.length === 0,
            prevButtonDisabled: false

        });
        await this.updateSearches();
    }

    // As admitted: this should also have been an action.
    async onPrevProduct(){
        if(this.state.page > 1) {
            let prevData = await this.reloadProduct(this.state.page - 1);
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
            await this.onNewQuery();
        }
        await this.updateSearches();
    }

    // Should've been an action too.
    // Called when parameters change such that the dataset is new, i.e. new type or name.
    async onNewQuery(){
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


    handleRefreshClick = e => {
        e.preventDefault()
    };

    handleChange(e, order) {
        this.setState({
            ...this.state,
            selectedOption: e.target.value,
            sortOrder: order
        }, () => this.onNewQuery())
    };


    render() {
        // Effectively renders the whole.
        // Due to massive issues with redux, we did also not have time to properly encapsulate all the components.
        return (
            <div>
                <TabBar/>
                <InputBar callback={(e) => this.setInputUrlParams(e)}/>
                {/*TODO: hvor kalle denne callbacken ? usikker. */}
                <p> Previous searches:
                    <ul>
                        {this.state.history.map((item) => {
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

    // Also ideally an action.
    // Updates the search-histpry based on the most popular searches.
    async updateSearches(){
        let history = await this.state.historyFetcher.fetchFromString('');

        let items = Object.keys(history).map(function(key) {
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
        this.setState({
            ...this.state,
            name: params
        }, () => {
            this.onNewQuery();
            this.updateSearches()});
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
    }


    recieveData(stringArgs){
        let fetcher = new FetchFromJson('http://it2810-15.idi.ntnu.no:3000/beverages/search');
        fetcher.fetchFromString("productType=Rødvin", ((data) => {
            console.log(data[0]);
            this.setState({
                ...this.state,
                data: data
            })
        }));
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

export default App;
