pragma solidity ^0.4.23;

import "./Libraries.sol";
import "./BaseContracts.sol";
import "./Stages.sol";

contract File is BaseContract {
    UtilLib.class public classtype = UtilLib.class.File;

    string public test_type;
    string public file;

    constructor(address _addr, string _test_type, string _file) BaseContract() public {
        require(TestStage(_addr).classtype() == UtilLib.class.Stage);
        require(TestStage(_addr).stagetype() == UtilLib.stage.TestStage);
        test_type = _test_type;
        file = _file;
        emit ContractCreated(msg.sender);
    }
}