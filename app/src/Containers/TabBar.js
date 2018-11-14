import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Magnify from 'mdi-material-ui/Magnify'

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#8EE4AF'
    },
});

class TabBar extends React.Component{
    handleChange = (event, value) => {
        this.setState({value})
    };

    render(){
        const { classes } = this.props;
        return(
            <Paper square className={classes.root}>
                <Tabs
                    value={this.props.value}
                    onChange={this.handleChange}
                    fullWidth
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab icon={<Magnify/>} label="Browse the goods"/>
                    <Tab icon={<FavoriteIcon/>} label="Favorites"/>
                </Tabs>
            </Paper>
        )
    }

}



TabBar.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return{
        value: state.value,
    };
}
export default withStyles(styles)(TabBar);
