pragma solidity ^0.4.23;

import "./Libraries.sol";
import "./BaseContracts.sol";
import "./Record.sol";
import "./TreatmentMethod.sol";
import "./File.sol";

contract Stage is BaseContract, Confirmable {
    UtilLib.class public classtype = UtilLib.class.Stage;
    UtilLib.stage public stagetype;
    address public record;
    UtilLib.department public department;
    string public doctor_id;

    event Confirm(address indexed _addr);
    event VariablesSet(string _status);

    constructor(address _addr, uint _department) BaseContract() public { 
        require(Record(_addr).classtype() == UtilLib.class.Record);
        record = _addr;
        department = UtilLib.department(_department);
        emit ContractCreated(msg.sender);
    }

    function setVariables(string _doctor_id) public changable iscreator {
        doctor_id = _doctor_id;
        emit VariablesSet("Doctor id set.");
    }

    function confirm() public changable iscreator {
        data_changable = false;
        Record(record).addStage(address(this));
        emit Confirm(msg.sender);
    }
}

contract TreatmentStage is Stage {
    UtilLib.stage public stagetype = UtilLib.stage.TreatmentStage;

    address[] public treatment_methods;

    event TreatmentMethodAdded(address indexed addr);

    constructor(address _addr, uint _department) Stage(_addr, _department) public {}

    function addTreatmentMethod(address _addr) public changable iscreator {
        require(TreatmentMethod(_addr).classtype() == UtilLib.class.TreatmentMethod);
        treatment_methods.push(_addr);
        emit TreatmentMethodAdded(_addr);
    }
}

contract DiagnoseStage is Stage {
    UtilLib.stage public stagetype = UtilLib.stage.DiagnoseStage;

    string[] public manifestation;
    string public diagnose;

    event ManifestationAdded(string _manifestation);
    event DiagnoseSet(string _diagnose);

    constructor(address _addr, uint _department) Stage(_addr, _department) public {}

    function addManifestation(string _manifestation) public changable iscreator {
        manifestation.push(_manifestation);
        emit ManifestationAdded(_manifestation);
    }

    function setDiagnose(string _diagnose) public changable iscreator {
        diagnose = _diagnose;
        emit DiagnoseSet(_diagnose);
    }
}

contract TestStage is Stage {
    UtilLib.stage public stagetype = UtilLib.stage.TestStage;

    address[] public files;

    event FileAdded(address indexed file);

    constructor(address _addr, uint _department) Stage(_addr, _department) public {}

    function pushFile(address _addr) public changable iscreator {
        require(File(_addr).classtype() == UtilLib.class.File);
        files.push(_addr);
        emit FileAdded(_addr);
    }
}