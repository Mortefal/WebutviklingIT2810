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
import {hideModal, showModal} from "../Actions/actions";
import connect from "react-redux/es/connect/connect";

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
/*
class DetailsPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = ({
            openModal: false,
        })
    }

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

    render() {
        const{classes, title, isFav, aroma, country, taste, abv} = this.props;
*/
let ModalTrigger = ({dispatch}) => {
    let openModal = false;
        return (
            <div>
                <Button className="modalButton" onClick={e => {
                    e.preventDefault();
                    if (openModal = false){
                        
                    }else{
                        dispatch(showModal(true))
                    }
                }}>Mer Info</Button>
                <Grid>
                    <div>
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={openModal}
                            onClose={e => {
                                e.preventDefault();
                                dispatch(hideModal(false))
                            }}
                            style={{alignItems: 'center', justifyContent: 'center'}}
                        >
                            <div>
                                <Grid>
                                    <Grid item container direction={"row-reverse"}><FavoriteHeart isFav={false}/></Grid>
                                    <Grid container spacing={16} alignItems={"center"} alignContent={"center"}>
                                        <Grid item xs={6}>
                                            <ButtonBase >
                                                <BottleWine style={{fontSize: 256}}/>
                                            </ButtonBase>
                                        </Grid>

                                        <Grid item xs={6}>

                                            <Grid direction={"column"} justify={"center"} container item xs={12} alignItems={"center"}>
                                                <Grid item xs={4} >
                                                    Opprinnelsesland: {"Checkoiad"}
                                                </Grid>
                                                <Grid item xs={4}>
                                                    14%
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid>
                                    <Typography gutterBottom variant="h5">"TITLE"</Typography>
                                    <Typography gutterBottom variant="body1">"AROMA OG TASTE"</Typography>
                                </Grid>
                            </div>
                        </Modal>
                    </div>
                </Grid>
            </div>
        )
    }

/*
DetailsPage.propTypes = {
    classes: PropTypes.object.isRequired,
};
*/
ModalTrigger = connect()(ModalTrigger)

export default ModalTrigger;
