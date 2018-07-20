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
        /*let contractRecord1 = new web3.eth.Contract(Record.abi, "0x9f67e20A0A00B49EeEdc54aa330B965C2A9D2782")
        let x = await contractRecord1.methods.stages(0).call()
        console.log(x)
        x = await contractRecord1.methods.stages(1).call()
        console.log(x)
        x = await contractRecord1.methods.stages(2).call()
        console.log(x)
        throw "exc"*/
        console.log("-----------------------------------create profile------------------------------------------------------------------------------------------")
        let contractProfile = new web3.eth.Contract(Profile.abi) 
        let deployProfile = contractProfile.deploy({data: Profile.bytecode, arguments: [private_key]})
        estimatedGas = await deployProfile.estimateGas()
        let deployedContractProfile = await contractProfile.deploy({data: Profile.bytecode, arguments: [private_key]}).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log('Profile = ' + deployedContractProfile.options.address)
        console.log("------------------------------add profile varidable-----------------------------------------------------------------------------------------------")
        estimatedGas = await deployedContractProfile.methods.setVariables("nguyen van a",true,1000,"Doctor","Kinh","Master",false,"Ha noi, Viet Nam",true,2500,"HI_123123456","0123456789" ) .estimateGas()
        transaction_hash = await deployedContractProfile.methods.setVariables("nguyen van a",true,1000,"Doctor","Kinh","Master",false,"Ha noi, Viet Nam",true,2500,"HI_123123456","0123456789" ).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log("--------------------------------create record---------------------------------------------------------------------------------------------")
        let contractRecord = new web3.eth.Contract(Record.abi)
        let deployRecord = contractRecord.deploy({data: Record.bytecode, arguments: [deployedContractProfile.options.address]})
        estimatedGas = await deployRecord.estimateGas()
        let deployedContractRecord = await contractRecord.deploy({data: Record.bytecode, arguments: [deployedContractProfile.options.address]}).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log('Record = ' + deployedContractRecord.options.address)
        console.log("------------------------------add record start varidable-----------------------------------------------------------------------------------------------")
        estimatedGas = await deployedContractRecord.methods.setStartVariables(1000,"Khoa kham benh","Benh vien bach mai" ).estimateGas()
        transaction_hash = await deployedContractRecord.methods.setStartVariables(1000,"Khoa kham benh","Benh vien bach mai" ).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log("------------------------------add record end varidable-----------------------------------------------------------------------------------------------")
        estimatedGas = await deployedContractRecord.methods.setEndVariables(2000,"Ra vien","Khoi","Cum","Ho","",0,false,false,0,"","").estimateGas()
        transaction_hash = await deployedContractRecord.methods.setEndVariables(2000,"Ra vien","Khoi","Cum","Ho","",0,false,false,0,"","").send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log("-----------------------------create diagnose stage------------------------------------------------------------------------------------------------")
        let contractDiagnoseStage = new web3.eth.Contract(DiagnoseStage.abi)
        let deployDiagnoseStage = contractDiagnoseStage.deploy({data: DiagnoseStage.bytecode, arguments: [deployedContractRecord.options.address, 2]})
        estimatedGas = await deployDiagnoseStage.estimateGas()
        let deployedDiagnoseStage = await contractDiagnoseStage.deploy({data: DiagnoseStage.bytecode, arguments: [deployedContractRecord.options.address, 2]}).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log('DiagnoseStage = ' + deployedDiagnoseStage.options.address)
        console.log("------------------------------add diagnose stage doctor-----------------------------------------------------------------------------------------------")
        estimatedGas = await deployedDiagnoseStage.methods.setVariables("doctor3").estimateGas()
        transaction_hash = await deployedDiagnoseStage.methods.setVariables("doctor3").send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log("-----------------------------addManifestation--------------------------------------------------------------------------------------------------------------------")
        estimatedGas = await deployedDiagnoseStage.methods.addManifestation("this is addManifestation").estimateGas()
        transaction_hash = await deployedDiagnoseStage.methods.addManifestation("this is addManifestation").send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log("-----------------------------setDiagnose--------------------------------------------------------------------------------------------------------------------")
        estimatedGas = await deployedDiagnoseStage.methods.setDiagnose("this is setDiagnose").estimateGas()
        transaction_hash = await deployedDiagnoseStage.methods.setDiagnose("this is setDiagnose").send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log("-----------------------------confirm diagnose stage------------------------------------------------------------------------------------------------")
        estimatedGas = await deployedDiagnoseStage.methods.confirm().estimateGas()
        transaction_hash = await deployedDiagnoseStage.methods.confirm().send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log("-----------------------------create test stage------------------------------------------------------------------------------------------------")
        let contractTestStage = new web3.eth.Contract(TestStage.abi)
        let deployTestStage = contractTestStage.deploy({data: TestStage.bytecode, arguments: [deployedContractRecord.options.address, 4]})
        estimatedGas = await deployTestStage.estimateGas()
        let deployedTestStage = await contractTestStage.deploy({data: TestStage.bytecode, arguments: [deployedContractRecord.options.address, 4]}).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log('TestStage = ' + deployedTestStage.options.address)
        console.log("------------------------------add test stage doctor-----------------------------------------------------------------------------------------------")
        estimatedGas = await deployedTestStage.methods.setVariables("doctor2").estimateGas()
        transaction_hash = await deployedTestStage.methods.setVariables("doctor2").send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log("-------------------------------create file-------------------------------------------------------------------------------------------------------------")
        let contractFile = new web3.eth.Contract(File.abi)
        let deployFile = contractFile.deploy({data: File.bytecode, arguments: [deployedTestStage.options.address, "test type 1", "filename"]})
        estimatedGas = await deployFile.estimateGas()
        let deployedFile = await contractFile.deploy({data: File.bytecode, arguments: [deployedTestStage.options.address, "test type 1", "filename"]}).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log('File = ' + deployedFile.options.address)
        console.log("-----------------------------add file----------------------------------------------------------------------------------------------------------")
        estimatedGas = await deployedTestStage.methods.pushFile(deployedFile.options.address).estimateGas()
        transaction_hash = await deployedTestStage.methods.pushFile(deployedFile.options.address).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log("-------------------------------create file1-------------------------------------------------------------------------------------------------------------")
        contractFile = new web3.eth.Contract(File.abi)
        deployFile = contractFile.deploy({data: File.bytecode, arguments: [deployedTestStage.options.address, "test type 1", "filename"]})
        estimatedGas = await deployFile.estimateGas()
        deployedFile = await contractFile.deploy({data: File.bytecode, arguments: [deployedTestStage.options.address, "test type 1", "filename"]}).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log('File1 = ' + deployedFile.options.address)
        console.log("-----------------------------add file1----------------------------------------------------------------------------------------------------------")
        estimatedGas = await deployedTestStage.methods.pushFile(deployedFile.options.address).estimateGas()
        transaction_hash = await deployedTestStage.methods.pushFile(deployedFile.options.address).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log("-----------------------------confirm test stage------------------------------------------------------------------------------------------------")
        estimatedGas = await deployedTestStage.methods.confirm().estimateGas()
        transaction_hash = await deployedTestStage.methods.confirm().send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log("------------------------------create treatment stage-----------------------------------------------------------------------------------------------")
        let contractTreatmentStage = new web3.eth.Contract(TreatmentStage.abi)
        let deployTreatmentStage = contractTreatmentStage.deploy({data: TreatmentStage.bytecode, arguments: [deployedContractRecord.options.address, 6]})
        estimatedGas = await deployTreatmentStage.estimateGas()
        let deployedTreatmentStage = await contractTreatmentStage.deploy({data: TreatmentStage.bytecode, arguments: [deployedContractRecord.options.address, 6]}).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log('TreatmentStage = ' + deployedTreatmentStage.options.address)
        console.log("------------------------------add treatment stage doctor-----------------------------------------------------------------------------------------------")
        estimatedGas = await deployedTreatmentStage.methods.setVariables("doctor1").estimateGas()
        transaction_hash = await deployedTreatmentStage.methods.setVariables("doctor1").send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log("--------------------------------create treatment method---------------------------------------------------------------------------------------------------------")
        let contractTreatmentMethod = new web3.eth.Contract(TreatmentMethod.abi)
        let deployTreatmentMethod = contractTreatmentMethod.deploy({data: TreatmentMethod.bytecode, arguments: [deployedTreatmentStage.options.address, "this is name", 1, 1000, "desc"]})
        estimatedGas = await deployTreatmentMethod.estimateGas()
        let deployedTreatmentMethod = await contractTreatmentMethod.deploy({data: TreatmentMethod.bytecode, arguments: [deployedTreatmentStage.options.address, "this is name", 1, 1000, "desc"]}).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log('TreatmentMethod = ' + deployedTreatmentMethod.options.address)
        console.log("-----------------------------add treatment method----------------------------------------------------------------------------------------------------------")
        estimatedGas = await deployedTreatmentStage.methods.addTreatmentMethod(deployedTreatmentMethod.options.address).estimateGas()
        transaction_hash = await deployedTreatmentStage.methods.addTreatmentMethod(deployedTreatmentMethod.options.address).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log("--------------------------------create treatment method---------------------------------------------------------------------------------------------------------")
        contractTreatmentMethod = new web3.eth.Contract(TreatmentMethod.abi)
        deployTreatmentMethod = contractTreatmentMethod.deploy({data: TreatmentMethod.bytecode, arguments: [deployedTreatmentStage.options.address, "this is name", 1, 1000, "desc"]})
        estimatedGas = await deployTreatmentMethod.estimateGas()
        deployedTreatmentMethod = await contractTreatmentMethod.deploy({data: TreatmentMethod.bytecode, arguments: [deployedTreatmentStage.options.address, "this is name", 1, 1000, "desc"]}).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log('TreatmentMethod1 = ' + deployedTreatmentMethod.options.address)        
        console.log("-----------------------------add treatment method----------------------------------------------------------------------------------------------------------")
        estimatedGas = await deployedTreatmentStage.methods.addTreatmentMethod(deployedTreatmentMethod.options.address).estimateGas()
        transaction_hash = await deployedTreatmentStage.methods.addTreatmentMethod(deployedTreatmentMethod.options.address).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        console.log("------------------------------confirm treatment stage-----------------------------------------------------------------------------------------------")
        estimatedGas = await deployedTreatmentStage.methods.confirm().estimateGas()
        transaction_hash = await deployedTreatmentStage.methods.confirm().send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })       
        console.log("-----------------------------------confirm record------------------------------------------------------------------------------------------")
        estimatedGas = await deployedContractRecord.methods.confirm(private_key).estimateGas()
        transaction_hash = await deployedContractRecord.methods.confirm(private_key).send({
            from: account,
            gas: estimatedGas,
            gasPrice: '0'
        })
        
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

/*console.log(Profile.contractName + ' ABI:\n', JSON.stringify(Profile.abi))
console.log(Record.contractName + ' ABI:\n', JSON.stringify(Record.abi))
console.log(DiagnoseStage.contractName + ' ABI:\n', JSON.stringify(DiagnoseStage.abi))
console.log(TestStage.contractName + ' ABI:\n', JSON.stringify(TestStage.abi))
console.log(TreatmentStage.contractName + ' ABI:\n', JSON.stringify(TreatmentStage.abi))
console.log(TreatmentMethod.contractName + ' ABI:\n', JSON.stringify(TreatmentMethod.abi))
console.log(File.contractName + ' ABI:\n', JSON.stringify(File.abi))*/
deploy_contracts()
