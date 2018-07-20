pragma solidity ^0.4.23;

import "./Libraries.sol";
import "./BaseContracts.sol";
import "./Record.sol";

contract Profile is BaseContract {
    UtilLib.class public classtype = UtilLib.class.Profile;

    bytes32 public hashed_key;
    address[] public records;

    event RecordAdded(address indexed record);

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
}