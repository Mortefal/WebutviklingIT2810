import React from 'react';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types';

import FavoriteIcon from '@material-ui/icons/Favorite';
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    root: {
        color: "primary",
    }
});

/*
*   FAVORITE HEART:
*   Simple component that uses an Iconbutton and FavoriteIcon to display an icon for choosing favorite products.
*/

class FavoriteHeart extends React.Component {
    render() {
        const {classes, isFav} = this.props;
        return (
            <IconButton className={classes.root} id="SVG">
                {isFav ? <FavoriteIcon style={{color: 'red'}} id="Redheart"/>: <FavoriteBorder id="Emptyheart"/>}
            </IconButton>
        )
    }
}

FavoriteHeart.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default (withStyles(styles)(FavoriteHeart));

