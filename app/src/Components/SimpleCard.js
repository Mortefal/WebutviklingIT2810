import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import BottleWine from 'mdi-material-ui/BottleWine';
import BorderHeart from './FavoriteHeart';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';


const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 600,
        maxHeight: 200,
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
    },
    paper: {
        position: 'relative',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: 200,
        left:200
    },
});
class SimpleCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description,
            pris: this.props.pris,
            varenummer: this.props.varenummer,
            isFav: false,
            results: [],
            openModal: false,
        };
        this.handleAddClick = this.handleAddClick.bind(this);
    };


    handleAddClick(){
        this.setState({isFav: !this.state.isFav});
        /*Add to favorites in db*/
        /*this.setState({results: this.state.results.push(...[this.state.title, this.state.description, this.state.pris, this.state.varenummer])});
        console.log(this.state.results)*/
    };

    handleOpen = () =>{
        this.setState({
            openModal: true
        })
    };

    handleClose= () =>{
        this.setState({
            openModal: false
        })
    };

    render(){
        const { classes, title, description, pris, varenummer } = this.props;
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
                                <Typography gutterBottom className={classes.descriptionContent}>{description}</Typography>

                            </Grid>
                            <Grid item container alignItems={"flex-start"} direction={"column"}>
                                <Typography color="textSecondary">Varenummer: {varenummer}</Typography>

                            </Grid>
                            <Grid>
                                <div>
                                    <Button onClick={this.handleOpen}>Mer Info</Button>
                                    <Modal
                                        aria-labelledby="simple-modal-title"
                                        aria-describedby="simple-modal-description"
                                        open={this.state.openModal}
                                        onClose={this.handleClose}
                                    >
                                        <div className={classes.paper}>
                                            <Grid>
                                                <ButtonBase className={classes.image}>
                                                    <BottleWine style={{fontSize: 128}}/>
                                                </ButtonBase>
                                                <Typography gutterBottom variant="column">{title}</Typography>
                                                <Typography gutterBottom >{description}</Typography>
                                            </Grid>
                                        </div>
                                    </Modal>
                                </div>
                            </Grid>
                            <Grid item container alignItems={"flex-end"} justify={"flex-end"}>
                                <Typography variant="subtitle1">{pris} Kr</Typography>
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
