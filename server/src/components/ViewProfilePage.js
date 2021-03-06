import React, { Component } from 'react';
import { web3, Profile, Profile_setVariables } from '../lib/util'; 

class ViewProfilePage extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onClickObject = this.onClickObject.bind(this);
        this.update = this.update.bind(this);
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
                records: [],
            }
        }
    }

    async componentDidMount() {
        let deployedContractMethod = new web3.eth.Contract(Profile.abi, this.state.form_data.address).methods;
        this.state.form_data.full_name = await deployedContractMethod.full_name().call()
        this.state.form_data.gender = await deployedContractMethod.gender().call()
        this.state.form_data.dob = (new Date(await deployedContractMethod.dob().call() *1000)).toISOString().substring(0, 10)
        this.state.form_data.occupation = await deployedContractMethod.occupation().call()
        this.state.form_data.region = await deployedContractMethod.region().call()
        this.state.form_data.education_level = await deployedContractMethod.education_level().call()
        this.state.form_data.is_foreigner = await deployedContractMethod.is_foreigner().call()
        this.state.form_data.home_address = await deployedContractMethod.home_address().call()
        this.state.form_data.is_health_assuarance = await deployedContractMethod.is_health_assuarance().call()
        this.state.form_data.health_assuarance_expired_date = (new Date(await deployedContractMethod.health_assuarance_expired_date().call() *1000)).toISOString().substring(0, 10)
        this.state.form_data.health_assuarance_id = await deployedContractMethod.health_assuarance_id().call()
        this.state.form_data.contact = await deployedContractMethod.contact().call()
        let index = 0
        try {
            this.state.form_data.records.push(await deployedContractMethod.records(index++).call())
        } catch (e) {
            console.error(e)
        }
        await this.setState(this.state);
    }
   
    onClickObject(event) {
        console.log(this.state);
    }

    update(event) {
        event.preventDefault();
        let password = prompt("provide private key")
        Profile_setVariables(
            this.state.form_data.address, 
            password,   
            this.state.form_data.full_name, 
            this.state.form_data.gender, 
            new Date(this.state.form_data.dob).getTime()/1000, 
            this.state.form_data.occupation, 
            this.state.form_data.region, 
            this.state.form_data.education_level, 
            this.state.form_data.is_foreigner, 
            this.state.form_data.home_address, 
            this.state.form_data.is_health_assuarance, 
            new Date(this.state.form_data.health_assuarance_expired_date).getTime()/1000, 
            this.state.form_data.health_assuarance_id, 
            this.state.form_data.contact
        ).then(this.setState(this.state)).catch(alert)
        
    }

    handleChange(event) {
        this.state.form_data[event.target.name] = event.target.value
        this.setState(this.state)
    }

    handleCheckbox(event) {
        this.state.form_data[event.target.name] = event.target.checked
        this.setState(this.state)
    }

    render() {
        return (
            <div class="container">
                <div class="row navbar">
                    <div class="col-sm-12" style={{textAlign: 'center'}}>
                        <label style={{fontSize: '20px'}}>HEALTHCARE</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <button onClick={this.onClickObject}>
                            Display Object
                        </button> 
                        <form>
                            <fieldset>
                                <legend>Personal Information</legend>
                                <div class="form-group row">
                                    <label for="addressId" class="col-sm-3 col-form-label">Address</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="address" class="form-control" id="addressId" placeholder="Enter Address..." value={this.state.form_data.address} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="fullnameId" class="col-sm-3 col-form-label">Full Name</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="full_name" class="form-control" id="fullnameId" placeholder="Enter Fullname..." value={this.state.form_data.full_name} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">Gender</label>
                                    <div class="col-sm-9">
                                        <input type="checkbox" name="gender" checked={this.state.form_data.gender} onClick={this.handleCheckbox}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="dobId" class="col-sm-3 col-form-label">Birthday</label>
                                    <div class="col-sm-9">
                                        <input type="date" name="dob" class="form-control" id="dobId" value={this.state.form_data.dob} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="occupationId" class="col-sm-3 col-form-label">Occupation</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="occupation" class="form-control" id="occupationId" placeholder="Enter Occupation..." value={this.state.form_data.occupation} onChange={this.handleChange}/> 
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="regionId" class="col-sm-3 col-form-label">Region</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="region" class="form-control" id="regionId" placeholder="Enter Region..." value={this.state.form_data.region} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="educationLvId" class="col-sm-3 col-form-label">Education Level</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="education_level" class="form-control" id="educationLvId" placeholder="Enter Education Level..." value={this.state.form_data.education_level} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">Foreigner</label>
                                    <div class="col-sm-9">
                                        <input type="checkbox" name="is_foreigner" checked={this.state.form_data.is_foreigner} onClick={this.handleCheckbox}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="homeAddressId" class="col-sm-3 col-form-label">Home Address</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="home_address" class="form-control" id="homeAddressId" placeholder="Enter Home Address..." value={this.state.form_data.home_address} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">Health Assuarance (HA)</label>
                                    <div class="col-sm-9">
                                        <input type="checkbox" name="is_health_assuarance" checked={this.state.form_data.is_health_assuarance} onClick={this.handleCheckbox}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="haExpDateId" class="col-sm-3 col-form-label">HA Expired Date</label>
                                    <div class="col-sm-9">
                                        <input type="date" class="form-control" id="haExpDateId" name="health_assuarance_expired_date" value={this.state.form_data.health_assuarance_expired_date} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="haIdId" class="col-sm-3 col-form-label">Health Assuarance Id</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="health_assuarance_id" class="form-control" id="haIdId" placeholder="Enter Health Assuarance Id..." value={this.state.form_data.health_assuarance_id} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="contactId" class="col-sm-3 col-form-label">Contact</label>
                                    <div class="col-sm-9">
                                        <input type="text" name="contact" class="form-control" id="contactId" placeholder="Enter Contact..." value={this.state.form_data.contact} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <button name="update" class="btn btn-primary" onClick={this.update}>Update</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default ViewProfilePage;