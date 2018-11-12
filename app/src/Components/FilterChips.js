import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
    root:{
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit,
    }
})
/*const beer = "productType=Sider&productType=Lys ale&productType=Klosterstil&productType=India pale ale&productType=Brown ale&productType=Pale ale&productType=Spesial&productType=Hveteøl&productType=Surøl"
*/
class FilterChips extends React.Component {
    state = {
        filterQuery: [
            {key: 0, label: "Øl og sider"},
            {key: 1, label: "Rødvin"},
            {key: 2, label: "Hvitvin"},
            {key: 3, label: "Annen vin"},
            {key: 4, label: "Musserende vin"},
            {key: 5, label: "Sprit"},
            {key: 6, label: "Alkoholfritt"},
        ],
        filtrationArray: [],
    }
    handleClick = data => () => {
        if (!this.state.filtrationArray.includes(data)) {
            this.setState({filtrationArray: [...this.state.filtrationArray, data]});
        }
    };
    handleDelete = data => () => {
        if(this.state.filtrationArray.includes(data)){
            const chipData = this.state.filtrationArray;
            const chipToDelete = chipData.indexOf(data);
            chipData.splice(chipToDelete, 1);
            this.setState({filtrationArray: [...chipData]});
        }
    };

    render() {
        const {classes} = this.props;

        let alternative = this.state.filterQuery.map(data => {
            let icon = null;
            return (
                <Chip
                    key={data.key}
                    label={data.label}
                    onClick={this.handleClick(data)}
                    className={classes.chip}
                    clickable={true}
                />
            )
        })
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

