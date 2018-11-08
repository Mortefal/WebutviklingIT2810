import React, { Component } from 'react';
import '../CSS/DropDownStyle.css'

export default class DropDown extends Component {

    constructor(props){
        super(props);

        this.state = {
            showFilter: false,
            isChecked: false
        };

        this.showFilter = this.showFilter.bind(this);
        this.hideFilter = this.hideFilter.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

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

    handleInputChange() {
        this.setState({checked:!this.state.checked});
        console.log("checkboxen er " + !this.state.checked)
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
                                {/*legge til logikk her slik at vi kan kun hente ut typer fra databasen og gjøre disse til checkboxes?*/}
                                <input value="Øl" type="checkbox" defaultChecked={this.state.isChecked} onChange={this.handleInputChange}/>
                                Øl
                                <input name="Vin" type="checkbox" defaultChecked={this.state.isChecked} onChange={this.handleInputChange}/>
                                Vin
                                <input name="Sprit" type="checkbox" defaultChecked={this.state.isChecked} onChange={this.handleInputChange}/>
                                Sprit
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