import React, { Component } from 'react';
import { } from '../lib/util'; 

class ViewProfilePage extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClickObject = this.onClickObject.bind(this);

        let address = pros.address;

        this.state = {
            person: {
                address: address,
                full_name: "",
                gender: "",
                dob: "",
                occupation: "",
                region: "",
                education_level: "",
                is_foreigner: "",
                home_address: "",
                is_health_assuarance: "",
                health_assuarance_expired_date: "",
                health_assuarance_id: "",
                contact: ""
            }
        }
        let deployedContract = new web3.eth.Contract(Profile.abi, address);

        deployedContract.methods.full_name().call().then((full_name) => this.state.full_name = full_name);
        deployedContract.methods.gender().call().then((gender) => this.state.gender = gender);
        deployedContract.methods.dob().call().then((dob) => this.state.dob = dob);
        deployedContract.methods.occupation().call().then((occupation) => this.state.occupation = occupation);
        deployedContract.methods.region().call().then((region) => this.state.region = region);
        deployedContract.methods.education_level().call().then((education_level) => this.state.education_level = education_level);
        deployedContract.methods.is_foreigner().call().then((is_foreigner) => this.state.is_foreigner = is_foreigner);
        deployedContract.methods.home_address().call().then((home_address) => this.state.home_address = home_address);
        deployedContract.methods.is_health_assuarance().call().then((is_health_assuarance) => this.state.is_health_assuarance = is_health_assuarance);
        deployedContract.methods.health_assuarance_expired_date().call().then((health_assuarance_expired_date) => this.state.health_assuarance_expired_date = health_assuarance_expired_date);
        deployedContract.methods.gender().health_assuarance_id().then((health_assuarance_id) => this.state.health_assuarance_id = health_assuarance_id);
        deployedContract.methods.contact().call().then((contact) => this.state.contact = contact);
    }
     // _addr, private_key, _full_name, _gender, _dob, 
    // _occupation, _region, _education_level, _is_foreigner, 
    // _home_address, _is_health_assuarance, 
    // _health_assuarance_expired_date, _health_assuarance_id, _contact
    
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
        });
        Profile_constructor(this.state.private_key).then((address) => {
            Profile_setVariables(address, )
        }).catch((err) => {
            alert(err);
        });
    }


   
    onClickObject() {
        console.log(this.state);
        
    }


    render() {

        return (

            <button onSubmit={this.onClickObject}>
                Display Object
            </button>


            // <div>
            //     <h1>Header</h1>
            //     <form onSubmit={this.onSubmit}>
            //         <label>
            //             Private Key:
            //             <input type="text" name="private_key" value={this.state.private_key} readOnly="readonly" />
            //         </label>
            //         <label>
            //             Personal ID:
            //             <input type="text" name="personal_id" onChange={this.handleChange} />
            //         </label>
            //         <label>
            //             Name:
            //             <input type="text" name="name" onChange={this.handleChange} />
            //         </label>
            //         <label>
            //             Date of Birth:
            //             <input type="text" name="dob" onChange={this.handleChange} />
            //         </label>
            //         <label>
            //             Contact:
            //             <input type="text" name="contact" onChange={this.handleChange} />
            //         </label>
            //         <input type="submit" value="Submit" />
            //     </form>

            // </div >
        )
    }
}

export default ViewProfilePage







// import React, { Component } from 'react';

// class ViewProfilePage extends Component {

//     constructor(props) {
//         super(props);
//         this.onCreateRecord = this.onCreateRecord.bind(this);
//         this.onViewRecord = this.onViewRecord.bind(this);
//         this.state = {
//             private_key: "",
//             address: ""
//         }

//     } 
    
    
//     onCreateRecord() {

//     }

//     onViewRecord() {
        
//     }


//     render() {
//         //get info from db base on private key and address
//         var person = {
//             personal_id = '123',
//             name: 'Someone',
//             age: '30',
//             start_date = '10/10',
//             end_date = '11/10'

//         };
//         return (
//             <div>
//                 <h1>Header</h1>
//                 <p>Personal ID: {person.personal_id}</p>
//                 <p>Name: {person.name}</p>
//                 <p>Age: {person.age}</p>
//                 <p>Start date: {person.start_date}</p>
//                 <p>End date: {person.end_date}</p>
//                 <hr />
//                 <button onClick={this.onCreateRecord}>Create record</button>
//                 <button onClick={this.onViewRecord}>View record</button>
//             </div>
//         )
//     }


// }

// export default ViewProfilePage