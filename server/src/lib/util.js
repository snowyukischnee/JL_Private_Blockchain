let config = require("./config.json")
let Web3 = require('web3')

let web3 = new Web3(Web3.givenProvider || config.host)

let File = require('./build/contracts/File.json')
let DiagnoseStage = require('./build/contracts/DiagnoseStage.json')
let Profile = require('./build/contracts/Profile.json')
let Stage = require('./build/contracts/Stage.json')
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
//-------------------------TESTED------------------------------------------------------------------------------------
function Record_setStartVariables(_addr, _start_date, _original_entry, _previous_medical_unit) {
    let result
    let deployedContract
    let deployedContractMethod

    result = web3.eth.personal.unlockAccount(config.account, config.password, 1500).then((result) => {
        console.log('Account unlocked');
    }).then(() => {
        deployedContract = new web3.eth.Contract(Record.abi, _addr)
        deployedContractMethod = deployedContract.methods.setStartVariables(_start_date, _original_entry, _previous_medical_unit)
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
function Record_setEndVariables(_addr, _end_date, _end_reason, _end_health_status,
    _main_found_disease, _relating_found_disease, _next_medical_unit,
    _to_next_medical_unit_date, _is_catastrophe, _is_side_effect,
    _dead_time, _dead_reason, _dead_detailed_reason) {
    
    let result
    let deployedContract
    let deployedContractMethod

    result = web3.eth.personal.unlockAccount(config.account, config.password, 1500).then((result) => {
        console.log('Account unlocked');
    }).then(() => {
        deployedContract = new web3.eth.Contract(Record.abi, _addr)
        deployedContractMethod = deployedContract.methods.setEndVariables(
            _end_date, _end_reason, _end_health_status,
            _main_found_disease, _relating_found_disease, _next_medical_unit,
            _to_next_medical_unit_date, _is_catastrophe, _is_side_effect,
            _dead_time, _dead_reason, _dead_detailed_reason
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
function Record_confirm(_addr, _priv_key) {
    let result
    let deployedContract
    let deployedContractMethod

    result = web3.eth.personal.unlockAccount(config.account, config.password, 1500).then((result) => {
        console.log('Account unlocked');
    }).then(() => {
        deployedContract = new web3.eth.Contract(Record.abi, _addr)
        deployedContractMethod = deployedContract.methods.confirm(_priv_key)
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
function Stage_setVariables(_addr, _doctor_id) {
    let result
    let deployedContract
    let deployedContractMethod

    result = web3.eth.personal.unlockAccount(config.account, config.password, 1500).then((result) => {
        console.log('Account unlocked');
    }).then(() => {
        deployedContract = new web3.eth.Contract(Stage.abi, _addr)
        deployedContractMethod = deployedContract.methods.setVariables(_doctor_id)
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
function Stage_confirm(_addr) {
    let result
    let deployedContract
    let deployedContractMethod

    result = web3.eth.personal.unlockAccount(config.account, config.password, 1500).then((result) => {
        console.log('Account unlocked');
    }).then(() => {
        deployedContract = new web3.eth.Contract(Stage.abi, _addr)
        deployedContractMethod = deployedContract.methods.confirm()
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
function TreatmentStage_constructor(_addr, _department) {
    let result
    let contract
    let deployContract
    let address
    result = web3.eth.personal.unlockAccount(config.account, config.password, 1500).then((result) => {
        console.log('Account unlocked');
    }).then(() => {
        contract = new web3.eth.Contract(TreatmentStage.abi)
        deployContract = contract.deploy({data: TreatmentStage.bytecode, arguments: [_addr, _department]})
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
function TreatmentStage_addTreatmentMethod(_addr, _addr0) {
    let result
    let deployedContract
    let deployedContractMethod

    result = web3.eth.personal.unlockAccount(config.account, config.password, 1500).then((result) => {
        console.log('Account unlocked');
    }).then(() => {
        deployedContract = new web3.eth.Contract(TreatmentStage.abi, _addr)
        deployedContractMethod = deployedContract.methods.addTreatmentMethod(_addr0)
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
function DiagnoseStage_constructor(_addr, _department) {
    let result
    let contract
    let deployContract
    let address
    result = web3.eth.personal.unlockAccount(config.account, config.password, 1500).then((result) => {
        console.log('Account unlocked');
    }).then(() => {
        contract = new web3.eth.Contract(DiagnoseStage.abi)
        deployContract = contract.deploy({data: DiagnoseStage.bytecode, arguments: [_addr, _department]})
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
function DiagnoseStage_addManifestation(_addr, _manifestation) {
    let result
    let deployedContract
    let deployedContractMethod

    result = web3.eth.personal.unlockAccount(config.account, config.password, 1500).then((result) => {
        console.log('Account unlocked');
    }).then(() => {
        deployedContract = new web3.eth.Contract(DiagnoseStage.abi, _addr)
        deployedContractMethod = deployedContract.methods.addManifestation(_manifestation)
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
function DiagnoseStage_setDiagnose(_addr, _diagnose) {
    let result
    let deployedContract
    let deployedContractMethod

    result = web3.eth.personal.unlockAccount(config.account, config.password, 1500).then((result) => {
        console.log('Account unlocked');
    }).then(() => {
        deployedContract = new web3.eth.Contract(DiagnoseStage.abi, _addr)
        deployedContractMethod = deployedContract.methods.setDiagnose(_diagnose)
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
function TestStage_constructor(_addr, _department) {
    let result
    let contract
    let deployContract
    let address
    result = web3.eth.personal.unlockAccount(config.account, config.password, 1500).then((result) => {
        console.log('Account unlocked');
    }).then(() => {
        contract = new web3.eth.Contract(TestStage.abi)
        deployContract = contract.deploy({data: TestStage.bytecode, arguments: [_addr, _department]})
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
function TestStage_pushFile(_addr, _addr0) {
    let result
    let deployedContract
    let deployedContractMethod

    result = web3.eth.personal.unlockAccount(config.account, config.password, 1500).then((result) => {
        console.log('Account unlocked');
    }).then(() => {
        deployedContract = new web3.eth.Contract(TestStage.abi, _addr)
        deployedContractMethod = deployedContract.methods.pushFile(_addr0)
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
function File_constructor(_addr, _test_type, _file) {
    let result
    let contract
    let deployContract
    let address
    result = web3.eth.personal.unlockAccount(config.account, config.password, 1500).then((result) => {
        console.log('Account unlocked');
    }).then(() => {
        contract = new web3.eth.Contract(File.abi)
        deployContract = contract.deploy({data: File.bytecode, arguments: [_addr, _test_type, _file]})
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
function TreatmentMethod_constructor(_addr, _name, _start_time, _stop_time, _description) {
    let result
    let contract
    let deployContract
    let address
    result = web3.eth.personal.unlockAccount(config.account, config.password, 1500).then((result) => {
        console.log('Account unlocked');
    }).then(() => {
        contract = new web3.eth.Contract(TreatmentMethod.abi)
        deployContract = contract.deploy({data: TreatmentMethod.bytecode, arguments: [_addr, _name, _start_time, _stop_time, _description]})
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

//Profile_constructor("my priv key").then(console.log) 
/*Profile_setVariables("0x013E00E67eD9447A25Ef4CA7C29f8096e591b863", "my priv key", "WHat Is fUll name", true, new Date().getTime()/1000, "_occupation", "_region", "_education_level", false,
    "_home_address", true, new Date().getTime()/1000, "_health_assuarance_id", "_contact").then(console.log)*/
//getProfile("0x013E00E67eD9447A25Ef4CA7C29f8096e591b863").then(console.log)
//Record_constructor("0x67ECd2E10E4da7dfa10FD0508C05c4D6f80e9A11").then(console.log)
/*Record_setEndVariables("0x99c280BaD27f340f871C0d6152FD2EC76D98e738", 
new Date().getTime()/1000, "Dead", "Disapear",
"AIDS", "GW", "go home",
new Date().getTime()/1000, true, false,
new Date().getTime()/1000, "null", "null")*/

//TreatmentStage_constructor("0x99c280BaD27f340f871C0d6152FD2EC76D98e738", 2).then(console.log)
//TreatmentMethod_constructor("0xa59109dcB07f8452e13B2940a99828ACC6061a54", "name of treatment", new Date().getTime()/1000, new Date().getTime()/1000, "NO DESC").then(console.log)
//TreatmentStage_addTreatmentMethod("0xa59109dcB07f8452e13B2940a99828ACC6061a54", "0x1069C793f85825D49f76353487668afDbefDe8b3").then(console.log)
//Stage_setVariables("0xa59109dcB07f8452e13B2940a99828ACC6061a54", "IDIDIDIDIDID")
//Stage_confirm("0xa59109dcB07f8452e13B2940a99828ACC6061a54")
//TestStage_constructor("0x99c280BaD27f340f871C0d6152FD2EC76D98e738", 5).then(console.log)
//File_constructor("0x78Bc68422d9e90b2F05B6b01D5C21bD98538F365", "Blood test", "filenamehashed").then(console.log)
//TestStage_pushFile("0x78Bc68422d9e90b2F05B6b01D5C21bD98538F365", "0x31C158c760ca90474D801C2820b3C5d501d1AFec")
//Stage_confirm("0x78Bc68422d9e90b2F05B6b01D5C21bD98538F365")
//DiagnoseStage_constructor("0x99c280BaD27f340f871C0d6152FD2EC76D98e738", 14).then(console.log)
//DiagnoseStage_addManifestation("0xcB451eA807EcaEC052D0a33237f3D8CE70eCE970", "this is a manifestation 2")
//DiagnoseStage_setDiagnose("0xcB451eA807EcaEC052D0a33237f3D8CE70eCE970", "DIAG")
//Stage_confirm("0xcB451eA807EcaEC052D0a33237f3D8CE70eCE970")
//Record_confirm("0x99c280BaD27f340f871C0d6152FD2EC76D98e738", "my priv key")


//exports.createProfile = createProfile

exports.web3 = web3
exports.File = File
exports.DiagnoseStage = DiagnoseStage
exports.Profile = Profile
exports.Stage = Stage
exports.Record = Record
exports.TestStage = TestStage
exports.TreatmentMethod = TreatmentMethod
exports.TreatmentStage = TreatmentStage
exports.Profile_constructor = Profile_constructor
exports.Profile_setVariables = Profile_setVariables
exports.Record_constructor = Record_constructor
exports.Record_setStartVariables = Record_setStartVariables
exports.Record_setEndVariables = Record_setEndVariables
exports.Record_confirm = Record_confirm
exports.Stage_setVariables = Stage_setVariables
exports.Stage_confirm = Stage_confirm
exports.TreatmentStage_constructor = TreatmentStage_constructor
exports.TreatmentStage_addTreatmentMethod = TreatmentStage_addTreatmentMethod
exports.DiagnoseStage_constructor = DiagnoseStage_constructor
exports.DiagnoseStage_addManifestation = DiagnoseStage_addManifestation
exports.DiagnoseStage_setDiagnose = DiagnoseStage_setDiagnose
exports.TestStage_constructor = TestStage_constructor
exports.TestStage_pushFile = TestStage_pushFile
exports.File_constructor = File_constructor
exports.TreatmentMethod_constructor = TreatmentMethod_constructor