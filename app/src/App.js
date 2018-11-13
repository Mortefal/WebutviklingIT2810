import React, { Component } from 'react';

//import SimpleCard from "./Components/SimpleCard";
import TabBar from "./Components/TabBar";
import InputBar from './Components/inputBar.js';
//import DropDown from './Components/DropDown.js'
import FilterChips from "./Components/FilterChips";
import CardList from './Components/CardList.js';
import FetchFromJson from './utils/fetchFromJson.js';

class App extends Component {
    //TODO: Constructor w/ state for params like ID etc & callback.bind.this()
    // Dropdown & Inputbar can change params in state. Use callback, see P2
    // Set props in CardList to state.params elns
    constructor(props){
        super(props);
        this.state = {
            //callback: ((e) => this.props.callback(e))
            //params: ,
            data: [{"_id:":'', "productType":'', "title":'', "description":'', "pris":'', "varenummer": ''}]
            // ha med name og mer senere ?? title blir name ?
        };
        this.setInputUrlParams = this.setInputUrlParams.bind(this);
        this.setDropDownUrlParams = this.setDropDownUrlParams.bind(this);
    }

    render() {
    return (
        <div>
            <TabBar/>
            <InputBar callback={(e) => this.setInputUrlParams(e)}/>
            {/*<DropDown/>*/}
            <FilterChips/>
            <CardList data={this.state.data}/>
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
    componentDidMount(){
        this.recieveData('Hallo');
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

export default App;
