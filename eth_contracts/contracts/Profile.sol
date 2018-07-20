pragma solidity ^0.4.23;

import "./Libraries.sol";
import "./BaseContracts.sol";
import "./Record.sol";

contract Profile is BaseContract {
    UtilLib.class public classtype = UtilLib.class.Profile;

    bytes32 public hashed_key;
    address[] public records;

    string public full_name;
    bool public gender;
    uint public dob;
    string public occupation;
    string public region;
    string public education_level;
    bool public is_foreigner;
    string public home_address;
    bool public is_health_assuarance;
    uint public health_assuarance_expired_date;
    string public health_assuarance_id;
    string public contact;


    event RecordAdded(address indexed record);
    event VariablesSet(string _status);

    modifier authenicated(string _priv_key) {
        require(keccak256(_priv_key) == hashed_key);
        _;
    }

    constructor(string _priv_key) BaseContract() public {
        hashed_key = keccak256(_priv_key);
        emit ContractCreated(msg.sender);
    }

    function addRecord(string _priv_key, address _addr) public authenicated(_priv_key) {
        require(Record(_addr).classtype() == UtilLib.class.Record);
        records.push(_addr);
        emit RecordAdded(_addr);
    }

    function setVariables(
        string _full_name,
        bool _gender,
        uint _dob,
        string _occupation,
        string _region,
        string _education_level,
        bool _is_foreigner,
        string _home_address,
        bool _is_health_assuarance,
        uint _health_assuarance_expired_date,
        string _health_assuarance_id,
        string _contact  ) public {

        full_name = _full_name;
        gender = _gender;
        dob = _dob;
        occupation = _occupation;
        region = _region;
        education_level = _education_level;
        is_foreigner = _is_foreigner;
        home_address = _home_address;
        is_health_assuarance = _is_health_assuarance;
        health_assuarance_expired_date = _health_assuarance_expired_date;
        health_assuarance_id = _health_assuarance_id;
        contact = _contact;
        
        emit VariablesSet("Varialbes set.");
    }
}