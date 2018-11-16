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
import {setFavorite, removeFavorite} from "../Actions/actions";
import connect from "react-redux/es/connect/connect";


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
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
    },
});
class SimpleCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            aroma: this.props.description,
            taste: this.props.taste,
            pris: this.props.pris,
            varenummer: this.props.varenummer,
            country: this.props.country,
            abv: this.props.abv,
            isFav: false,
        };
        this.addFavorite = this.addFavorite.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
    };

    /*
    handleAddClick(){
        this.setState({isFav: !this.state.isFav});
    };
    */
    addFavorite(e){
        this.props.add(e);
    }
    removeFavorite(e){
        this.props.remove(e);
    }

    render(){
        const { classes, title, pris, varenummer, taste, aroma, country, abv } = this.props;
        const isFav = this.props.isFav;
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
                            <Grid item container alignItems={"flex-start"} direction={"column"}>
                                <Typography color="textSecondary">Varenummer: {varenummer}</Typography>

                            </Grid>
                            <Grid item container alignItems={"flex-start"}>
                                <Grid item xs={10}>
                                    <DetailsPage title={title} aroma={aroma} taste={taste} isFav={isFav} pris={pris} country={country} abv={abv}/>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">{pris} Kr</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item onClick={(e) => {this.addFavorite(e)}}>
                            <BorderHeart isFav={isFav}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        )
    }

}

const mapStateToProps = state => {
    return({
        isFav: state.displayInfo.favorite
    })

}
const mapDispatchToProps = dispatch => {
    return {
        add: e => {
            dispatch(setFavorite(e))
        }
    }
}


SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SimpleCard));


