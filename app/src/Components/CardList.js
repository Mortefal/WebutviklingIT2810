import React from 'react';
import Grid from '@material-ui/core/Grid';
//import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SimpleCard from "../Containers/SimpleCard";
//import Typography from "@material-ui/core/Typography/Typography";
//import configureStore from "../Store/configureStore";
import FetchFromJson from "../utils/fetchFromJson";
//let store = configureStore();


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

/*
*    CARD-LIST:
*    Cardlist is a component for mapping the data from App onto SimpleCards returning these to be displayed on the application.
*/
class CardList extends React.Component {

    render(){
        const {classes} = this.props;
        let cards =  Object.keys(this.props.data).map((key) => {
            return (
            <SimpleCard key={key} title={this.props.data[key].name} aroma={this.props.data[key].aroma} country={this.props.data[key].mainCountry}
                        pris={this.props.data[key].price} taste={this.props.data[key].taste} abv={this.props.data[key].abv} isFav={false}/>)});
        return(
            <Grid className={classes.root} container spacing={16} item xs={12} >
                <Grid className={classes.gridList} item xs={6}>
                    {cards}
                </Grid>
            </Grid>
        )
    }
}

CardList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardList);
