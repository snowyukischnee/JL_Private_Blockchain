import React, { Component } from 'react';

class CreateProfilePage extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            person: {
                private_key: "",
                personal_id: "",
                name: "",
                dob: "",
                contact: ""
            }
        }
    }
    
    onSubmit(event) {
        console.log(event);
        this.setState({
            person: {
                private_key: event.target.elements.private_key.value,
                personal_id: event.target.elements.personal_id,value,
                name: event.target.elements.name.value,
                dob: event.target.elements.dob.value,
                contact: event.target.elements.contact.value
            }
        })
    }

    onChange() {

    }


    render() {

        return (
            <div>
                <h1>Header</h1>
                <form onSubmit={this.onSubmit}>
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
            </div >
        )
    }
}

export default CreateProfilePage