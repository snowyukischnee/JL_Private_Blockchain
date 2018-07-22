import React, { Component } from 'react';
import { web3, Record, Record_setStartVariables, Record_setEndVariables, Record_confirm } from '../lib/util';

class ViewProfilePage extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onClickObject = this.onClickObject.bind(this);
        this.updateStart = this.updateStart.bind(this);
        this.updateEnd = this.updateEnd.bind(this);
        this.confirm = this.confirm.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            record: {
                address: props.address,
                stages: [],
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
            }
        }

    }

    async componentDidMount() {
        let deployedRecordMethod = new web3.eth.Contract(Record.abi, this.state.record.address).methods;

        this.state.record.start_date = await deployedRecordMethod.start_date().call()
        this.state.record.original_entry = await deployedRecordMethod.original_entry().call()
        this.state.record.previous_medical_unit = await deployedRecordMethod.previous_medical_unit().call()
        this.state.record.end_date = await deployedRecordMethod.end_date().call()
        this.state.record.end_reason = await deployedRecordMethod.end_reason().call()
        this.state.record.end_health_status = await deployedRecordMethod.end_health_status().call()
        this.state.record.main_found_disease = await deployedRecordMethod.main_found_disease().call()
        this.state.record.relating_found_disease = await deployedRecordMethod.relating_found_disease().call()
        this.state.record.next_medical_unit = await deployedRecordMethod.next_medical_unit().call()
        this.state.record.to_next_medical_unit_date = await deployedRecordMethod.to_next_medical_unit_date().call()
        this.state.record.is_catastrophe = await deployedRecordMethod.is_catastrophe().call()
        this.state.record.is_side_effect = await deployedRecordMethod.is_side_effect().call()
        this.state.record.dead_time = await deployedRecordMethod.dead_time().call()
        this.state.record.dead_reason = await deployedRecordMethod.dead_reason().call()
        this.state.record.dead_detailed_reason = await deployedRecordMethod.dead_detailed_reason().call()
        let index = 0
        try {
            this.state.record.stages.push(await deployedRecordMethod.stages(index++).call())
        } catch (e) {
            console.error(e)
        }
        await this.setState(this.state);
    }

    onClickObject(event) {
        console.log(this.state);
    }

    updateStart(event) {
        event.preventDefault();
        Record_setStartVariables(
            this.state.record.address,
            this.state.record.start_date,
            this.state.record.original_entry,
            this.state.record.previous_medical_unit,
        ).then(this.setState(this.state)).catch(alert)

    }

    updateEnd(event) {
        event.preventDefault();
        //let password = prompt("provide private key")
        Record_setEndVariables(
            this.state.record.address,
            this.state.record.end_date,
            this.state.record.end_reason,
            this.state.record.end_health_status,
            this.state.record.main_found_disease,
            this.state.record.relating_found_disease,
            this.state.record.next_medical_unit,
            this.state.record.to_next_medical_unit_date,
            this.state.record.is_catastrophe,
            this.state.record.is_side_effect,
            this.state.record.dead_time,
            this.state.record.dead_reason,
            this.state.record.dead_detailed_reason,
        ).then(this.setState(this.state)).catch(alert)
    }

    confirm(event) {
        event.preventDefault()
        let password = prompt("Provide private key")
        Record_confirm(this.state.record.address, password).then(this.setState(this.state)).catch(alert)
    }

    handleChange(event) {
        this.state.record[event.target.name] = event.target.value
        this.setState(this.state)
    }

    render() {
        return (
            <div>
                <button onClick={this.onClickObject}>
                    Display Object
                </button>
                <form onSubmit={this.onUpdate}>
                    <br /><label>address<input type="text" name="address" value={this.state.record.address} onChange={this.handleChange} /></label>
                    <br /><label>start_date<input type="text" name="start_date" value={this.state.record.start_date} onChange={this.handleChange} /></label>
                    <br /><label>original_entry<input type="text" name="original_entry" value={this.state.record.original_entry} onClick={this.handleChange} /></label>
                    <br /><label>previous_medical_unit<input type="text" name="previous_medical_unit" value={this.state.record.previous_medical_unit} onChange={this.handleChange} /></label>
                    <button name="updateStart" onClick={this.updateStart}>Update start</button>

                    <br /><label>end_date<input type="text" name="end_date" value={this.state.record.end_date} onChange={this.handleChange} /></label>
                    <br /><label>end_reason<input type="text" name="end_reason" value={this.state.record.end_reason} onChange={this.handleChange} /></label>
                    <br /><label>end_health_status<input type="text" name="end_health_status" value={this.state.record.end_health_status} onChange={this.handleChange} /></label>
                    <br /><label>main_found_disease<input type="text" name="main_found_disease" value={this.state.record.main_found_disease} onClick={this.handleCheckbox} /></label>
                    <br /><label>relating_found_disease<input type="text" name="relating_found_disease" value={this.state.record.relating_found_disease} onChange={this.handleChange} /></label>
                    <br /><label>next_medical_unit<input type="text" name="next_medical_unit" value={this.state.record.next_medical_unit} onClick={this.handleCheckbox} /></label>
                    <br /><label>to_next_medical_unit_date<input type="text" name="to_next_medical_unit_date" value={this.state.record.to_next_medical_unit_date} onChange={this.handleChange} /></label>
                    <br /><label>is_catastrophe<input type="text" name="is_catastrophe" value={this.state.record.is_catastrophe} onChange={this.handleChange} /></label>
                    <br /><label>is_side_effect<input type="text" name="is_side_effect" value={this.state.record.is_side_effect} onChange={this.handleChange} /></label>
                    <br /><label>dead_time<input type="text" name="dead_time" value={this.state.record.dead_time} onChange={this.handleChange} /></label>
                    <br /><label>dead_reason<input type="text" name="dead_reason" value={this.state.record.dead_reason} onChange={this.handleChange} /></label>
                    <br /><label>dead_detailed_reason<input type="text" name="dead_detailed_reason" value={this.state.record.dead_detailed_reason} onChange={this.handleChange} /></label>
                    <br />
                    <ul>
                        {this.state.stages.map(stage => {
                            return <li>{stage}</li>;
                        })}
                    </ul>
                    <button name="update" onClick={this.updateEnd}>Update End</button>
                    <button name="confirm" onClick={this.confirm}>Confirm</button>
                </form>
            </div>
        )
    }
}
export default ViewRecordPage;