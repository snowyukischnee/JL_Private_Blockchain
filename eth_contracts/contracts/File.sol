pragma solidity ^0.4.23;

import "./Libraries.sol";
import "./BaseContracts.sol";
import "./Stages.sol";

contract File is BaseContract {

    string public test_type;
    bytes32 public file;
    address public test_stage;

    constructor(address _addr, string _test_type, bytes32 _file) BaseContract() public {
        require(TestStage(_addr).classtype() == UtilLib.class.Stage);
        require(TestStage(_addr).stagetype() == UtilLib.stage.TestStage);
        test_stage = _addr;
        test_type = _test_type;
        file = _file;
        emit ContractCreated(msg.sender);
    }
}