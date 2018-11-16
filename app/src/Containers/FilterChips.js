import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import {addFilter, removeFilter, fetchAllFilters} from "../Actions/actions";
import connect from "react-redux/es/connect/connect";
import configureStore from "../Store/configureStore";
//import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
    root:{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    chip: {
        margin: theme.spacing.unit,
    }
});
/*const beer = "productType=Sider&productType=Lys ale&productType=Klosterstil&productType=India pale ale&productType=Brown ale&productType=Pale ale&productType=Spesial&productType=Hveteøl&productType=Surøl"
*/
class FilterChips extends React.Component {
    constructor(props){
        super(props);
        /*this.state={
            filterQuery:[
            {key: 0, label: "Hvitvin"},
            {key: 1, label: "Musserende vin"},
            {key: 2, label: "Rødvin"},
            {key: 3, label: "Rosévin"},
            {key: 4, label: "Fruktvin"},
            {key: 5, label: "Portvin"},
            {key: 6, label: "Perlende vin, hvit"},
            {key: 7, label: "Perlende vin, rød"},
            {key: 8, label: "Perlende vin, rosé"},
            {key: 9, label: "Sterkvin, annen"},
            {key: 10, label: "Sherry"},
            {key: 11, label: "Vermut"},
            {key: 12, label: "Madeira"},
            /!* {key: 0, label: "Aromatisert vin"},
            {key: 0, label: "Champagne, brut"},
            {key: 0, label: "Musserende vin, rosé"},
            {key: 0, label: "Champagne, rosé"},
            {key: 0, label: "Champagne extra brut"},
            {key: 0, label: "Champagne, annen"},
            {key: 0, label: "Champagne, sec"},
            {key: 0, label: "Whisky"},
            {key: 0, label: "Akevitt"},
            {key: 0, label: "Gin"},
            {key: 0, label: "Druebrennevin"},*!/
            {key: 13, label: "Rom"},
            {key: 14, label: "Bitter"},
            {key: 15, label: "Fruktbrennevin"},
            {key: 16, label: "Likør"},
            {key: 17, label: "Vodka"},
            /!*{key: 0, label: "Brennevin, annet"},
            {key: 0, label: "Brennevin, nøytralt<37.5%"},
            {key: 0, label: "Genever"},*!/
            {key: 18, label: "Sake"},
            {key: 19, label: "Sider"},
            {key: 20, label: "Lys ale"},
            {key: 21, label: "Klosterstil"},
            /!*{key: 0, label: "India pale ale"},
            {key: 0, label: "Brown ale"},
            {key: 0, label: "Pale ale"},
            {key: 0, label: "Spesial"},*!/
            {key: 22, label: "Hveteøl"},
            {key: 23, label: "Surøl"},
            /!*{key: 0, label: "Porter & Stout"},
            {key: 0, label: "Saison farmhouse ale"},
            {key: 0, label: "Mørk lager"},
            {key: 0, label: "Barley wine"},
            {key: 0, label: "Red/amber"},*!/
            {key: 24, label: "Scotch ale"},
            {key: 25, label: "Alkoholfri vin"},
            /!*{key: 0, label: "Alkoholfri most"},
            {key: 0, label: "Alkoholfri musserende drikk"},
            {key: 0, label: "Alkoholfritt øl"},
            {key: 0, label: "Alkoholfritt, øvrig"},
            {key: 0, label: "Alkoholfri leskedrikk"},*!/

        ]};*/
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleAdd(e) {
        this.props.addFilter(e);
        };
    handleRemove(e){
        this.props.removeFilter(e);
    }
    render() {
        const {classes} = this.props;
        let alternative = this.props.filterQuery.map((data) => {
            return (
                <Chip
                    key={data.key}
                    label={data.label}
                    onClick={(e) => {this.handleAdd(e)}}
                    className={classes.chip}
                    clickable={true}
                />
            )
        });
        let filters = this.props.filterArray.map(data => {
            return(
                <Chip key={data.key} label={data.label} onDelete={(e) => {this.handleRemove(e)}} className={classes.chip} clickable={false}/>
            )
        });
            /*return (
                <Chip
                    key={data.key}
                    label={data.label}
                    onClick={(e) => {this.handleRemove(e)}}
                    className={classes.chip}
                    clickable={true}
                />
            )*/

        return (
            <Paper className={classes.root}>
                <Grid item container>
                    {alternative}
                </Grid>
                <Grid item container>
                    {filters}
                </Grid>
            </Paper>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        filterArray: state.getFilters.filterParam,
        filterQuery: state.getFilters.filterQuery
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFilter: (filterName) => dispatch(addFilter(filterName)),
        removeFilter: (filterName) => dispatch(removeFilter(filterName))
    }
};


FilterChips.propTypes = {
    classes: PropTypes.object.isRequired,
};

FilterChips = connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FilterChips))

export default (FilterChips);
