let config = require("./config.json")
let Web3 = require('web3')
let web3 = new Web3(Web3.givenProvider || config.host)

let File = require('./build/contracts/File.json')
let DiagnoseStage = require('./build/contracts/DiagnoseStage.json')
let Profile = require('./build/contracts/Profile.json')
let Record = require('./build/contracts/Record.json')
let TestStage = require('./build/contracts/TestStage.json')
let TreatmentMethod = require('./build/contracts/TreatmentMethod.json')
let TreatmentStage = require('./build/contracts/TreatmentStage.json')

function createProfile(private_key, _full_name, _gender, _dob, _occupation, _region, _education_level, _is_foreigner,
    _home_address, _is_health_assuarance, _health_assuarance_expired_date, _health_assuarance_id, _contact) {
    let result
    let contractProfile
    let deployProfile
    let address
    result = web3.eth.personal.unlockAccount(config.account, config.password, 1500).then((result) => {
        console.log('Account unlocked');
    }).then(() => {
        contractProfile = new web3.eth.Contract(Profile.abi)
        deployProfile = contractProfile.deploy({data: Profile.bytecode, arguments: [private_key]})
        return deployProfile.estimateGas()
    }).then((estimatedGas) => {
        console.log(estimatedGas)
        return deployProfile.send({
            from: config.account,
            gas: estimatedGas,
            gasPrice: '0'
        })
    }).then((deployedContractProfile) => {
        return deployedContractProfile.methods.setVariables(private_key,_full_name, _gender, _dob, _occupation, _region, _education_level, _is_foreigner,
            _home_address, _is_health_assuarance, _health_assuarance_expired_date, _health_assuarance_id, _contact ) .estimateGas()
    }).then((estimatedGas)=>{
        return deployedContractProfile.methods.setVariables(private_key,_full_name, _gender, _dob, _occupation, _region, _education_level, _is_foreigner,
            _home_address, _is_health_assuarance, _health_assuarance_expired_date, _health_assuarance_id, _contact ).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
            })
    }).then((transaction_hash)=>{
        //console.log('Profile = ' + deployedContractProfile.options.address)
        address = deployedContractProfile.options.address     
    }).catch((error) => {
        console.log(error)
    }).then(() => {
        web3.eth.personal.lockAccount(config.account)
    }).then((result) => {
        console.log('Account locked');
    }).catch((error) => {
        console.log('Can not lock account');
    }).then(()=> {
        console.log('')
        return address
    })
    return result
}

function getProfile(address)
{
    let contractProfile = new web3.eth.Contract(Profile.abi, address);    
    return contractProfile.owner.call().then((result) =>{
        console.log("Profile:\n" + x)
        return result
    })
}

function createRecord (_profile_address, _start_date, _original_entry, _previous_medical_unit)
{
    let result
    let contractRecord
    let deployRecord
    let address
    result = web3.eth.personal.unlockAccount(config.account, config.password, 1500).then((result) => {
        console.log('Account unlocked');
    }).then(() => {
        contractRecord = new web3.eth.Contract(Record.abi)
        deployRecord = contractRecord.deploy({data: Record.bytecode, arguments: [_profile_address]})
        return deployRecord.estimateGas()
    }).then((estimatedGas) => {
        console.log(estimatedGas)
        return deployRecord.send({
            from: config.account,
            gas: estimatedGas,
            gasPrice: '0'
        })
    }).then((deployedContractRecord) => {
        return deployedContractRecord.methods.setStartVariables(_start_date, _original_entry, _previous_medical_unit ) .estimateGas()
    }).then((estimatedGas) => {
        return deployedContractRecord.methods.setStartVariables(_start_date, _original_entry, _previous_medical_unit ).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
    }).then((transaction_hash) => {
        address = deployedContractRecord.options.address
    }).catch((error) => {
        console.log(error)
    }).then(() => {
        web3.eth.personal.lockAccount(config.account)
    }).then((result) => {
        console.log('Account locked');
    }).catch((error) => {
        console.log('Can not lock account');
    }).then(()=> {
        return address
    })
    return result
}

function updateEndRecord (_record_address, _end_date, _end_reason, _end_health_status, 
    _main_found_disease, _relating_found_disease, _next_medical_unit,
    _to_next_medical_unit_date, _is_catastrophe, _is_side_effect,
    _dead_time, _dead_reason, _dead_detailed_reason)
{
    let result
    let contractRecord
    let deployRecord
    let address
    result = web3.eth.personal.unlockAccount(config.account, config.password, 1500).then((result) => {
        console.log('Account unlocked');
    }).then(() => {
        contractRecord = new web3.eth.Contract(Record.abi)
        deployRecord = contractRecord.deploy({data: Record.bytecode, arguments: [_record_address]})
        return deployRecord.estimateGas()
    }).then((estimatedGas) => {
        console.log(estimatedGas)
        return deployRecord.send({
            from: config.account,
            gas: estimatedGas,
            gasPrice: '0'
        })
    }).then((deployedContractRecord) => {
        return deployedContractRecord.methods.setEndVariables(_end_date, _end_reason, _end_health_status, 
            _main_found_disease, _relating_found_disease, _next_medical_unit,
            _to_next_medical_unit_date, _is_catastrophe, _is_side_effect,
            _dead_time, _dead_reason, _dead_detailed_reason) .estimateGas()
    }).then((estimatedGas)=>{
        return deployedContractRecord.methods.setEndVariables(_end_date, _end_reason, _end_health_status, 
            _main_found_disease, _relating_found_disease, _next_medical_unit,
            _to_next_medical_unit_date, _is_catastrophe, _is_side_effect,
            _dead_time, _dead_reason, _dead_detailed_reason).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
    }).then((transaction_hash)=>{
        address = deployedContractRecord.options.address        
    }).catch((error) => {
        console.log(error)
    }).then(() => {
        web3.eth.personal.lockAccount(config.account)
    }).then((result) => {
        console.log('Account locked');
    }).catch((error) => {
        console.log('Can not lock account');
    }).then(()=> {
        console.log(address);
        return address
    })
    return result
}

createProfile("my priv key", "WHat Is fUll name", true, new Date().getTime()/1000, "_occupation", "_region", "_education_level", false,
    "_home_address", true, new Date().getTime()/1000, "_health_assuarance_id", "_contact").then(console.log)

//exports.createProfile = createProfile