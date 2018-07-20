pragma solidity ^0.4.23;

library UtilLib {
    enum _classtype_enum {
        ProfileClassName,
        RecordClassName,
        StageClassName,
        FileClassName,
        TreatmentMethodClassName
    }

    enum _stagetype_enum {
        TestStageType,
        DiagnoseStageType,
        TreatmentStageType
    }
}

contract File {
    UtilLib._classtype_enum public constant classtype = UtilLib._classtype_enum.FileClassName;

    address public creator;
    uint public time_created;
    string public test_type;
    bytes32 public hashed_manifest;
    TestStage public test_stage;

    event ContractCreated(address indexed creator);

    constructor(address _addr, string _test_type, bytes32 _hashed_manifest) public {
        require(TestStage(_addr).classtype() == UtilLib._classtype_enum.StageClassName);
        require(TestStage(_addr).stagetype() == UtilLib._stagetype_enum.TestStageType);
        creator = msg.sender;
        time_created = now;
        test_type = _test_type;
        hashed_manifest = _hashed_manifest;
        test_stage = TestStage(_addr);
        test_stage.pushFile(address(this));
        emit ContractCreated(msg.sender);
    }
}

contract Stage {
    UtilLib._classtype_enum public constant classtype = UtilLib._classtype_enum.StageClassName;
    UtilLib._stagetype_enum public stagetype;
}

contract TestStage is Stage {
    UtilLib._stagetype_enum public stagetype = UtilLib._stagetype_enum.TestStageType;

    address public creator;
    uint public time_created;
    string public department;
    Record public record;
    address[] public files;
    bool private data_changable = true;

    event ContractCreated(address indexed creator);
    event FilePushed(address indexed file);
    event Confirm(address indexed _addr);

    modifier iscreator() {
        require(creator == msg.sender);
        _;
    }

    constructor(address _addr, string _department) public {
        require(Record(_addr).classtype() == UtilLib._classtype_enum.RecordClassName);
        creator = msg.sender;
        time_created = now;
        department = _department;
        record = Record(_addr);
        emit ContractCreated(msg.sender);
    }

    function pushFile(address _addr) public iscreator {
        require(data_changable == true && File(_addr).classtype() == UtilLib._classtype_enum.FileClassName);
        files.push(_addr);
        emit FilePushed(_addr);
    }

    function confirm() public iscreator {
        data_changable = false;
        emit Confirm(msg.sender);
    }
}

contract DiagnoseStage is Stage {
    UtilLib._stagetype_enum public stagetype = UtilLib._stagetype_enum.DiagnoseStageType;

    address public creator;
    uint public time_created;
    string public department;
    Record public record;
    bool private data_changable = true;

    string[] public manifestation;
    string public diagnose;

    event ContractCreated(address indexed creator);
    event ManifestationAdded(string _manifestation);
    event DiagnoseSet(string _diagnose);
    event Confirm(address indexed _addr);

    modifier iscreator() {
        require(creator == msg.sender);
        _;
    }

    constructor(address _addr, string _department) public {
        require(Record(_addr).classtype() == UtilLib._classtype_enum.RecordClassName);
        creator = msg.sender;
        time_created = now;
        department = _department;
        record = Record(_addr);
        emit ContractCreated(msg.sender);
    }

    function addManifestation(string _manifestation) public iscreator {
        manifestation.push(_manifestation);
        emit ManifestationAdded(_manifestation);
    }

    function setDiagnose(string _diagnose) public iscreator {
        diagnose = _diagnose;
        emit DiagnoseSet(_diagnose);
    }

    function confirm() public iscreator {
        data_changable = false;
        emit Confirm(msg.sender);
    }
}

contract TreatmentMethod {
    UtilLib._classtype_enum public constant classtype = UtilLib._classtype_enum.TreatmentMethodClassName;

    address public creator;
    string public name;
    uint public apply_time;
    string public description;
    TreatmentStage treatment_stage;

    event ContractCreated(address indexed creator);

    constructor(address _addr, string _name, uint _apply_time, string _description) public {
        require(TreatmentStage(_addr).classtype() == UtilLib._classtype_enum.StageClassName);
        require(TreatmentStage(_addr).stagetype() == UtilLib._stagetype_enum.TreatmentStageType);
        _name = name;
        _apply_time = apply_time;
        _description = description;
        treatment_stage = TreatmentStage(_addr);
        emit ContractCreated(msg.sender);
    }
}

contract TreatmentStage is Stage {
    UtilLib._stagetype_enum public stagetype = UtilLib._stagetype_enum.TreatmentStageType;
    
    address public creator;
    uint public time_created;
    string public department;
    Record public record;
    bool private data_changable = true;

    address[] public treatment_methods;

    event ContractCreated(address indexed creator);
    event TreatmentMethodAdded(address indexed addr);
    event Confirm(address indexed _addr);

    modifier iscreator() {
        require(creator == msg.sender);
        _;
    }

    constructor(address _addr, string _department) public {
        require(Record(_addr).classtype() == UtilLib._classtype_enum.RecordClassName);
        creator = msg.sender;
        time_created = now;
        department = _department;
        record = Record(_addr);
        emit ContractCreated(msg.sender);
    }

    function addTreatmentMethod(address _addr) public iscreator {
        require(TreatmentMethod(_addr).classtype() == UtilLib._classtype_enum.TreatmentMethodClassName);
        treatment_methods.push(_addr);
        emit TreatmentMethodAdded(_addr);
    }

    function confirm() public iscreator {
        data_changable = false;
        emit Confirm(msg.sender);
    }
}

contract Record {
    UtilLib._classtype_enum public constant classtype = UtilLib._classtype_enum.RecordClassName;

    address public creator;
    uint public time_created;
    Profile public profile;
    bool private data_changable = true;

    address[] public stages;

    event ContractCreated(address indexed creator);
    event StageAdded(address indexed stage);
    event Confirm(address indexed _addr);

    modifier authenicated(string _priv_key) {
        require(keccak256(_priv_key) == profile.hashed_key());
        _;
    }

    modifier iscreator() {
        require(creator == msg.sender);
        _;
    }

    constructor(address _addr) public {
        require(Profile(_addr).classtype() == UtilLib._classtype_enum.ProfileClassName);
        creator = msg.sender;
        time_created = now;
        profile = Profile(_addr);
        emit ContractCreated(msg.sender);
    }

    function addStage(string _priv_key, address _addr) public authenicated(_priv_key) {
        require(Stage(_addr).classtype() == UtilLib._classtype_enum.StageClassName);
        stages.push(_addr);
        emit StageAdded(_addr);
    }

    function confirm(string _priv_key) public iscreator authenicated(_priv_key) {
        data_changable = false;
        emit Confirm(msg.sender);
    }

}

contract Profile {
    UtilLib._classtype_enum public constant classtype = UtilLib._classtype_enum.ProfileClassName;

    bytes32 public hashed_key;
    uint public time_created;
    address[] public records;

    event ContractCreated(address indexed creator);
    event RecordAdded(address indexed record);

    modifier authenicated(string _priv_key) {
        require(keccak256(_priv_key) == hashed_key);
        _;
    }

    constructor(string _priv_key) public {
        hashed_key = keccak256(_priv_key);
        time_created = now;
        emit ContractCreated(msg.sender);
    }

    function addRecord(string _priv_key, address _addr) public authenicated(_priv_key) {
        require(Record(_addr).classtype() == UtilLib._classtype_enum.RecordClassName);
        records.push(_addr);
        emit RecordAdded(_addr);
    }
}