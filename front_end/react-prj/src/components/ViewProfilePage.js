import React, { Component } from 'react';

class ViewProfilePage extends Component {

    constructor(props) {
        super(props);
        this.onCreateRecord = this.onCreateRecord.bind(this);
        this.onViewRecord = this.onViewRecord.bind(this);
        this.state = {
            private_key: "",
            address: ""
        }

    } 
    
    
    onCreateRecord() {

    }

    onViewRecord() {
        
    }


    render() {
        //get info from db base on private key and address
        var person = {
            personal_id = '123',
            name: 'Someone',
            age: '30',
            start_date = '10/10',
            end_date = '11/10'

        };
        return (
            <div>
                <h1>Header</h1>
                <p>Personal ID: {person.personal_id}</p>
                <p>Name: {person.name}</p>
                <p>Age: {person.age}</p>
                <p>Start date: {person.start_date}</p>
                <p>End date: {person.end_date}</p>
                <hr />
                <button onClick={this.onCreateRecord}>Create record</button>
                <button onClick={this.onViewRecord}>View record</button>
            </div>
        )
    }


}

export default ViewProfilePage