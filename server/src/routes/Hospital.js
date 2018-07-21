import React, { Component } from 'react';
import {createProfile} from '../util';

const Web3 = require('web3')
const web3 = new Web3(Web3.givenProvider || 'ws://127.0.0.1:8546')



class Hospital extends Component{

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        createProfile("This_IS_key").then(alert)
        event.preventDefault();
    }

    render() {
        return(
            <div>
            <p>{this.state.text}</p>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <label>
                    
                </label>
                <input type="submit" value="Submit" />
            </form>
            </div>
        )}
}

export default Hospital;