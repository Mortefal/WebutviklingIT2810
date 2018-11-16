import React from 'react';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types';

import FavoriteIcon from '@material-ui/icons/Favorite';
import {withStyles} from "@material-ui/core";
import connect from "react-redux/es/connect/connect";

const styles = theme => ({
    root: {
        color: "primary",
    }
});

class FavoriteHeart extends React.Component {
    render() {
        const {classes, isFav} = this.props;
        return (
            <IconButton className={classes.root}>
                {isFav ? <FavoriteIcon style={{color: 'red'}}/>: <FavoriteBorder/>}
            </IconButton>
        )
    }
}

FavoriteHeart.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default (withStyles(styles)(FavoriteHeart));

