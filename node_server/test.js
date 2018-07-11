let Web3 = require('web3')
let web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')

let PatientRegister = require('../eth_contracts/build/contracts/PatientRegister.json')
let PatientInfo = require('../eth_contracts/build/contracts/PatientInfo.json')

const private_key = 'this_is_private_key'

async function deploy_contracts() {
    let account = '0x65389b06e7668691A110eF74E1a815A8D6DF1d33'
    console.log(account + ' is a valid address: ' + web3.utils.isAddress(account))
    try {
        await web3.eth.personal.unlockAccount(account, '12345678', 1500) 
        console.log('Account ' + account + ' has been unlocked')
        let maxGasPrice = await web3.eth.getGasPrice()
        console.log('maxGasPrice = ' + maxGasPrice)
        let transaction_hash
        let estimatedGas
        let contractA = new web3.eth.Contract(PatientRegister.abi)
        let deployA = contractA.deploy({data: PatientRegister.bytecode, arguments: [private_key]})
        estimatedGas = await deployA.estimateGas()
        console.log('estimated Gas = ' + estimatedGas)
        let deployedContractA = await contractA.deploy({data: PatientRegister.bytecode, arguments: [private_key]}).send({
            from: account,
            gas: estimatedGas,
            gasPrice: 1
        })
        console.log('deployedContractAddress = ' + deployedContractA.options.address)
        let contractB = await new web3.eth.Contract(PatientInfo.abi)
        estimatedGas = await contractB.deploy({data: PatientInfo.bytecode, arguments: []}).estimateGas()
        console.log('estimated Gas = ' + estimatedGas)
        let deployedContractB = await contractB.deploy({data: PatientInfo.bytecode, arguments: []}).send({
            from: account,
            gas: estimatedGas,
            gasPrice: 1
        })
        console.log('deployedContractAddress = ' + deployedContractB.options.address)
        estimatedGas = await deployedContractB.methods.bind(deployedContractA.options.address).estimateGas()
        transaction_hash = await deployedContractB.methods.bind(deployedContractA.options.address).send({
            from: account,
            gas: estimatedGas,
            gasPrice: 1
        })
        console.log('transacionHash: ', transaction_hash)
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

console.log('PatientRegister ABI:', JSON.stringify(PatientRegister.abi))
console.log('PatientInfo ABI:', JSON.stringify(PatientInfo.abi))
deploy_contracts()
