import React, { Component } from 'react';
import { } from '../lib/util';
import {} from './ViewProfilePage'

class AuthendicateProfile extends React.Component {

    constructor(props) {
        super(props);
        this.confirmAccount = this.confirmAccount.bind(this);
        this.state = {
            private_key: "",
            isValid: false,
            address: ""
        }
    }

    confirmAccount(event) {
        Profile_constructor(event.target.elements.private_key.value).then((address) => {
            this.setState({
                address: address
            })
        }).catch(alert);
    }

    render() {
        return (
            <div>
                <div>
                    Private Key: <input type="text" name="private_key" />
                    <button onClick={this.confirmAccount}>Confirm</button>
                </div>
                <div>
                    {this.state.address.length != 0 && (<ViewProfilePage address={this.state.address} />)}
                </div>

            </div>
        );
    }

}

export default AuthendicateProfile; 