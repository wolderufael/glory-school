// stores/student-form-store.ts
import {
  EmergencyContactType,
  EmploymentHistoryType,
  ParentInfoType,
  PastSecondarySchool,
  SecondarySchoolInfoType,
  StudentFullInfo,
  Transcript,
} from "@/utils/typeSchema";
import { create } from "zustand";

type FormState = {
  personalInfo: StudentFullInfo;
  contactInfo: EmergencyContactType;
  academicInfo: {
    transcript: Transcript;
    pastSchools: PastSecondarySchool[];
  };
  familyInfo: ParentInfoType[];
  employmentHistory: EmploymentHistoryType[];
  setPersonalInfo: (data: StudentFullInfo) => void;
  setContactInfo: (data: EmergencyContactType) => void;
  setAcademicInfo: (data: {
    transcript: Transcript;
    pastSchools: PastSecondarySchool[];
  }) => void;
  setFamilyInfo: (data: ParentInfoType[]) => void;
  setEmploymentHistory: (data: EmploymentHistoryType[]) => void;
};

export const useStudentFormStore = create<FormState>((set) => ({
  personalInfo: {} as StudentFullInfo,
  contactInfo: {} as EmergencyContactType,
  academicInfo: {
    transcript: {} as Transcript,
    pastSchools: [] as PastSecondarySchool[],
  },
  familyInfo: [] as ParentInfoType[],
  employmentHistory: [] as EmploymentHistoryType[],
  setPersonalInfo: (data) => set({ personalInfo: data }),
  setContactInfo: (data) => set({ contactInfo: data }),
  setAcademicInfo: (data) => set({ academicInfo: data }),
  setFamilyInfo: (data) => set({ familyInfo: data }),
  setEmploymentHistory: (data) => set({ employmentHistory: data }),
}));
