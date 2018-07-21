import React, { Component } from 'react';

class AuthendicateProfile extends React.Component {

    constructor(props) {
        super(props);
        this.confirmAccount = this.confirmAccount.bind(this);
        this.state = {
            private_key: "",
            isValid: false
        }
    }

    confirmAccount() {
        if (this.state.private_key === "") {
            this.setState({
                isValid: true
            })
        } else {
            alert("Your input profile is not correct");
        }
    }

    render() {
        return (
            <div>
                Private Key: <input type="text" name="private_key"/>
                <button onClick={this.confirmAccount}>Confirm</button>
            </div>
        );
    }

}

export default AuthendicateProfile; 