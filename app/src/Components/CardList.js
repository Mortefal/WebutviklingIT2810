import React from 'react';
//import Grid from '@material-ui/core/Grid';
//import ListSubHeader from '@material-ui/core/ListSubheader';
//import GridListTile from '@material-ui/core/GridListTile';

//import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import SimpleCard from "./SimpleCard";
//import {getProducts, Facet} from 'vinmonopolet';
//import Typography from "@material-ui/core/Typography/Typography";


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
});
class CardList extends React.Component {

/*
    componentDidMount() {

        fetch('this.url')
            .then(results => {
                return results.json();
            }).then(data => {
            let products = data.results.map((product) => {
                return (
                    <div key={product.results}>
                        <SimpleCard title={product.name} description={product.aroma} pris={product.price}
                                    varenummer={product.code}/>
                    </div>
                )
            })
            this.setState({cards: products})
            console.log("state: " + this.state.cards)
        })
    }
*/
    render(){
        return(
            <div>
                <div>
                    {/* TODO: Map this.props.data to HTML */}
                    {this.props.data}

                    {/*Noe mer enn dette, en vet ikke helt hvordan jeg skal mappe det korrekt fra app*/}
                    {Object.keys(this.props.data).map(title, description, pris, varenummer =>
                        <SimpleCard title={this.props.data.title} description={this.props.data.description} pris={this.props.data.pris} varenummer={this.props.data.varenummer} />)} {/*onClick={(e) => this.useCallback({title})}/>)*/}
                </div>
            </div>
        )
    }
}
export default CardList;
