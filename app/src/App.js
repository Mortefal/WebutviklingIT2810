import React, { Component } from 'react';

import SimpleCard from "./Components/SimpleCard";
import TabBar from "./Components/TabBar";
import InputBar from './Components/inputBar.js';
import DropDown from './Components/DropDown.js';
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
        //this.onStateChange = onstatechange
        this.setInputUrlParams = this.setInputUrlParams.bind(this);
        this.setDropDownUrlParams = this.setDropDownUrlParams.bind(this);
    }

    render() {
        return (
            <div>
                <TabBar/>
                <InputBar callback={(e) => this.setInputUrlParams(e)}/>
                <DropDown callback={(e) => this.setDropDownUrlParams(e)}/>
                {/* TODO: Add CardList add  data=[{_id=goin5e7h5, name=..., ....}] to Cardlist*/}
                <CardList data={this.state.params}/>
                <SimpleCard title="Dette kan settes med props" description="Det kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her også" pris="OG prisen!" varenummer="10121514425"/>
                <SimpleCard title="Dette kan settes med props" description="Det kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her også" pris="267" varenummer="10121514425"/>
                <SimpleCard title="Dette kan settes med props" description="Det kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her også" pris="267" varenummer="10121514425"/>
                <SimpleCard title="Dette kan settes med props" description="Det kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her også" pris="267" varenummer="10121514425"/>
                <SimpleCard title="Dette kan settes med props" description="Det kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her også" pris="267" varenummer="10121514425"/>
                <SimpleCard title="Dette kan settes med props" description="Det kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her også" pris="267" varenummer="10121514425"/>
                <SimpleCard title="Dette kan settes med props" description="Det kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her ogsåDet kan det her også" pris="267" varenummer="10121514425"/>
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
        this.recieveData()

    }


    recieveData(stringArgs){
        //stringArgs ~= "_id=igouhreso87ey4"

        //TODO: Use fetch util to get JSON data
        let fetcher = new FetchFromJson('http://localhost:3000/beverages/search');
        fetcher.fetchFromString("_id=5be43eceb899cc72e3b0975f", ((data) => {console.log(data[0])}));
        //JSON Data ~= [{_id=goin5e7h5, name=..., ....}, {...}, ...]
        //JSON data[0] = {_id=gliren74, ...}

        //TODO: this.setState({data = new data})
        this.setState({
            ...this.state,
            //data = de nye greine
        })


    }

}

export default App;
