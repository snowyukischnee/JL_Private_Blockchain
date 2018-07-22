import React, { Component } from 'react';
import { web3, Record, Record_setStartVariables, Record_setEndVariables, Record_confirm } from '../lib/util';
import ViewStagePage from './ViewStagePage';

class ViewRecordPage extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.onClickObject = this.onClickObject.bind(this);
        this.onRecordElementClick = this.onRecordElementClick.bind(this);
        this.updateStart = this.updateStart.bind(this);
        this.updateEnd = this.updateEnd.bind(this);
        this.confirm = this.confirm.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            data_changable: true,
            record: {
                address: props.address,
                stages: [],
                start_date: '',
                original_entry: '',
                previous_medical_unit: '',
                end_date: '',
                end_reason: '',
                end_health_status: '',
                main_found_disease: '',
                relating_found_disease: '',
                next_medical_unit: '',
                to_next_medical_unit_date: '',
                is_catastrophe: '',
                is_side_effect: '',
                dead_time: '',
                dead_reason: '',
                dead_detailed_reason: '',
            },
            out_addr: "",
            is_redirect: false
        }

    }

    async componentDidMount() {
        let deployedRecordMethod = new web3.eth.Contract(Record.abi, this.state.record.address).methods;

        this.state.data_changable = await deployedRecordMethod.data_changable().call()
        this.state.record.start_date = (new Date(await deployedRecordMethod.start_date().call() * 1000)).toISOString().substring(0, 10)
        this.state.record.original_entry = await deployedRecordMethod.original_entry().call()
        this.state.record.previous_medical_unit = await deployedRecordMethod.previous_medical_unit().call()
        this.state.record.end_date = (new Date(await deployedRecordMethod.end_date().call() * 1000)).toISOString().substring(0, 10)
        this.state.record.end_reason = await deployedRecordMethod.end_reason().call()
        this.state.record.end_health_status = await deployedRecordMethod.end_health_status().call()
        this.state.record.main_found_disease = await deployedRecordMethod.main_found_disease().call()
        this.state.record.relating_found_disease = await deployedRecordMethod.relating_found_disease().call()
        this.state.record.next_medical_unit = await deployedRecordMethod.next_medical_unit().call()
        this.state.record.to_next_medical_unit_date = (new Date(await deployedRecordMethod.to_next_medical_unit_date().call() * 1000)).toISOString().substring(0, 10)
        this.state.record.is_catastrophe = await deployedRecordMethod.is_catastrophe().call()
        this.state.record.is_side_effect = await deployedRecordMethod.is_side_effect().call()
        this.state.record.dead_time = (new Date(await deployedRecordMethod.dead_time().call() * 1000)).toISOString().substring(0, 10)
        this.state.record.dead_reason = await deployedRecordMethod.dead_reason().call()
        this.state.record.dead_detailed_reason = await deployedRecordMethod.dead_detailed_reason().call()
        let index = 0
        while (true) {
            try {
                this.state.record.stages.push(await deployedRecordMethod.stages(index++).call())
            } catch (e) { break }
        }
        await this.setState(this.state);
    }

    onClickObject(event) {
        console.log(this.state)
    }

    onRecordElementClick(event) {
        event.preventDefault();
        console.log(event);
        this.setState({
            out_addr: event.currentTarget.dataset.id,
            is_redirect: true
        })
    }

    updateStart(event) {
        event.preventDefault();
        Record_setStartVariables(
            this.state.record.address,
            new Date(this.state.record.start_date).getTime() / 1000,
            this.state.record.original_entry,
            this.state.record.previous_medical_unit,
        ).then(this.setState(this.state)).catch(alert)

    }

    updateEnd(event) {
        event.preventDefault();
        //let password = prompt("provide private key")
        Record_setEndVariables(
            this.state.record.address,
            new Date(this.state.record.end_date).getTime() / 1000,
            this.state.record.end_reason,
            this.state.record.end_health_status,
            this.state.record.main_found_disease,
            this.state.record.relating_found_disease,
            this.state.record.next_medical_unit,
            new Date(this.state.record.to_next_medical_unit_date).getTime() / 1000,
            this.state.record.is_catastrophe,
            this.state.record.is_side_effect,
            new Date(this.state.record.dead_time).getTime() / 1000,
            this.state.record.dead_reason,
            this.state.record.dead_detailed_reason,
        ).then(this.setState(this.state)).catch(alert)
    }

    async confirm(event) {
        event.preventDefault()
        let password = prompt("Provide private key")
        await Record_confirm(this.state.record.address, password)
        await this.setState(this.state);
        await window.location.reload()
    }

    handleChange(event) {
        this.state.record[event.target.name] = event.target.value
        this.setState(this.state)
    }

    handleCheckbox(event) {
        this.state.record[event.target.name] = event.target.checked
        this.setState(this.state)
    }

    render() {
        let disabled = !this.state.data_changable ? { 'disabled': 'disabled' } : {};
        return (
            this.state.is_redirect ? (<ViewStagePage address={this.state.out_addr} />) :
                (<div>
                    <button onClick={this.onClickObject}>
                        Display Object
                </button>
                    <form>
                        <br /><label>address<input type="text" name="address" value={this.state.record.address} onChange={this.handleChange} disabled /></label>
                        <br /><label>start_date<input type="date" name="start_date" value={this.state.record.start_date} onChange={this.handleChange} {...disabled} /></label>
                        <br /><label>original_entry<input type="text" name="original_entry" value={this.state.record.original_entry} onChange={this.handleChange} {...disabled} /></label>
                        <br /><label>previous_medical_unit<input type="text" name="previous_medical_unit" value={this.state.record.previous_medical_unit} onChange={this.handleChange} {...disabled} /></label>
                        <button name="updateStart" onClick={this.updateStart} {...disabled}>Update start</button>
                        <br /><label>end_date<input type="date" name="end_date" value={this.state.record.end_date} onChange={this.handleChange} {...disabled} /></label>
                        <br /><label>end_reason<input type="text" name="end_reason" value={this.state.record.end_reason} onChange={this.handleChange} {...disabled} /></label>
                        <br /><label>end_health_status<input type="text" name="end_health_status" value={this.state.record.end_health_status} onChange={this.handleChange} {...disabled} /></label>
                        <br /><label>main_found_disease<input type="text" name="main_found_disease" value={this.state.record.main_found_disease} onChange={this.handleChange} {...disabled} /></label>
                        <br /><label>relating_found_disease<input type="text" name="relating_found_disease" value={this.state.record.relating_found_disease} onChange={this.handleChange} {...disabled} /></label>
                        <br /><label>next_medical_unit<input type="text" name="next_medical_unit" value={this.state.record.next_medical_unit} onChange={this.handleChange} {...disabled} /></label>
                        <br /><label>to_next_medical_unit_date<input type="date" name="to_next_medical_unit_date" value={this.state.record.to_next_medical_unit_date} onChange={this.handleChange} {...disabled} /></label>
                        <br /><label>is_catastrophe<input type="checkbox" name="is_catastrophe" checked={this.state.record.is_catastrophe} onClick={this.handleCheckbox} {...disabled} /></label>
                        <br /><label>is_side_effect<input type="checkbox" name="is_side_effect" checked={this.state.record.is_side_effect} onClick={this.handleCheckbox} {...disabled} /></label>
                        <br /><label>dead_time<input type="date" name="dead_time" value={this.state.record.dead_time} onChange={this.handleChange} {...disabled} /></label>
                        <br /><label>dead_reason<input type="text" name="dead_reason" value={this.state.record.dead_reason} onChange={this.handleChange} {...disabled} /></label>
                        <br /><label>dead_detailed_reason<input type="text" name="dead_detailed_reason" value={this.state.record.dead_detailed_reason} onChange={this.handleChange} {...disabled} /></label>
                        <button name="updateEnd" onClick={this.updateEnd} {...disabled}>Update End</button>
                        <ul class="list-group">
                            {this.state.record.stages.map((record) => (
                                <li onClick={this.onRecordElementClick} data-id={record}>{record}</li>
                            ))}
                        </ul>
                        <button name="confirm" onClick={this.confirm}>Confirm</button>
                    </form>
                </div>)
        )
    }
}
export default ViewRecordPage;