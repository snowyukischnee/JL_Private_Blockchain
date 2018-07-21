import React, { Component } from 'react';

class ViewRecordView extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            recordValue1: "",
            recordValue2: "",
            recordValue3: ""
        }
    }
    

    onSubmit() {
        
    }


    render() {
        return (
            <div>
                <h1>Header</h1>
                <button>Confirm Record</button>
                <form onSubmit={this.onSubmit}>
                    
                </form>

            </div>
        )
    }
}

export default ViewRecordView;