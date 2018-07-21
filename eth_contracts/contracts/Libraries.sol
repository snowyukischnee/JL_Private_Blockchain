pragma solidity ^0.4.23;

library UtilLib {
    enum class {
        Profile,
        Record,
        Stage,
        File,
        TreatmentMethod
    }

    enum stage {
        TestStage,
        DiagnoseStage,
        TreatmentStage
    }

    enum department {
        Emergency,
        InternalClinic,
        NeurosurgicalClinic,
        AnesthesiologyResuscitationAndIntensiveCare,
        InfectiousClinic,
        Ophthalmology,
        Oncology,
        OrthopaedicSurgery,
        SurgicalClinic,
        Gynecology,
        EarNoseAndThroatDepartment,
        CentralLaboratories,
        DepartmentOfDermatologyAndCutaneousSurgery,
        Neurology,
        HospitalHygieneAndOccupationalHealthAndSafetyDepartment,
        Pathology,
        Psychology,
        Psychiatry,
        PhysicalMedicineAndRehabilitation,
        Radiology,
        Urology,
        MilitaryInstituteOfForensicMedicine,
        SocialWelfare,
        LongTermCareAndAftercare,
        Pharmacy,
        ColonCancerScreeningCenter,
        TraumaCenter
    }
}