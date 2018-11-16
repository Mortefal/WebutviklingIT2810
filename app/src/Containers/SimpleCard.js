import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import BottleWine from 'mdi-material-ui/BottleWine';
import BorderHeart from '../Components/FavoriteHeart';
import DetailsPage from './DetailsPage.js'


/* Styling for the component */
const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 600,
        maxHeight: 200,
        padding: theme.spacing.unit * 2,
        marginBottom: 5,
    },
    image: {
        width: 128,
        height: 128,
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
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
    },
});

/*
*   SIMPLE-CARD:
*   This is a component to represent each single card with information about each product that the database returns.
*/

class SimpleCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            aroma: this.props.description,
            taste: this.props.taste,
            pris: this.props.pris,
            country: this.props.country,
            abv: this.props.abv,
            isFav: false,
            results: [],
        };
        this.handleAddClick = this.handleAddClick.bind(this);
    };

    /* Setting the favorite state of the card.*/
    handleAddClick(){
        this.setState({isFav: !this.state.isFav});
    };

    render(){
        const { classes, title, pris, taste, aroma, country, abv } = this.props;
        const isFav = this.state.isFav;
        return(
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
                                <Typography gutterBottom className={classes.descriptionContent}>{taste}</Typography>

                            </Grid>

                            <Grid item container alignItems={"flex-start"}>
                                <Grid item xs={10}>
                                    <DetailsPage title={title} aroma={aroma} taste={taste} isFav={this.state.isFav} pris={pris} country={country} abv={abv}/>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">{pris} Kr</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item onClick={this.handleAddClick}>
                            <BorderHeart isFav={isFav}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

}
SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
