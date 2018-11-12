import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from "@material-ui/core/Grid/Grid";
import ButtonBase from "@material-ui/core/ButtonBase/ButtonBase";
import BottleWine from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography/Typography";
import {withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';

const styles = theme => ({
    paper: {
        position: 'relative',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: 200,
        left:200
    },
    image: {
        width: 128,
        height: 128,
        /* Tror det skal være mulig å hente inn bilde ved å ta response.images[2].url hvor formatet er thumbnail */
    },
});

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
        const{classes, title, description} = this.props;
        return (
            <div>
                <Button className="modalButton" onClick={this.handleOpen}>Mer Info</Button>
                <Grid>
                    <div>
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
            </div>
        );
    }

}

DetailsPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailsPage);