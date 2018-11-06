import React, { Component } from 'react';
import '../CSS/DropDownStyle.css'

export default class DropDown extends Component {

    constructor(){
        super();

        this.state = {
            showFilter: false,
        };

        this.showFilter = this.showFilter.bind(this);
        this.hideFilter = this.hideFilter.bind(this);
    }

    showFilter(event){
        event.preventDefault();

        this.setState({ showFilter: true }, () => {
            document.addEventListener('click', this.hideFilter);
        })
    }

    hideFilter(event){
        if (!this.dropdownMenu.contains(event.target)) {
            this.setState({showFilter: false}, () => {
                document.removeEventListener('click', this.hideFilter);
            });
        }
    }

    render() {
        return (
            <div className="FilterDiv">
                <button onClick={this.showFilter} className="filterButton">
                    Filtrer v
                </button>

                {
                    this.state.showFilter
                    ?(
                            <div className="menu" ref={(element) =>{
                                this.dropdownMenu = element
                            }}>
                                <button> vin </button>
                                <button> øl </button>
                                <button> sprit </button>
                            </div>
                    )
                    : (
                        null
                    )
                }

            </div>
        );
    }
}