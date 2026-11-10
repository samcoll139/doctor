export interface Hospital {
  id: string;
  name: string;
  area: string;
  distance: string;
  timing: string;
  doctors?: Doctor[];
}

export interface DoctorSlot {
  t: string;
  open: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  spec: string;
  hospital: string;
  fee: number;
  slots: DoctorSlot[];
}

export interface Appointment {
  id?: number;
  hospital: string;
  doctor: string;
  spec: string;
  date: string;
  time: string;
  status: string;
  patientName: string;
  token: number;
  reason?: string;
}

export interface Prescription {
  id?: number;
  doctor: string;
  hospital?: string;
  date: string;
  meds: string[];
}

export interface PharmacyItem {
  name: string;
  price: number;
}

export interface PharmacyOrder {
  id: string;
  hospital: string;
  items: PharmacyItem[];
  total: number;
  status: string;
  date: string;
}

export interface AccessLogEntry {
  by: string;
  role: string;
  time: string;
}

export interface LabReport {
  id?: number;
  name: string;
  date: string;
  lab: string;
  sharedWithDoctor: boolean;
  accessLog: AccessLogEntry[];
}

export interface HomeCollectionRequest {
  id?: number;
  patientName: string;
  lab: string;
  date: string;
  status: string;
}

export interface Doubt {
  id: string;
  question: string;
  answer?: string | null;
  answeredBy?: string | null;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age: number | string;
}

export interface Lab {
  id: string;
  name: string;
  area: string;
  distance: string;
  timing: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  phone: string;
  lastVisit: string;
  reports: LabReport[];
  prescriptions: Prescription[];
}
