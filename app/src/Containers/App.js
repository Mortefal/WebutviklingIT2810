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
        this.handleChange = this.handleChange.bind(this);

    }




    componentDidMount(){
        const {dispatch, products} = this.props;
        dispatch(fetchProductsIfNeeded(products));
        //Ta inn alle filtre
    }
    componentDidUpdate(prevProps){
        if (this.props.products !== prevProps.products){
            const {dispatch, products} = this.props;
            dispatch(fetchProductsIfNeeded(products));
        }
    }

    handleChange(newProduct){
        this.props.dispatch(searchServer(newProduct));
        this.props.dispatch(fetchProductsIfNeeded(newProduct));
    }

    render() {
        const {initialProductProps, products, isFetching } = this.props;
        let cardList;
        let data = store.getState()
        console.log(data.getQuery)
        if (this.props.productData){
            cardList = <CardList data={this.props.productData}/>
        }
        else {
            cardList = <p>Data not yet available </p>
        }
        console.log(store.getState())
        return (
            <div>
                <TabBar/>
                <InputBar callback={(e) => this.setInputUrlParams(e)}/>
                {/*<DropDown/>*/}
                <FilterChips/>
                {cardList}
                <SimpleCard title="hei" pris={123} varenummer={1234567} taste="kake" aroma="vanilje" country="Tjekkoslovakia" abv={96.6}/>
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

App.propTypes = {
    initialProductProps: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}
function mapStateToProps(state) {
    const { initialProductProps, productsFromServer } = state;
    const { isFetching, product: products } = productsFromServer[initialProductProps] || {isFetching: true, product: []};
  return {
      initialProductProps,
      products,
      isFetching,
  }
}



export default connect(mapStateToProps)(App);
