import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";

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

class FilterChips extends React.Component {
    state = {
        filterQuery: [
            {key: 0, label: "Hvitvin"},{key: 1, label:"Musserende vin"},{key: 2, label:"Rødvin"},{key: 3, label:"Rosévin"},
            {key: 4, label:"Fruktvin"},{key: 5, label:"Portvin"},{key: 6, label:"Perlende vin, hvit"},{key: 7, label:"Perlende vin, rød"},
            {key: 8, label:"Perlende vin, rosé"},{key: 9, label:"Sterkvin, annen"},
            {key: 10, label:"Sherry"},{key: 11, label:"Vermut"},{key: 12, label:"Madeira"},
        ],
        filtrationArray: [],
    };

    handleClick = data => () => {
        if (!this.state.filtrationArray.includes(data)) {
            this.setState({filtrationArray: [data]});
        }
        this.props.callback(data.label)
    };

    handleDelete = data => () => {
        if(this.state.filtrationArray.includes(data)){
            const chipData = this.state.filtrationArray;
            const chipToDelete = chipData.indexOf(data);
            chipData.splice(chipToDelete, 1);
            this.setState({filtrationArray: [...chipData]});
        }
        this.props.callback(null)
    };

    render() {
        const {classes} = this.props;

        let alternative = this.state.filterQuery.map(data => {
            return (
                <Chip
                    key={data.key}
                    label={data.label}
                    onClick={this.handleClick(data)}
                    className={classes.chip}
                    clickable={true}
                />
            )
        });

        let selected = this.state.filtrationArray.map(data => {
            return (
                <Chip
                    key={data.key}
                    label={data.label}
                    className={classes.chip}
                    clickable={false}
                    color={"secondary"}
                    onDelete={this.handleDelete(data)}
                />)
        });

        return (
            <Paper className={classes.root}>
                <Grid item container>
                    {alternative}
                </Grid>
                <Grid item container>
                    {selected}
                </Grid>
            </Paper>
        )
    }
}

FilterChips.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterChips);
