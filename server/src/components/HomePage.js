import React, { Component } from 'react';
class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      person: {
          address: "",
          private_key: "",
          first_name: "",
          last_name: "",
          full_name: "",
          gender: true,
          dob: "",
      }
    }

  }

  handleChange(event) {
    this.state.form_data[event.target.name] = event.target.value
    this.setState(this.state)
  }

  onSubmitViewProfile(event) {
    //TODO:Implement routing
  }
  onSubmitCreateProfile(event) {
    //TODO:Implement routing
  }

  render(){
    return (
      <div class="container-fluid">
        <div class="row navbar">
            <div class="col-sm-6" style={{textAlign: 'center'}}>
                <label style={{fontSize: '20px'}}>HEALTHCARE</label>
            </div>
            <div class="col-sm-2">
            </div>
            <div class="col-sm-4">
                <form onSubmit={this.onSubmitViewProfile}>
                    <div class="form-group">
                        <label>Patient address</label>
                        <div class="row">
                            <div class="col-sm-8" style={[{paddingLeft: '0px'},{ float : 'right'}]}>
                                <input type="text" class="form-control" placeholder="Enter address" value={this.state.address} onChange={this.handleChange}/>
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
                <form style={{margin: '10px'}} onSubmit={this.onSubmitCreateProfile}>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-6" style={{paddingRight: '5px'}}>
                                <input type="text" class="form-control" placeholder="First Name" value={this.state.first_name} onChange={this.handleChange}/>
                            </div>
                            <div class="col-sm-6">
                                <input type="text" class="form-control" placeholder="Last name" value={this.state.last_name} onChange={this.handleChange}/>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Personal ID" />
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" placeholder="Private Key" value={this.state.private_key} onChange={this.handleChange}/>
                    </div>
                    <div class="form-group">
                        <label>Birthday</label>
                        <input type="date" class="form-control" value={this.state.dob} onChange={this.handleChange}/>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="custom-control custom-radio">
                                    <input type="radio" id="male" name="customRadio" class="custom-control-input" checked={this.state.private_key} onChange={this.handleChange}/>
                                    <label class="custom-control-label" for="male">Male</label>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="custom-control custom-radio">
                                    <input type="radio" id="female" name="customRadio" class="custom-control-input"/>
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
    )
  }  
}
export default HomePage;