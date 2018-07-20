pragma solidity ^0.4.23;

import "./Libraries.sol";

contract BaseContract {
    address public creator;
    uint public time_created;
    UtilLib.class public classtype;

    event ContractCreated(address indexed creator);

    modifier iscreator() {
        require(creator == msg.sender);
        _;
    }

    constructor() public {
        creator = msg.sender;
        time_created = now;
    }
}

contract Confirmable {
    bool public data_changable = true;

    modifier changable() {
        require(data_changable == true);
        _;
    }
}