import React, { Component } from 'react';

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
        let account = this.state.value;
        web3.eth.getGasPrice().then(alert).catch(alert);
        let isValidAccount = web3.utils.isAddress(account);
        if (isValidAccount) {
            web3.eth.personal.unlockAccount(account, '12345678', 1500).then((result) => {
                alert('Account unlocked');
                web3.eth.getGasPrice().then(alert);
            }).catch((error) => {
                alert('Can not unlock account');
            }).finally(() => {
                web3.eth.personal.lockAccount(account).then((result) => {
                    alert('Account locked');
                }).catch((error) => {
                    alert('Can not lock account');
                })
            })
        } else {
            alert('Account address not valid');
        }
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