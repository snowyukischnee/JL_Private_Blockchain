let Web3 = require('web3')
let web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')

let File = require('../eth_contracts/build/contracts/File.json')
let DiagnoseStage = require('../eth_contracts/build/contracts/DiagnoseStage.json')
let Profile = require('../eth_contracts/build/contracts/Profile.json')
let Record = require('../eth_contracts/build/contracts/Record.json')
let TestStage = require('../eth_contracts/build/contracts/TestStage.json')
let TreatmentMethod = require('../eth_contracts/build/contracts/TreatmentMethod.json')
let TreatmentStage = require('../eth_contracts/build/contracts/TreatmentStage.json')

async function deploy_contracts() {
    const account = '0x0714DbaCbB1D870312E7D5e69ABb8F656B333Fb9'
    const password = '12345678'
    const private_key = 'this_is_private_key'

    console.log(account + ' is a valid address: ' + web3.utils.isAddress(account))
    try {
        await web3.eth.personal.unlockAccount(account, password, 1500) 
        console.log('Account ' + account + ' has been unlocked')
        let maxGasPrice = await web3.eth.getGasPrice()
        console.log('maxGasPrice = ' + maxGasPrice)
        //-----------------------------------------------------------------------------------------------------------------------------
        let transaction_hash
        let estimatedGas

        let contractProfile = new web3.eth.Contract(Profile.abi) 
        let deployProfile = contractA.deploy({data: Profile.bytecode, arguments: [private_key]})
        estimatedGas = await deployProfile.estimateGas()
        console.log('estimated Gas = ' + estimatedGas)
        let deployedContractProfile = await contractProfile.deploy({data: Profile.bytecode, arguments: [private_key]}).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log('Profile = ' + deployedContractProfile.options.address)

        let contractRecord = new web3.eth.Contract(Record.abi)
        let deployRecord = contractRecord.deploy({data: Record.bytecode, arguments: [deployedContractProfile.options.address]})
        estimatedGas = await deployRecord.estimateGas()
        console.log('estimated Gas = ' + estimatedGas)
        let deployedContractRecord = await contractRecord.deploy({data: Record.bytecode, arguments: [deployedContractProfile.options.address]}).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log('Record = ' + deployedContractRecord.options.address)
        
        let contractC = await new web3.eth.Contract(TestStage.abi)
        estimatedGas = await contractC.deploy({data: TestStage.bytecode, arguments: [deployedContractB.options.address, "Blood"]}).estimateGas()
        console.log('estimated Gas = ' + estimatedGas)
        let deployedContractC = await contractC.deploy({data: TestStage.bytecode, arguments: [deployedContractB.options.address, "Blood"]}).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log('deployedContractAddress = ' + deployedContractC.options.address)
        /*estimatedGas = await deployedContractB.methods.bind(deployedContractA.options.address).estimateGas()
        transaction_hash = await deployedContractB.methods.bind(deployedContractA.options.address).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log('transacionHash: ', transaction_hash)*/
    } catch (e) {
        console.error(e.message)
    } finally {
        try {
            await web3.eth.personal.lockAccount(account)     
            console.log('Account ' + account + ' has been locked')      
        } catch (e) {
            console.error(e.message)
        }
    }
}

console.log(Profile.contractName + ' ABI:\n', JSON.stringify(Profile.abi))
console.log(Record.contractName + ' ABI:\n', JSON.stringify(Record.abi))
//console.log(DiagnoseStage.contractName + ' ABI:\n', JSON.stringify(DiagnoseStage.abi))
//console.log(TestStage.contractName + ' ABI:\n', JSON.stringify(TestStage.abi))
//console.log(TreatmentStage.contractName + ' ABI:\n', JSON.stringify(TreatmentStage.abi))
//console.log(TreatmentMethod.contractName + ' ABI:\n', JSON.stringify(TreatmentMethod.abi))
//console.log(File.contractName + ' ABI:\n', JSON.stringify(File.abi))
deploy_contracts()
