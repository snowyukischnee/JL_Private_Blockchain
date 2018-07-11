pragma solidity ^0.4.23;

library PersonalInfoLib {
    struct _public_info_struct {
        string name;
        string note;
    }

    struct _private_info_struct {
        string private_data;
    }

    enum _classname_enum {
        PatientRegisterClassName,
        PatientInfoClassName
    }
}