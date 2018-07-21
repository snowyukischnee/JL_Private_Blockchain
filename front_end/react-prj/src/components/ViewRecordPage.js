import React, { Component } from 'react';
import { } from '../lib/util'

class ViewRecordView extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);


        let _address = props.address
        this.state = {
            record: {
                address: _address,
                stages: {},
                start_date: '',
                original_entry: '',
                previous_medical_unit: '',
                end_date = '',
                end_reason = '',
                end_health_status = '',
                main_found_disease = '',
                relating_found_disease = '',
                next_medical_unit = '',
                to_next_medical_unit_date = '',
                is_catastrophe = '',
                is_side_effect = '',
                dead_time = '',
                dead_reason = '',
                dead_detailed_reason = '',
                treatmentStages = {},
                diagnoseStage = {},
                testStage = {},
            }
        }

        let deployRecord = new web3.eth.Contract(Record.abi, address)


        //TODO: get stages
        deployRecord.methods.start_date().call().then((start_date) => this.state.start_date = start_date)
        deployRecord.methods.original_entry().call().then((original_entry) => this.state.original_entry = original_entry)
        deployRecord.methods.previous_medical_unit().call().then((previous_medical_unit) => this.state.previous_medical_unit = previous_medical_unit)
        deployRecord.methods.end_date().call().then((end_date) => this.state.end_date = end_date)
        deployRecord.methods.end_reason().call().then((end_reason) => this.state.end_reason = end_reason)
        deployRecord.methods.end_health_status().call().then((end_health_status) => this.state.end_health_status = end_health_status)
        deployRecord.methods.main_found_disease().call().then((main_found_disease) => this.state.main_found_disease = main_found_disease)
        deployRecord.methods.relating_found_disease().call().then((relating_found_disease) => this.state.relating_found_disease = relating_found_disease)
        deployRecord.methods.next_medical_unit().call().then((next_medical_unit) => this.state.next_medical_unit = next_medical_unit)
        deployRecord.methods.to_next_medical_unit_date().call().then((to_next_medical_unit_date) => this.state.to_next_medical_unit_date = to_next_medical_unit_date)
        deployRecord.methods.is_catastrophe().call().then((is_catastrophe) => this.state.is_catastrophe = is_catastrophe)
        deployRecord.methods.is_side_effect().call().then((is_side_effect) => this.state.is_side_effect = is_side_effect)
        deployRecord.methods.dead_time().call().then((dead_time) => this.state.dead_time = dead_time)
        deployRecord.methods.dead_reason().call().then((dead_reason) => this.state.dead_reason = dead_reason)
        deployRecord.methods.dead_detailed_reason().call().then((dead_detailed_reason) => this.state.dead_detailed_reason = dead_detailed_reason)

        let deployedStage = new web3.eth.Contract(Stage.abi, stage)
        var treatmentStages = this.state.stages.filter((stage) => {
            let deployedStage = new web3.eth.Contract(Stage.abi, stage)
            deployedStage.stagetype == UtilLib.stage.TreatmentStage
        })
        this.state.treatmentStages = treatmentStages

        var diagnoseStage = this.state.stages.filter((stage) => {

            deployedStage.stagetype == UtilLib.stage.DiagnoseStage
        })
        this.state.diagnoseStage = diagnoseStage

        var testStage = this.state.stages.filter((stage) => {
            let deployedStage = new web3.eth.Contract(Stage.abi, stage)
            deployedStage.stagetype == UtilLib.stage.TestStage
        })
        this.state.testStage = testStage
    }

    onSubmit = (e) => {
        var private_key = e.target.elements.private_key.value
        Record_confirm(this.state.address, private_key).then((address) => {
            this.setState({
                address: address
            })
        }).catch(alert);
    }

    render() {
        return (
            <div>
                <h1>View Record</h1>
                <p>Treatment Stages: </p>
                <ul>
                    {this.state.treatmentStages.map(stage => {
                        return <li>{stage}</li>;
                    })}
                </ul>
                <p>Test Stages: </p>
                <ul>
                    {this.state.testStage.map(stage => {
                        return <li>{stage}</li>;
                    })}
                </ul>
                <p>Diagnose Stages: </p>
                <ul>
                    {this.state.diagnoseStage.map(stage => {
                        return <li>{stage}</li>;
                    })}
                </ul>
                <form onSubmit={this.onSubmit}>
                    <label>To confirm these records, please input your private key and click Confirm</label>
                    <input type="password" name="private_key" />
                    <button>Confirm Record</button>
                </form>
            </div>
        )
    }
}

export default ViewRecordView;