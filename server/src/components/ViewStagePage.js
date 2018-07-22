import React, { Component } from 'react';
import { web3, Stage, Stage_setVariables, TreatmentStage_addTreatmentMethod, TreatmentMethod_constructor, DiagnoseStage_addManifestation, DiagnoseStage_setDiagnose } from '../lib/util';


class ViewStagePage extends React.Component {

    Stage_enm = {
        "TestStage": 0,
        "DiagnoseStage": 1,
        "TreatmentStage": 2,
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onClickObject = this.onClickObject.bind(this);
        this.addTreatmentMethod = this.addTreatmentMethod.bind(this)
        this.update = this.update.bind(this);
        this.setDiagnose = this.setDiagnose.bind(this)
        this.addManifest = this.addManifest.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            stagetype: 0,
            address: props.address,
            department: 0,
            doctor_id: '',
            new_manifest: '',
            treatmentStage: {
                treatment_methods: []
            },
            testStage: {
                files: []
            },
            diagnoseStage: {
                manifestation: [],
                diagnose: ''
            },
        }
    }

    async componentDidMount() {
        let deployedStageMethod = new web3.eth.Contract(Stage.abi, this.state.stage.address).methods;
        let stagetype = deployedStageMethod.stagetype().call()
        this.state.stagetype = stagetype
        this.state.department = await deployedStageMethod.department().call()
        this.state.doctor_id = await deployedStageMethod.doctor_id().call()
        switch (stagetype) {
            case Stage_enm["TreatmentStage"]:
                let index = 0
                try {
                    this.state.stage.treatment_methods.push(await deployedStageMethod.treatment_methods(index++).call())
                } catch (e) {
                    console.error(e)
                }
                break;
            case Stage_enm["TestStage"]:
                let index = 0
                try {
                    this.state.stage.files.push(await deployedStageMethod.files(index++).call())
                } catch (e) {
                    console.error(e)
                }
                break;
            case Stage_enm["DiagnoseStage"]:
                this.state.stage.diagnose = await deployedStageMethod.doctor_id().call()
                let index = 0
                try {
                    this.state.stage.manifestation.push(await deployedStageMethod.manifestation(index++).call())
                } catch (e) {
                    console.error(e)
                }
                break;
        }
        await this.setState(this.state);
    }

    onClickObject(event) {
        console.log(this.state);
    }

    update(event) {
        // event.preventDefault();
        // Stage_setVariables(
        //     this.state.stage.address,
        //     this.state.stage.doctor_id,
        // ).then(this.setState(this.state)).catch(alert)
    }

    handleChange(event) {
        this.state[event.target.name] = event.target.value
        this.setState(this.state)
    }

    addTreatmentMethod(e) {
        TreatmentMethod_constructor(this.state.address, 'name', 1000, 2000, 'description')
        .then((treatmentMethodAddress) => {
            TreatmentStage_addTreatmentMethod(this.state.address, treatmentMethodAddress)
        }).then(this.setState(this.state)).catch(console.error)
    }

    setDiagnose(){
        DiagnoseStage_setDiagnose(this.state.address, this.state.diagnoseStage.diagnose).then(this.setState(this.state)).catch(console.error)
    }
    addManifest(){
        DiagnoseStage_addManifestation(this.state.address,this.state.new_manifest).then(this.setState(this.state)).catch(console.error)
    }

    render() {
        let stagetype = this.state.stagetype
        switch (stagetype) {
            case Stage_enm["TreatmentStage"]:
                return (
                    <div>
                        <br /><label>Department<input type="text" name="department" value={this.state.address} onChange={this.handleChange} /></label>
                        <br /><label>Doctor/ PIC<input type="text" name="doctor_id" value={this.state.doctor_id} onChange={this.handleChange} /></label>                        
                        <button name="addTreatmentMethod" onClick={this.addTreatmentMethod}>AddTreatmentMethod</button>
                    </div>)
                break
            case Stage_enm["TestStage"]:
                return (
                    <div>
                        <br /><label>Department<input type="text" name="department" value={this.state.address} onChange={this.handleChange} /></label>
                        <br /><label>Doctor/ PIC<input type="text" name="doctor_id" value={this.state.doctor_id} onChange={this.handleChange} /></label>
                        <button name="addFiles" onClick={this.addTreatmentMethod}>AddTreatmentMethod</button>
                    </div>)
                break
            case Stage_enm["DiagnoseStage"]:
                return (
                    <div>
                        <br /><label>Department<input type="text" name="department" value={this.state.address} onChange={this.handleChange} /></label>
                        <br /><label>Doctor/ PIC<input type="text" name="doctor_id" value={this.state.doctor_id} onChange={this.handleChange} /></label>
                        <br />
                        <label>New manifest<input type="text" name="new_manifest" value={this.state.new_manifest} onChange={this.handleChange}/></label>
                        <button name="addManifest" onClick={this.addManifest}>Add Manifest</button>

                        <br /><label>Diagnosis<input type="text" name="diagnose" value={this.state.diagnoseStage.diagnose} onChange={this.handleChange} /></label>
                        <button name="setDiagnose" onClick={this.setDiagnose}>setDiagnose</button>
                    </div>)
                break

        }
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
                    <button name="update" onClick={this.update}>Update</button>
                </form>
            </div>
        )
    }
}
export default ViewRecordPage;