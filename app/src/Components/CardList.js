import React from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
//import ListSubHeader from '@material-ui/core/ListSubheader';
//import GridListTile from '@material-ui/core/GridListTile';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SimpleCard from "../Containers/SimpleCard";
//import Typography from "@material-ui/core/Typography/Typography";
import configureStore from "../Store/configureStore";
import FetchFromJson from "../utils/fetchFromJson";
let store = configureStore();


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
    }
});
class CardList extends React.Component {
    constructor(args){
        super(args);
        this.state = ({data: [{'title': 'N/A', 'pris': 'N/A', 'varenummer':'N/A', 'taste': 'N/A', 'aroma': 'N/A, ',
            'country': 'N/A', 'abv':'N/A'}],
            fetcher: new FetchFromJson('http://it2810-15.idi.ntnu.no:3000/beverages/search'),
            name: null,
            type: null
        });
    }
    componentDidMount(){
        //this.state.fetcher.fetchFromString('productType=Rødvin', (d) => {
        //    console.log(d);
        //    this.setState({
        //        ...this.state,
        //        data: d
        //    })
        //});
    }
    generateStringArgs(){
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

        // if (this.props.name && this.props.type){
        //     if(this.state.name !== this.props.name || this.state.type !== this.props.type){
        //        //  console.log(this.state);
        //        //  console.log(this.props);
        //         this.setState({
        //             ...this.state,
        //             name: this.props.name,
        //             type: this.props.type
        //         });
//
        //         queryString += 'name=' + this.props.name + '&productType=' + this.props.type;
        //     }
        // }
        // else if (this.props.name !== '' || this.props.name !== undefined) {
        //     // console.log(this.state);
        //     // console.log(this.props);
        //     if (this.state.name !== this.props.name) {
        //         this.setState({
        //             ...this.state,
        //             name: this.props.name
        //         });
//
        //         queryString+= 'name=' + this.props.name;
        //     }
        // }
        // else if (this.props.type){
        //     console.log(this.state);
        //     console.log(this.props);
        //     if(this.state.type !== this.props.type){
        //         this.setState({
        //             ...this.state,
        //             type: this.props.type
        //         });
//
        //         queryString+= 'productType=' + this.props.type;
        //     }
        // }
        // else{
        //     // console.log(this.state);
        //     // console.log(this.props);
        //     queryString+= '';
        // }

        // if(this.props.sortOrder && queryString.length > 0){
        //     console.log("sortorder");
        //     console.log(this.props.sortOrder)
        //     queryString += '&sort=' +this.props.sortOrder
        // }

        return queryString
    }



    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
            let stringArgs = this.generateStringArgs();
            // console.log(stringArgs);
            if (stringArgs.indexOf('name') >= 0 || stringArgs.indexOf('productType') >= 0){
                // console.log(stringArgs);
                if(stringArgs !== undefined){
                 this.state.fetcher.fetchFromString(stringArgs, (d) => {
                      this.setState({
                          ...this.state,
                          data: d
                      })
             });}}
    }}


    render(){
        const {classes} = this.props;
        // console.log(this.state);
        let cards =  Object.keys(this.props.data).map((key) => {
            return (
            <SimpleCard key={key} title={this.props.data[key].name} aroma={this.props.data[key].aroma}
                        pris={this.props.data[key].price} taste={this.props.data[key].taste} abv={this.props.data[key].abv} isFav={false}/>)})
        return(
            <Grid className={classes.root} container spacing={16} item xs={12} >
                <Grid className={classes.gridList} item xs={6}>
                    {/* TODO: Map this.props.data to HTML */}
                    {cards}
                    {/*Noe mer enn dette, en vet ikke helt hvordan jeg skal mappe det korrekt fra app*/}

                </Grid>
            </Grid>
        )
    }
}

CardList.propTypes = {
    classes: PropTypes.object.isRequired,
};

//const mapStateToProps = state => ({
//    cards: state.cards.data,
//    name: state.getQuery.query,
//    filter: state.getFilters.filterArray
//});
//const mapDispatchToProps = dispatch => ({
//    getName: (e) => {dispatch(getQue)}
//})
//
//export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles))(CardList)
export default withStyles(styles)(CardList);
// export default CardList;
