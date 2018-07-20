pragma solidity ^0.4.23;

import "./Libraries.sol";
import "./BaseContracts.sol";
import "./Profile.sol";
import "./Stages.sol";

contract Record is BaseContract, Confirmable {
    UtilLib.class public classtype = UtilLib.class.Record;

    address public profile;
    address[] public stages;

    event StageAdded(address indexed stage);
    event Confirm(address indexed _addr);

    modifier authenicated(string _priv_key) {
        require(keccak256(_priv_key) == Profile(profile).hashed_key());
        _;
    }

    constructor(address _addr) BaseContract() public {
        require(Profile(_addr).classtype() == UtilLib.class.Profile);
        profile = _addr;
        emit ContractCreated(msg.sender);
    }

    function addStage(address _addr) public changable {
        require(Stage(_addr).classtype() == UtilLib.class.Stage);
        stages.push(_addr);
        emit StageAdded(_addr);
    }

    function confirm(string _priv_key) public changable iscreator authenicated(_priv_key) {
        data_changable = false;
        Profile(profile).addRecord(_priv_key, address(this));
        emit Confirm(msg.sender);
    }
}