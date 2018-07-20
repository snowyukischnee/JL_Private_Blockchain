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

function createProfile(private_key) {
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
        console.log('Profile = ' + deployedContractProfile.options.address)
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
        return address
    })
    return result
}

//createProfile("this_is_key").then((x) => console.log("AAAAAAAAA = " + x))

exports.createProfile = createProfile