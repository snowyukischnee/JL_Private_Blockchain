pragma solidity ^0.4.23;

import "./PersonalInfoLib.sol";

contract PatientRegister {
    PersonalInfoLib._classname_enum public constant classtype  = PersonalInfoLib._classname_enum.PatientRegisterClassName;
    
    bytes32 public hashed_key;
    uint public time_created;
    address[] public changed_history;

    event ContractCreated(address indexed caller);
    event ContractPushed(address indexed caller, address indexed item);

    modifier authenicated(string _priv_key) {
        require(keccak256(_priv_key) == hashed_key);
        _;
    }

    constructor(string _priv_key) public {
        hashed_key = keccak256(_priv_key);
        time_created = now;
        emit ContractCreated(msg.sender);
    }

    function PushChanged(string _priv_key, address _addr) public authenicated(_priv_key) {
        require(PatientInfo(_addr).classtype() == PersonalInfoLib._classname_enum.PatientInfoClassName);
        changed_history.push(_addr);
        emit ContractPushed(msg.sender, _addr);
    }
}

contract PatientInfo {
    PersonalInfoLib._classname_enum public constant classtype  = PersonalInfoLib._classname_enum.PatientInfoClassName;

    address public creator;
    PatientRegister public pr;
    bool private bindable = true;
    bool private data_changable = true;
    PersonalInfoLib._public_info_struct private public_info;
    PersonalInfoLib._private_info_struct private private_info;
    uint public time_created;
    string public comment;

    event ContractCreated(address indexed caller);
    event PatientInformationBinded(address indexed caller, address indexed binding_address);
    event PublicInfoChanged(address indexed caller);
    event PrivateInfoChanged(address indexed caller);
    event DataConfirmed(address indexed caller);

    modifier authenicated(string _priv_key) {
        require(keccak256(_priv_key) == pr.hashed_key());
        _;
    }

    modifier iscreator() {
        require(creator == msg.sender);
        _;
    }

    constructor() public {
        creator = msg.sender;
        time_created = now;
        emit ContractCreated(msg.sender);
    }

    function bind(address _addr) public iscreator {
        require(bindable == true && PatientRegister(_addr).classtype() == PersonalInfoLib._classname_enum.PatientRegisterClassName);
        pr = PatientRegister(_addr);
        bindable = false;
        emit PatientInformationBinded(msg.sender, _addr);
    }

    function GetPublicInfo() view public returns (string name, string note) {
        name = public_info.name;
        note = public_info.note;
    }

    function GetPrivateInfo(string _priv_key) view public authenicated(_priv_key) returns (string private_data) {
        private_data = private_info.private_data;
    }

    function SetPublicInfo(string _priv_key, string _name, string _note) public authenicated(_priv_key) {
        require(data_changable == true);
        public_info.name = _name;
        public_info.note = _note;
        emit PublicInfoChanged(msg.sender);
    }

    function SetPrivateInfo(string _priv_key, string _private_data) public authenicated(_priv_key) {
        require(data_changable == true);
        private_info.private_data = _private_data;
        emit PrivateInfoChanged(msg.sender);
    }

    function ConfirmChanged(string _priv_key, string _comment) public authenicated(_priv_key) {
        require(data_changable == true);
        comment = _comment;
        data_changable = false;
        pr.PushChanged(_priv_key, address(this));
        emit DataConfirmed(msg.sender);
    }
}