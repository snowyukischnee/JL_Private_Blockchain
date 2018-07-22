import React, { Component } from 'react';
import { web3, Profile, Profile_setVariables, Profile_constructor, Record, Record_constructor } from '../lib/util';
import ViewProfilePage from './ViewProfilePage';
import ViewRecordPage from './ViewRecordPage';
import ViewStagePage from './ViewStagePage';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
        this.onSubmitCreateProfile = this.onSubmitCreateProfile.bind(this);
        this.onSubmitViewProfile = this.onSubmitViewProfile.bind(this);

        this.onSubmitCreateRecord = this.onSubmitCreateRecord(this);
        this.onSubmitCreateStage = this.onSubmitCreateStage(this);

        this.state = {
            person: {
                address: "",
                private_key: "",
                first_name: "",
                last_name: "",
                full_name: "",
                gender: true,
                dob: "",
            },
            out_addr: "",
            priv_key: "",
            profile_addr: "",
            record_addr: "",
            is_redirect: false,
            redirect_to: 0
        }
        //Create enum for redirecting element page
        this.redirect_page = Object.freeze({ "home_page": 0, "view_profile": 1, "view_record": 2, "view_stage": 3 });

    }

    handleChange(event) {
        this.state.person[event.target.name] = event.target.value
        this.setState(this.state)
    }

    handleRadioButtonChange(event) {
        this.state.person[event.target.name] = event.target.checked
        this.setState(this.state)
    }


    onSubmitCreateStage(event) {
        event.preventDefault();

        this.setState({
            out_addr: this.state.profile_addr,
            is_redirect: true,
            redirect_to: 3
        });
    }



    onSubmitCreateRecord(event) {
        event.preventDefault();
        Record_constructor(this.state.profile_addr).then((adrr) => {
            console.log(addr);
            this.state.out_addr = addr;
        }).catch(alert);

        this.setState({
            is_redirect: true,
            redirect_to: 2
        });
    }


    onSubmitCreateProfile(event) {
        //TODO:Implement routing
        event.preventDefault();
        Profile_constructor(this.state.priv_key).then((addr) => {
            console.log(addr);
            this.state.out_addr = addr;
        }).catch(alert);

        this.setState({
            is_redirect: true,
            redirect_to: 1
        });

    }

    onSubmitViewProfile(event) {
        //TODO:Implement routing
        event.preventDefault();
        console.log(this.state.person)
        this.setState({
            is_redirect: true,
            redirect_to: 1
        });
    }

    render() {

        switch (this.state.redirect_to) {
            case this.redirect_page.view_profile:
                return <ViewProfilePage address={this.state.out_addr} />
            case this.redirect_page.view_record:
                return <ViewRecordPage address={this.state.out_addr} />
            case this.redirect_page.view_stage:
                return <ViewStagePage address={this.state.out_addr} />
            default:
                return (
                    <div class="container-fluid">
                        <div class="row navbar">
                            <div class="col-sm-6" style={{ textAlign: 'center' }}>
                                <label style={{ fontSize: '20px' }}>HEALTHCARE</label>
                            </div>
                            <div class="col-sm-2">
                            </div>
                            <div class="col-sm-4">
                                <form onSubmit={this.onSubmitViewProfile}>
                                    <div class="form-group">
                                        <label>Patient address</label>
                                        <div class="row">
                                            <div class="col-sm-8" style={[{ paddingLeft: '0px' }, { float: 'right' }]}>
                                                <input type="text" name="address" class="form-control" placeholder="Enter address" value={this.state.address} onChange={this.handleChange} />
                                            </div>
                                            <div class="col-sm-4">
                                                <button type="submit" class="btn btn-primary">View</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                            </div>
                            <div class="col-sm-6">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <h1>Create new account</h1>
                                        <small>It's free and always be.</small>
                                    </div>
                                </div>
                                <form style={{ margin: '10px' }} onSubmit={this.onSubmitCreateProfile}>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-6" style={{ paddingRight: '5px' }}>
                                                <input name="first_name" type="text" class="form-control" placeholder="First Name" value={this.state.first_name} onChange={this.handleChange} />
                                            </div>
                                            <div class="col-sm-6">
                                                <input name="last_name" type="text" class="form-control" placeholder="Last name" value={this.state.last_name} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Personal ID" />
                                    </div>
                                    <div class="form-group">
                                        <input name="private_key" type="password" class="form-control" placeholder="Private Key" value={this.state.private_key} onChange={this.handleChange} />
                                    </div>
                                    <div class="form-group">
                                        <label>Birthday</label>
                                        <input name="dob" type="date" class="form-control" value={this.state.dob} onChange={this.handleChange} />
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <div class="custom-control custom-radio">
                                                    <input name="gender" type="radio" id="male" name="customRadio" class="custom-control-input" checked={this.state.private_key} onChange={this.handleRadioButtonChange} />
                                                    <label class="custom-control-label" for="male">Male</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="female" name="customRadio" class="custom-control-input" />
                                                    <label class="custom-control-label" for="female">Female</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                );
        }



    }
}
export default HomePage;