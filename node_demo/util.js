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

//-------------------------TESTED------------------------------------------------------------------------------------
function Profile_constructor(private_key) {
    let result
    let contract
    let deployContract
    let address
    result = web3.eth.personal.unlockAccount(config.account, config.password, 1500).then((result) => {
        console.log('Account unlocked');
    }).then(() => {
        contract = new web3.eth.Contract(Profile.abi)
        deployContract = contract.deploy({data: Profile.bytecode, arguments: [private_key]})
        return deployContract.estimateGas()
    }).then((estimatedGas) => {
        return deployContract.send({
            from: config.account,
            gas: estimatedGas,
            gasPrice: '0'
        })
    }).then((deployedContract) => {
        address = deployedContract.options.address     
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
//-------------------------TESTED------------------------------------------------------------------------------------
function Profile_setVariables(
    _addr, private_key, _full_name, _gender, _dob, 
    _occupation, _region, _education_level, _is_foreigner, 
    _home_address, _is_health_assuarance, 
    _health_assuarance_expired_date, _health_assuarance_id, _contact) {

    let result
    let deployedContract
    let deployedContractMethod

    result = web3.eth.personal.unlockAccount(config.account, config.password, 1500).then((result) => {
        console.log('Account unlocked');
    }).then(() => {
        deployedContract = new web3.eth.Contract(Profile.abi, _addr)
        deployedContractMethod = deployedContract.methods.setVariables(
            private_key, _full_name, _gender, _dob, 
            _occupation, _region, _education_level, _is_foreigner, 
            _home_address, _is_health_assuarance, 
            _health_assuarance_expired_date, _health_assuarance_id, _contact
        )
        return deployedContractMethod.estimateGas()
    }).then((estimatedGas) => {
        return deployedContractMethod.send({
            from: config.account,
            gas: estimatedGas,
            gasPrice: '0'
        })
    }).then((transaction_hash) => {
        return transaction_hash   
    }).catch((error) => {
        console.log(error)
    }).then(() => {
        web3.eth.personal.lockAccount(config.account)
    }).then((result) => {
        console.log('Account locked');
    }).catch((error) => {
        console.log('Can not lock account');
    })
    return result     
}
//-------------------------TESTED------------------------------------------------------------------------------------
function Record_constructor(_addr) {
    let result
    let contract
    let deployContract
    let address
    result = web3.eth.personal.unlockAccount(config.account, config.password, 1500).then((result) => {
        console.log('Account unlocked');
    }).then(() => {
        contract = new web3.eth.Contract(Record.abi)
        deployContract = contract.deploy({data: Record.bytecode, arguments: [_addr]})
        return deployContract.estimateGas()
    }).then((estimatedGas) => {
        return deployContract.send({
            from: config.account,
            gas: estimatedGas,
            gasPrice: '0'
        })
    }).then((deployedContract) => {
        address = deployedContract.options.address     
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

function Record_setStartVariables(_start_date, _original_entry, _previous_medical_unit) {}
function Record_setEndVariables(_end_date, _end_reason, _end_health_status,
    _main_found_disease, _relating_found_disease, _next_medical_unit,
    _to_next_medical_unit_date, _is_catastrophe, _is_side_effect,
    _dead_time, _dead_reason, _dead_detailed_reason) {}
function Record_confirm(_priv_key) {}
function Stage_setVariables(_doctor_id) {}
function Stage_confirm() {}
function TreatmentStage_constructor(_addr, _department) {}
function TreatmentStage_addTreatmentMethod(_addr) {}
function DiagnoseStage_constructor(_addr, _department) {}
function DiagnoseStage_addManifestation(_manifestation) {}
function DiagnoseStage_setDiagnose(_diagnose) {}
function TestStage_constructor(_addr, _department) {}
function TestStage_pushFile(_addr) {}
function File_constructor(_addr, _test_type, _file) {}
function TreatmentMethod_constructor(_addr, _name, _start_time, _stop_time, _description) {}

//Profile_constructor("my priv key").then(console.log) 
/*Profile_setVariables("0x013E00E67eD9447A25Ef4CA7C29f8096e591b863", "my priv key", "WHat Is fUll name", true, new Date().getTime()/1000, "_occupation", "_region", "_education_level", false,
    "_home_address", true, new Date().getTime()/1000, "_health_assuarance_id", "_contact").then(console.log)*/
//getProfile("0x013E00E67eD9447A25Ef4CA7C29f8096e591b863").then(console.log)
Record_constructor("0x67ECd2E10E4da7dfa10FD0508C05c4D6f80e9A11").then(console.log)
//exports.createProfile = createProfile