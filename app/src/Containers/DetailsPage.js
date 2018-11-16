import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from "@material-ui/core/Grid/Grid";
import ButtonBase from "@material-ui/core/ButtonBase/ButtonBase";
import BottleWine from 'mdi-material-ui/BottleWine';
import Typography from "@material-ui/core/Typography/Typography";
import {withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import FavoriteHeart from "../Components/FavoriteHeart";
import {hideInfo, showInfo} from "../Actions/actions";
import connect from "react-redux/es/connect/connect";
import rootReducer from "../Reducers/reducers";

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: 100,
        left: 500,
        right: 0,
        margin: 0,
    },
    image: {
        width: 256,
        height: 256,
        justify: "flex-start",
        alignItems: "flex-start",
        borderBottomColor: '#ddd',
        borderBottomWidth: 2,
    },
    sideBox3: {
        height: 40,
        width:80,
    },
    sideBox1: {
        height: 100,
        width: 80,
    },
    sideBox2: {
        height: 40,
        width: 40,
    },
});
class DetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    show(e){
        this.props.showInfo(e)
    }
    hide(e){
        this.props.hideInfo(e)
    }
    render() {
        const {classes, title, isFav, aroma, country, taste, abv, openModal} = this.props;
        return (
                <div>
                    <Button className="modalButton" onClick={(e) =>{this.props.show(e)}} >Mer Info</Button>
                    <Grid>
                        <div>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={openModal}
                                onClose={(e) => {this.props.hide(e)}}
                                style={{alignItems: 'center', justifyContent: 'center'}}
                            >
                                <div className={classes.paper}>
                                    <Grid>
                                        <Grid item container direction={"row-reverse"}><FavoriteHeart isFav={isFav}/></Grid>
                                        <Grid container spacing={16} alignItems={"center"} alignContent={"center"}>
                                            <Grid item xs={6}>
                                                <ButtonBase className={classes.image}>
                                                    <BottleWine style={{fontSize: 256}}/>
                                                </ButtonBase>
                                            </Grid>

                                            <Grid item xs={6}>

                                                <Grid direction={"column"} justify={"center"} container item xs={12} alignItems={"center"}>
                                                    <Grid item xs={4} className={classes.sideBox3} >
                                                        Opprinnelsesland: {country}
                                                    </Grid>
                                                    <Grid className={classes.sideBox3} item xs={4}>
                                                        {abv}%
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid>
                                        <Typography gutterBottom variant="h5">{title}</Typography>
                                        <Typography gutterBottom variant="body1">{aroma}{taste}</Typography>
                                    </Grid>
                                </div>
                            </Modal>
                        </div>
                    </Grid>
                </div>
            );
        }

}
const mapStateToProps = state => {
    return({
        openModal: state.displayInfo.openModal,
    })

}
const mapDispatchToProps = dispatch => {
    return {
        show: e => {
            dispatch(showInfo(e))
        },
        hide: e => {
            dispatch(hideInfo(e))
        }
    }
}


DetailsPage.propTypes = {
classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DetailsPage));
