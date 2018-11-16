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
    /*filterQuery: [
        {key: 0, label: "Øl og sider"},
    ],
    filtrationArray: []*/
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    /*
    handleClick = data => () => {
        if (!this.state.filtrationArray.includes(data)) {
            this.setState({filtrationArray: [...this.state.filtrationArray, data]});
        }
    };*/

    handleClick(e){
        this.props.addFilter(e)
    }

    componentDidMount(){
        const store = configureStore()
        //const {filterQuery, filtrationArray} = this.props
        const filter = store.dispatch(fetchAllFilters());
        console.log("taper")
        console.log(filter)
        console.log("taper") 
        //this.props.filterArray.append(/*filtere fra over*/)
    }

    /*handleDelete = data => () => {
        if(this.state.filtrationArray.includes(data)){
            const chipData = this.state.filtrationArray;
            const chipToDelete = chipData.indexOf(data);
            chipData.splice(chipToDelete, 1);
            this.setState({filtrationArray: [...chipData]});
        }
    };*/
    handleDelete(e){
        this.props.removeFilter(e)
    }

    render() {
        const {classes, filterQuery, filterArray} = this.props;

        /*let alternative = this.props.filterQuery.map(data => {
            return (
                <Chip
                    key={data.key}
                    label={data.label}
                    onClick={this.handleClick(data)}
                    className={classes.chip}
                    clickable={true}
                />
            )
        });*/

        let selected = this.props.filterArray.map(data => {
            return (
                <Chip
                    key={data.key}
                    label={data.label}
                    className={classes.chip}
                    clickable={false}
                    color={"secondary"}
                    onDelete={(e) => {this.props.removeFilter(e)}}
                />)
        });

        return (
            <Paper className={classes.root}>
                <Grid item container>
                    {/*{alternative}*/}
                </Grid>
                <Grid item container>
                    {selected}
                </Grid>
            </Paper>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        filterArray: state.getFilters.filterArray,
        filterQuery: state.getFilters.filterQuery,
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
