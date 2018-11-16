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
        this.state.fetcher.fetchFromString('productType=Rødvin', (d) => {
            console.log(d);
            this.setState({
                ...this.state,
                data: d
            })
        });
    }
    generateStringArgs(){
        if (this.props.name && this.props.type){
            if(this.state.name !== this.props.name || this.state.type !== this.props.type){
               //  console.log(this.state);
               //  console.log(this.props);
                this.setState({
                    ...this.state,
                    name: this.props.name,
                    type: this.props.type
                });

                return 'name=' + this.props.name + '&productType=' + this.props.type;
            }
        }
        else if (this.props.name) {
            // console.log(this.state);
            // console.log(this.props);
            if (this.state.name !== this.props.name) {
                this.setState({
                    ...this.state,
                    name: this.props.name
                });

                return 'name=' + this.props.name;
            }
        }
        else if (this.props.type){
            console.log(this.state);
            console.log(this.props);
            if(this.state.type !== this.props.type){
                this.setState({
                    ...this.state,
                    name: this.props.type
                });

                return 'productType=' + this.props.type;
            }
        }
        else{
            // console.log(this.state);
            // console.log(this.props);
            return '';
        }
    }



    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
            let stringArgs = this.generateStringArgs();
            console.log(stringArgs);
            if(stringArgs !== undefined){
             this.state.fetcher.fetchFromString(stringArgs, (d) => {
                  this.setState({
                      ...this.state,
                      data: d
                  })
             });}
    }}


    render(){
        const {classes} = this.props;
        console.log(this.state);
        let cards =  Object.keys(this.state.data).map((key) => {
            return (
            <SimpleCard key={key} title={this.state.data[key].name} aroma={this.state.data[key].aroma}
                        pris={this.state.data[key].price} taste={this.state.data[key].taste} abv={this.state.data[key].abv}/>)})
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
