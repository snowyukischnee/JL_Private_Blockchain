import React, { Component } from 'react';

const Web3 = require('web3')
const web3 = new Web3(Web3.givenProvider || 'ws://127.0.0.1:8546')

class ProfileController extends Comment {

    constructor(props) {
        super(props);
        this.state = {
            private_key = '',
            personal_id = '',
            name: '',
            dob: '',
            contact: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            private_key = event.target.elements.private_key.value,
            personal_id = event.target.elements.personal_id.value,
            name: event.value.target.elements.name.value,
            dob: event.value.target.elements.dob.value,
            contact: event.value.target.elements.contact.value
        });
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
        return (
            <div>
                <p>{this.state.text}</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Private Key:
                        <input type="text" name="private_key" onChange={this.handleChange} />
                    </label>
                    <label>
                        Personal ID:
                        <input type="text" name="personal_id" onChange={this.handleChange} />
                    </label>
                    <label>
                        Name:
                        <input type="text" name="name" onChange={this.handleChange} />
                    </label>
                    <label>
                        Date of Birth:
                        <input type="text" name="dob" onChange={this.handleChange} />
                    </label>
                    <label>
                        Contact:
                        <input type="text" name="contact" onChange={this.handleChange} />
                    </label>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }



}