let Web3 = require('web3')
let web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')

let PatientRegister = require("../eth_client/build/contracts/PatientRegister.json")
let PatientInfo = require("../eth_client/build/contracts/PatientInfo.json")

const private_key = "this_is_private_key"

async function deploy_contracts() {
    let account = '0x94B83e4724B939782405F6fbb1E2eF57DAC6DAB8'
    console.log(account)

    await web3.eth.personal.unlockAccount(account, "12345678", 1500)
    let maxGasPrice = await web3.eth.getGasPrice()
    console.log(maxGasPrice)
    
    let transaction_hash
    let estimatedGas

    let contractA = new web3.eth.Contract(PatientRegister.abi)
    let deployA = contractA.deploy({data: PatientRegister.bytecode, arguments: [private_key]})
    estimatedGas = await deployA.estimateGas()
    console.log("estimated Gas = " + estimatedGas)
    /*let deployedContractA = await contractA.deploy({data: PatientRegister.bytecode, arguments: [private_key]}).send({
        from: account,
        gas: estimatedGas,
        gasPrice: gasPrice
    })
    console.log(deployedContractA.options.address)

    let contractB = await new web3.eth.Contract(PatientInfo.abi)
    estimatedGas = await contractB.deploy({data: PatientInfo.bytecode, arguments: []}).estimateGas()
    console.log(estimated Gas = " + estimatedGas)
    let deployedContractB = await contractB.deploy({data: PatientInfo.bytecode, arguments: []}).send({
        from: account,
        gas: estimatedGas,
        gasPrice: gasPrice
    })
    console.log(deployedContractB.options.address)

    estimatedGas = await deployedContractB.methods.bind(deployedContractA.options.address).estimateGas()
    console.log(estimated Gas = " + estimatedGas)
    transaction_hash = await deployedContractB.methods.bind(deployedContractA.options.address).send({
        from: account,
        gas: estimatedGas,
        gasPrice: gasPrice
    })
    console.log(transaction_hash)*/

    await web3.eth.personal.lockAccount(account)
}

deploy_contracts()