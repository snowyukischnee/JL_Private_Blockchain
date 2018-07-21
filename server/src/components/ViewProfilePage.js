import React, { Component } from 'react';
import { web3, Profile, Profile_setVariables } from '../lib/util'; 

class ViewProfilePage extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onClickObject = this.onClickObject.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.state = {
            form_data: {
                address: props.address,
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
                contact: "",
                records: "",
            }
        }
    }

    async componentDidMount() {
        let deployedContractMethod = new web3.eth.Contract(Profile.abi, this.state.form_data.address).methods;
        this.state.form_data.full_name = await deployedContractMethod.full_name().call()
        this.state.form_data.gender = await deployedContractMethod.gender().call()
        this.state.form_data.dob = await deployedContractMethod.dob().call()
        this.state.form_data.occupation = await deployedContractMethod.occupation().call()
        this.state.form_data.region = await deployedContractMethod.region().call()
        this.state.form_data.education_level = await deployedContractMethod.education_level().call()
        this.state.form_data.is_foreigner = await deployedContractMethod.is_foreigner().call()
        this.state.form_data.home_address = await deployedContractMethod.home_address().call()
        this.state.form_data.is_health_assuarance = await deployedContractMethod.is_health_assuarance().call()
        this.state.form_data.health_assuarance_expired_date = await deployedContractMethod.health_assuarance_expired_date().call()
        this.state.form_data.health_assuarance_id = await deployedContractMethod.health_assuarance_id().call()
        this.state.form_data.contact = await deployedContractMethod.contact().call()
        await this.setState(this.state);
    }
   
    onClickObject(event) {
        console.log(this.state);
    }

    onUpdate(event) {
        event.preventDefault();
        Profile_setVariables(
            this.state.form_data.address, 
            "my priv key", 
            this.state.form_data.full_name, 
            this.state.form_data.gender, 
            this.state.form_data.dob, 
            this.state.form_data.occupation, 
            this.state.form_data.region, 
            this.state.form_data.education_level, 
            this.state.form_data.is_foreigner, 
            this.state.form_data.home_address, 
            this.state.form_data.is_health_assuarance, 
            this.state.form_data.health_assuarance_expired_date, 
            this.state.form_data.health_assuarance_id, 
            this.state.form_data.contact
        ).then(this.setState(this.state)).catch(alert)
        
    }

    handleChange(event) {
        this.state.form_data[event.target.name] = event.target.value
        this.setState(this.state)
    }

    handleCheckbox(event) {
        console.log(event.target.checked)
        this.state.form_data[event.target.name] = event.target.checked
        this.setState(this.state)
    }

    render() {
        return (
            <div>
                <button onClick={this.onClickObject}>
                    Display Object
                </button>
                <form onSubmit={this.onUpdate}>
                    <br/><label>address<input type="text" name="address" value={this.state.form_data.address} onChange={this.handleChange}/></label>
                    <br/><label>full_name<input type="text" name="full_name" value={this.state.form_data.full_name} onChange={this.handleChange}/></label>
                    <br/><label>gender<input type="checkbox" name="gender" checked={this.state.form_data.gender} onClick={this.handleCheckbox}/></label>
                    <br/><label>dob<input type="number" name="dob" value={this.state.form_data.dob} onChange={this.handleChange}/></label>
                    <br/><label>occupation<input type="text" name="occupation" value={this.state.form_data.occupation} onChange={this.handleChange}/></label>
                    <br/><label>region<input type="text" name="region" value={this.state.form_data.region} onChange={this.handleChange}/></label>
                    <br/><label>education_level<input type="text" name="education_level" value={this.state.form_data.education_level} onChange={this.handleChange}/></label>
                    <br/><label>is_foreigner<input type="checkbox" name="is_foreigner" checked={this.state.form_data.is_foreigner} onClick={this.handleCheckbox}/></label>
                    <br/><label>home_address<input type="text" name="home_address" value={this.state.form_data.home_address} onChange={this.handleChange}/></label>
                    <br/><label>is_health_assuarance<input type="checkbox" name="is_health_assuarance" checked={this.state.form_data.is_health_assuarance} onClick={this.handleCheckbox}/></label>
                    <br/><label>health_assuarance_expired_date<input type="number" name="health_assuarance_expired_date" value={this.state.form_data.health_assuarance_expired_date} onChange={this.handleChange}/></label>
                    <br/><label>health_assuarance_id<input type="text" name="health_assuarance_id" value={this.state.form_data.health_assuarance_id} onChange={this.handleChange}/></label>
                    <br/><label>contact<input type="text" name="contact" value={this.state.form_data.contact} onChange={this.handleChange}/></label>
                    <input type="submit" name="update" value="update"/>
                </form>
            </div>
        )
    }
}
export default ViewProfilePage;