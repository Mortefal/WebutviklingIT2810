import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import BottleWine from 'mdi-material-ui/BottleWine';
import FavoriteIcon from '@material-ui/icons/Favorite';
import border_heart from '../Icons/border_heart.svg';
import heart from '../Icons/favorite.svg';


const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 600,
        padding: theme.spacing.unit * 2,
    },
    image: {
        width: 128,
        height: 128,
        /* Tror det skal være mulig å hente inn bilde ved å ta response.images[2].url hvor formatet er thumbnail */
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    descriptionContent:{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    }
});

function SimpleCard(props) {
    const { classes, title, description, pris, varenummer } = props;
    return (
        <Paper className={classes.root}>
            <Grid container spacing={16}>
                <Grid item>
                    <ButtonBase className={classes.image}>
                        <BottleWine style={{fontSize: 128}}/>
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={16}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                                {title}
                            </Typography>
                            <Typography gutterBottom className={classes.descriptionContent}>{description}</Typography>
                            <Typography color="textSecondary">Varenummer: {varenummer}</Typography>
                        </Grid>
                        <Grid item container alignItems={"flex-end"} direction={"column"}>
                            <Typography variant="subtitle1">{pris}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <FavoriteIcon/>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
