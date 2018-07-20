pragma solidity ^0.4.23;

import "./Libraries.sol";
import "./BaseContracts.sol";
import "./Profile.sol";
import "./Stages.sol";

contract Record is BaseContract, Confirmable {
    UtilLib.class public classtype = UtilLib.class.Record;

    address public profile;
    address[] public stages;

    //Vao vien:
    uint public start_date;
    string public original_entry; //Vao vien o : Cap cuu/ Khoa kham benh/ khao dieu tri
    string public previous_medical_unit; //Noi kham truoc: hospital / tu den / other
    //Ra vien:
    uint public end_date;
    string public end_reason; //Li do ra vien: Ra vien/ Xin ve/ Bo ve/ Dua ve/ Chuyen vien
    string public end_health_status; //Tinh trang ra vien: Khoi/Do/Nang hon/Khong thay doi/Tu vong
    string public main_found_disease; // Benh chinh
    string public relating_found_disease; // Benh kem theo
    string public next_medical_unit; //Noi chuyen den tiep theo
    uint public to_next_medical_unit_date; //Thoi gian chuyen den vien tiep theo
    bool public is_catastrophe; //Co tai bien ko
    bool public is_side_effect; //Co bien chung ko
    uint public dead_time; //Thoi gian tu vong
    string public dead_reason; //Li do tu vong : Do benh/ Do tai bien dieu tri/ Khac
    string public dead_detailed_reason; //Nguyen nhan chi tiet dan den tu vong    


    event StageAdded(address indexed stage);
    event Confirm(address indexed _addr);
    event StartVariablesSet(string _status);
    event EndVariablesSet(string _status);

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

    function setStartVariables(uint _start_date, string _original_entry, string _previous_medical_unit) public changable iscreator {
        start_date = _start_date;
        original_entry = _original_entry;
        previous_medical_unit = _previous_medical_unit; 
        emit StartVariablesSet("StartVarialbes set.");
    }

    function setEndVariables(
        uint _end_date,string _end_reason,string _end_health_status,
        string _main_found_disease,string _relating_found_disease,string _next_medical_unit,
        uint _to_next_medical_unit_date,bool _is_catastrophe,bool _is_side_effect,
        uint _dead_time,string _dead_reason,string _dead_detailed_reason) public changable iscreator {

        end_date = _end_date;
        end_reason = _end_reason; 
        end_health_status = _end_health_status; 
        main_found_disease = _main_found_disease; 
        relating_found_disease = _relating_found_disease; 
        next_medical_unit = _next_medical_unit;
        to_next_medical_unit_date = _to_next_medical_unit_date; 
        is_catastrophe = _is_catastrophe; 
        is_side_effect = _is_side_effect; 
        dead_time = _dead_time;
        dead_reason = _dead_reason;
        dead_detailed_reason = _dead_detailed_reason;
        emit EndVariablesSet("EndVariables set.");
    }
}