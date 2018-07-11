var PatientRegister = artifacts.require("PatientRegister");
var PatientInfo = artifacts.require("PatientInfo");
var PersonalInfoLib = artifacts.require("PersonalInfoLib");

module.exports = function(deployer) {
    // deployment steps
    deployer.deploy(PersonalInfoLib);
    deployer.link(PersonalInfoLib, [PatientRegister, PatientInfo]);
    deployer.deploy(PatientRegister, 'this_is_private_key');
    deployer.deploy(PatientInfo);
};