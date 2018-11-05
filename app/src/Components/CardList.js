import React from 'react';
import Grid from '@material-ui/core/Grid';
import ListSubHeader from '@material-ui/core/ListSubheader';
import GridListTile from '@material-ui/core/GridListTile';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SimpleCard from "./SimpleCard";


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        width: 500,
        height: 200,
    }
})
/*
function mapToComponent() {
    const card = dataLoaded.map(id, product =>
        <SimpleCard key={id} title={product.title} description={product.description} pris={product.pris} img={product.image} varenummer={product.varenummer}/>
    );
    return card;
}
*/
function CardList(props) {
    const {classes, searchQuery, data} = props;

    return(
        <div className={classes.root}>
            <Typography>Searchresults for: {searchQuery}</Typography>
                <Grid container spacing={24} style={{padding: 24}}>
                    {data.map(product => (
                    <SimpleCard title={product.title}
                                description={product.desc}
                                pris={product.pris}
                                varenummer={product.varenummer}/>))}
                </Grid>
        </div>
    )
}
